import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskActions } from '../../hooks/useActions';
import { ITask } from '../../types/types';
import Priority from './Priority';

interface ShortTaskProps {
  task: ITask
}

const ShortTask: FC<ShortTaskProps> = ({ task }) => {
  const navigate = useNavigate();
  const {setSelectedTaskId} = useTaskActions();
  const onOpenTask = () => {
    setSelectedTaskId(task.id);
    navigate(`/project/${task.projectId}`);
  };

  return (
    <div className="shortTask" onClick={onOpenTask}>
      <div className="shortTask__section">
        <div className="shortTask__name">
          Номер:
        </div>
        <div className="shortTask__id shortTask__textOverflow">
          {`${task.id.slice(0, 6)}...`}
        </div>
      </div>  
      <div className="shortTask__section">
        <div className="shortTask__name">
          Заголовок:
        </div>
        <div className="shortTask__title shortTask__textOverflow">
          {task.title}
        </div>
      </div>
      <div className="shortTask__section">
        <div className="shortTask__name">
          Приоритет:
        </div>
        <div className="shortTask__title shortTask__textOverflow">
          <Priority task={task} isText/>
        </div>
      </div>
    </div>
  );
}

export default ShortTask;