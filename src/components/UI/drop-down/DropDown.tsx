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
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
          </svg>
        </i>
      </button>
      <div className={listClassName.join(' ')} onClick={(e) => {e.stopPropagation(); setIsVisibleList(false)}}>
        {children}
      </div>
    </div>
  );
}

export default DropDown;