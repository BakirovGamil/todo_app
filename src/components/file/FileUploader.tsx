import * as filestack from 'filestack-js';
import { useTaskActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { generateID } from '../../lib/todo';
import { IFile } from '../../types/types';
import Button from '../UI/button/Button';

const client = filestack.init('AmUg9OPZ5S7qgwPQZiul0z');

const FileUploader = () => {
  const selectedTaskId = useTypedSelector((state) => state.tasks.selectedTaskId);
  const {addFileToTask} = useTaskActions();
  
  const openPicker = () => {
    const onUploadDone = (files: filestack.PickerResponse) => {
      files.filesUploaded.forEach(file => {
        const newFile: IFile = {
          id: generateID(),
          name: file.filename,
          url: file.url,
          handle: file.handle
        };

        addFileToTask(selectedTaskId, newFile);
      });
    };
    
    const options = {
      onUploadDone
    };
    
    client.picker(options).open();
  };

  return (
    <Button onClick={openPicker} className="addFileBtn">Добавить файлы</Button>
  );
}

export default FileUploader;