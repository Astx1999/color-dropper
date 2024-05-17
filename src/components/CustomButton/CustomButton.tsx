import React, {MouseEventHandler, ReactNode} from 'react';
import styles from './CustomButton.module.scss'

interface CustomButtonProps {
  children: ReactNode
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}

const CustomButton: React.FC<CustomButtonProps>  = ({children, onClick}) => {
  return (
      <div className={styles.root} onClick={onClick}>
        {children}
      </div>
  );
};

export default CustomButton;