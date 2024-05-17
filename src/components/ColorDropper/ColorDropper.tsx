import {useState, useEffect, useRef} from "react";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import {handleLightColor} from "../../utils/handleLightColor";

import styles from "./ColorDropper.module.scss";
import CustomButton from "../CustomButton/CustomButton";


const ColorDrppper = () => {
  const [color, setColor] = useState<string>("#5524e7");
  const [image, setImage] = useState('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const openEyeDropper = async () => {
    const eyeDropper = new (window as any).EyeDropper();
    eyeDropper
        .open()
        .then((result: any) => {
          const color = result.sRGBHex;
          // Do something with the color
          setColor(color);
        })
        .catch((e: any) => {
          console.error(e);
          console.warn('No Support: This browser does not support the EyeDropper API yet!');
        });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCopyColor = async () => {
    await navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel * 1.2);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel / 1.2);
  };

  useEffect(() => {
    if (canvasRef.current && image) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current as HTMLCanvasElement;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const scaledWidth = img.width * zoomLevel;
          const scaledHeight = img.height * zoomLevel;

          const x = (canvas.width - scaledWidth) / 2;
          const y = (canvas.height - scaledHeight) / 2;

          ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        };
        img.src = image;
      }
    }
  }, [image, zoomLevel]);

  return (
      <div className={styles.wrapper}>
        <div className={styles.leftColumn}>
          <h1 className={styles.headingText}>Pick color from image</h1>

          <div className={styles.formSection}>
            <p>1. Select an image</p>
            <CustomFileInput onFileChange={handleFileInput}/>
          </div>

          <div className={styles.formSection}>
            <p>2. Pick color</p>
            <CustomButton onClick={openEyeDropper}>
              Open Eyedropper
            </CustomButton>
          </div>

          <div className={styles.formSection}>
            <p>3. View selected</p>
            <div
                className={styles.selectedColor}
                style={{background: color, color: handleLightColor(color) ? '#000' : '#FFF',}}
            >
              <div onClick={handleCopyColor} className={styles.copy}>
                <svg viewBox="0 0 24 24" data-testid="ContentCopyIcon" fill={handleLightColor(color) ? '#000' : '#FFF'}>
                  <path
                      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"/>
                </svg>
              </div>
              <span>{color}</span>
            </div>
          </div>

        </div>

        <div className={styles.rightColumn}>
          {image ? (
              <>
                <div className={styles.adjustZoom}>
                  <div className={styles.zoomIn} onClick={handleZoomIn}>
                    <svg aria-hidden="true" viewBox="0 0 24 24" data-testid="ZoomInIcon">
                      <path
                          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91
                           16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01
                           5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"/>
                      <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2z"/>
                    </svg>
                  </div>
                  <div className={styles.zoomOut} onClick={handleZoomOut}>
                    <svg aria-hidden="true" viewBox="0 0 24 24" data-testid="ZoomOutIcon">
                      <path
                          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91
                           16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01
                           5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14M7 9h5v1H7z"/>
                    </svg>
                  </div>
                </div>
                <canvas
                    id="canvas"
                    width="4000"
                    height="4000"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    ref={canvasRef}
                />
              </>
          ) : (
              <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="4em"
                  width="4em"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707v5.586l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zm-1.498 4a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
                <path
                    d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z"/>
              </svg>
          )}
        </div>
      </div>
  );
};

export default ColorDrppper;