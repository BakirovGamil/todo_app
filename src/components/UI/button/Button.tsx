import React, {FC, ReactNode, MouseEvent} from 'react';
import cls from './Button.module.scss';

interface ButtonProps {
  children?: ReactNode,
  className?: string,
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<ButtonProps> = ({ children, className='', onClick }) => {
  return (
    <button className={`${cls.btn} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;