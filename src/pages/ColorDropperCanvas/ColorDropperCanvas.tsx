import React, {useEffect, useRef, useState} from 'react';
import CustomFileInput from "../../components/CustomFileInput/CustomFileInput";
import classNames from "classnames";
import styles from './ColorDropperCanvas.module.scss'
import {handleLightColor} from "../../utils/handleLightColor";


const ColorDropperCanvas: React.FC = () => {

  const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));
  const leftSideBarWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--left-side-bar-width'));

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dropperCursorRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDropper, setIsDropper] = useState(false);

  const [, setCursorPosition] = useState({x: 0, y: 0});


  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context && imageSrc && canvas) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
      };
    }
  }, [imageSrc]);


  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const dropperCursor = dropperCursorRef.current;
    const pos = findPos(canvas);
    if (pos && context && canvas) {
      const x = e.pageX - pos.x - leftSideBarWidth;
      const y = e.pageY - pos.y - headerHeight;
      // Find scale
      const sx = canvas.width / canvas.offsetWidth;
      const sy = canvas.height / canvas.offsetHeight;
      // Apply scale to x/y
      const scaledX = (x * sx) | 0;
      const scaledY = (y * sy) | 0;

      const coord = `x=${scaledX}, y=${scaledY}`;
      const p = context.getImageData(scaledX, scaledY, 1, 1).data;
      const hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
      setStatus(coord, hex);
      if (dropperCursor) {
        dropperCursor.style.top = `${e.pageY - 140}px`;
        dropperCursor.style.left = `${e.pageX - 480}px`;
      }
      if (isDropper) {
        setCursorPosition({x: e.clientX, y: e.clientY});
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [handleMouseMove]);


  const setStatus = (coord: string, hex: string) => {
    const status = statusRef.current;
    if (status) {
      // status.innerHTML = `${coord}<br>${hex}`;
      status.innerHTML = `${hex}`;
    }
  };

  const findPos = (obj: HTMLElement | null): { x: number, y: number } | undefined => {
    let curleft = 0, curtop = 0;
    if (obj && obj.offsetParent) {
      let currentObj: HTMLElement | null = obj;
      do {
        curleft += currentObj.offsetLeft;
        curtop += currentObj.offsetTop;
      } while (currentObj === currentObj.offsetParent as HTMLElement);
      return {x: curleft, y: curtop};
    }
    return undefined;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    if (r > 255 || g > 255 || b > 255)
      throw new Error("Invalid color component");
    return ((r << 16) | (g << 8) | b).toString(16);
  };


  return (
      <div className={styles.wrapper}>
        <div className={styles.leftColumn}>
          <h1 className={styles.headingText}>Pick color from image</h1>
          <div className={styles.formSection}>
            <p>1. Select an image</p>
            <CustomFileInput onFileChange={handleFileInput}/>
          </div>
          <div className={styles.dropperOption}>
            <p>2. Pick color</p>
            <div className={classNames(styles.btn, {[styles.active]: isDropper})} onClick={() => {
              setIsDropper(!isDropper)
            }}>
              <svg
                  viewBox="0 0 24 24" data-testid="ColorizeIcon">
                <path
                    d="m20.71 5.63-2.34-2.34a.9959.9959 0 0 0-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42
                1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42M6.92
                19 5 17.08l8.06-8.06 1.92 1.92z"
                />
              </svg>
            </div>
          </div>

        </div>
        <div className={styles.rightColumn}>
          {imageSrc ?
              <canvas id="canvas" className={classNames({[styles.dropperOnCanvas]: isDropper})} ref={canvasRef}/> : (
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
                        d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707v5.586l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889
                        2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zm-1.498
                        4a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
                    <path
                        d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z"/>
                  </svg>
              )}
          {isDropper && <div id={"dropperCursor"} ref={dropperCursorRef} className={styles.dropperCursor}
                             style={{position: 'absolute', top: 0, left: 0}}>
              <p ref={statusRef}
                 className={styles.status}
                 style={{
                   color: handleLightColor(statusRef?.current?.innerHTML || "") ? "#000" : "#FFF",
                   backgroundColor: statusRef?.current?.innerHTML
                 }}
              />
              <svg width="160" height="160" viewBox="0 0 160 160" fill={"none"} xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M80 148C117.555 148 148 117.555 148 80C148 42.4446 117.555 12 80 12C42.4446 12 12
                          42.4446 12 80C12 117.555 42.4446 148 80 148ZM80 160C124.183 160 160 124.183 160 80C160
                          35.8172 124.183 0 80 0C35.8172 0 0 35.8172 0 80C0 124.183 35.8172 160 80 160Z"
                        fill={statusRef?.current?.innerHTML || "none"}/>
              </svg>
          </div>
          }


        </div>
      </div>
  );
};


export default ColorDropperCanvas;
