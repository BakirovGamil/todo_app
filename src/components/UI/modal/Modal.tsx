import { FC, ReactNode, useEffect, useState } from 'react';
import cls from './Modal.module.scss';

interface ModalProps {
  title?: string,
  isVisible: boolean,
  setIsVisible: (newState: boolean) => void,
  children: ReactNode,
  preload?: boolean,
  className?: string
}

const Modal: FC<ModalProps> = ({ title, isVisible, setIsVisible, children, preload = false, className }) => {
  const [preloadState, setPreloadState] = useState(preload);
  const closeModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if(!preload) return;

    if(isVisible === true) {
      setPreloadState(false);
    } else {
      setPreloadState(true);
    }
  }, [isVisible, preload]);

  const modalClassName = [cls.modal];
  if(isVisible) modalClassName.push(cls.modal_active)

  const containerClassName = [cls.container];
  if(className) containerClassName.push(className);

  const layout = (
    <div className={modalClassName.join(' ')} onMouseDown={() => closeModal()} onClick={(e) => e.stopPropagation()}>
      <div className={containerClassName.join(' ')} onClick={e => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
        { title &&
          <div className={cls.title}>
            {title}
          </div>
        }
        <div className={cls.body}>
          {children}
        </div>
      </div>
    </div>
  );

  return isVisible || preloadState ? layout : null;
}

export default Modal;