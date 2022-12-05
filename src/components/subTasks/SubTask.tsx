import { ChangeEvent, FC } from 'react';
import { useSubTaskActions } from '../../hooks/useActions';
import { ISubTask } from '../../types/types';
import Checkbox from '../UI/checkbox/Checkbox';

interface SubTaskProps {
  subTask: ISubTask
}

const SubTask: FC<SubTaskProps> = ({subTask}) => {
  const {editSubTask, deleteSubTask} = useSubTaskActions();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    editSubTask({...subTask, isDone: !subTask.isDone});
  };

  const onDelete = () => {
    deleteSubTask(subTask.id);
  };

  return (
    <div className="subTask">
      <div className="subTask__checkBox">
          <Checkbox checked={subTask.isDone} onChange={onChange} name={Math.random()}/>
      </div>
      <div className="subTask__header">
        <div className="subTask__title">{subTask.title}</div>
      </div>
      <div className="subTask__actions">
        <button className="subTask__deleteBtn" onClick={onDelete}>
          <i className="subTask__icon">
          &#10006;
          </i>
        </button>
      </div>
    </div>
  );
}

export default SubTask;