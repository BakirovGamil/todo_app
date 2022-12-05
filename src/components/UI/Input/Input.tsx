import React, { ChangeEvent, FC } from 'react';
import cls from './input.module.scss';
import { useId } from 'react';

interface InputProps {
  title?: string,
  value: string,
  placeholder?: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  className?: string,
  innerRef?: React.ForwardedRef<HTMLInputElement>
}

const Input: FC<InputProps> = ({ title, value, placeholder, onChange, className = '', innerRef = null}) => {
  const id = useId();

  return (<>
    {title && <label className={cls.label} htmlFor={id}>{title}</label>}
    <input ref={innerRef} className={`${cls.input} ${className}`} id={id} type="text" placeholder={placeholder} value={value} onChange={onChange}/>
  </>);
}

export default Input;