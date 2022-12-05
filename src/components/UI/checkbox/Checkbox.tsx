import { useId } from 'react';
import cls from './Checkbox.module.scss';

const Checkbox = (props: any) => {
  const id = useId();
  return (<>
    <input type="checkbox" className={cls.checkbox} id={id} {...props}/>
    <label htmlFor={id} className={cls.label}></label>
  </>);
};

export default Checkbox;