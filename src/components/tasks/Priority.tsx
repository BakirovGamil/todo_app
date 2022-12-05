import { FC, useMemo } from 'react';
import { ITask, TaskPriority} from '../../types/types';

interface PriorityProps {
  task: ITask,
  isText?: boolean
}

const Priority: FC<PriorityProps> = ({ task, isText = false }) => {
  const priorityClassName = useMemo(() => {
    const className = ['task__priority'];
    if(task.priority === TaskPriority.low) className.push('task__priority_low');
    if(task.priority === TaskPriority.high) className.push('task__priority_high');
    if(task.priority === TaskPriority.medium) className.push('task__priority_medium');

    return className;
  }, [task]);

  const taskPriority = useMemo(() => {
    let priority = '';
    if(task.priority === TaskPriority.low) priority = 'Низкий';
    if(task.priority === TaskPriority.medium) priority = 'Средний';
    if(task.priority === TaskPriority.high) priority = 'Высокий';
    
    return priority;
  }, [task])
  
  return (
    <div style={{display: 'flex', gap: 5}}>
      <div className={priorityClassName.join(' ')}></div>
      {
        isText && taskPriority
      }
    </div>
  );
}

export default Priority;