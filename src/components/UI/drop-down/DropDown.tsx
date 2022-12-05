import { FC, useState, ReactNode, useEffect, MouseEvent } from 'react';
import cls from './DropDown.module.scss';

interface DropDownProps {
  title?: string,
  children?: ReactNode
}

const DropDown: FC<DropDownProps> = ({ title = '', children }) => {
  const [isVisibleList, setIsVisibleList] = useState(false); 

  const listClassName = [cls.list];
  if(isVisibleList) listClassName.push(cls.list_active);

  const onToggleVisibilityList = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsVisibleList(!isVisibleList);
  };

  useEffect(() => {
    const onDocumentClick = () => {
      if(isVisibleList) {
        setIsVisibleList(false);
      }
    };

    document.addEventListener('click', onDocumentClick);

    return () => {
      document.removeEventListener('click', onDocumentClick);
    }
  }, [isVisibleList]);

  return (
    <div className={cls.container}>
      <button type='button' className={cls.btn} onClick={onToggleVisibilityList}>
        {title}
        <i className={cls.icon}>
          <i className={cls.point}></i>
        </i>
      </button>
      <div className={listClassName.join(' ')} onClick={(e) => {e.stopPropagation(); setIsVisibleList(false)}}>
        {children}
      </div>
    </div>
  );
}

export default DropDown;