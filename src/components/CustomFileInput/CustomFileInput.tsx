import React, { useState } from 'react';
import styles from "./CustomFileInput.module.scss"

interface CustomFileInputProps {
  onFileChange: (file: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({ onFileChange }) => {
  const [fileName] = useState<string>('');


  return (
      <div className={styles.customFileInput}>
        <label className={styles.fileLabel}>
          {fileName || 'Choose a file'}
          <input type="file" onChange={onFileChange} accept="image/*" className={styles.fileInput} />
        </label>
      </div>
  );
};

export default CustomFileInput;
