import { FC } from 'react';
import { ITask } from '../../types/types';
import TaskForm from './TaskForm';

interface EditTaskFormProps {
  task: ITask,
  onEdit: (resultTask: ITask) => void
}

const EditTaskForm: FC<EditTaskFormProps> = ({task, onEdit}) => {
  const onSave = (resultTask: ITask) => {
    onEdit(resultTask);
  };

  return (
    <TaskForm initTask={task} onSave={onSave}/>
  );
}

export default EditTaskForm;