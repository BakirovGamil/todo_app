import { FC, useRef, MouseEvent } from 'react';
import { IFile } from '../../types/types';
import { useTaskActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface FileProps {
  file: IFile
}

const File: FC<FileProps> = ({file}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const onClick = () => {
    linkRef.current?.click();
  };
  
  const selectedTaskId = useTypedSelector((state) => state.tasks.selectedTaskId);
  const {removeFileFromTask} = useTaskActions();
  const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeFileFromTask(selectedTaskId, file.id);
  };

  return (
    <div className="file" onClick={onClick}>
      <a ref={linkRef} href={file.url} target="_blank" rel="noreferrer" className="file__link">Скачать файл</a>
      <div className="file__img">
      </div>
      <div className="file__name">
        {file.name}
      </div>
      <div className="file__nameTip">
          {file.name}
      </div>
      <button onClick={onDelete} className="file__deleteBtn">
        <i className="subTask__icon">
          &#10006;
        </i>
      </button>
    </div>
  );
}

export default File;