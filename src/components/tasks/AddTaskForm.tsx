import { FC } from 'react';
import moment from 'moment';
import { ITask, TaskPriority, TaskStatus } from '../../types/types';
import TaskForm from './TaskForm';
import { useProjectActions, useTaskActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface AddTaskProps {
  taskStatus?: TaskStatus,
  setIsVisible: (isVisible: boolean) => void 
}

const AddTaskForm: FC<AddTaskProps> = ({ taskStatus = TaskStatus.queue, setIsVisible }) => {
  const { addTask } = useTaskActions();
  const { addTaskToProject } = useProjectActions();
  const selectedProjectId = useTypedSelector(state => state.projects.selectedProjectId);

  const initTask: ITask = Object.freeze({
    id: '',
    projectId: selectedProjectId,
    title: '',
    desription: '',
    dateCreated: moment(),
    priority: TaskPriority.low,
    status: taskStatus
  });

  const onSave = (resultTask: ITask) => {
    if(!resultTask.title.trim()) return;

    addTask(resultTask);
    addTaskToProject(selectedProjectId, resultTask.id);
    setIsVisible(false);
  }

  return (
    <TaskForm initTask={initTask} onSave={onSave}/>
  );
}

export default AddTaskForm;