import { FC, MouseEvent, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTaskActions } from '../../hooks/useActions';
import { useSubtasks } from '../../hooks/useSubtasks';
import { ITask } from '../../types/types';
import Priority from './Priority';

interface TaskProps {
  task: ITask,
  index: number
}

const Task: FC<TaskProps> = ({ task, index }) => {
  const {setSelectedTaskId} = useTaskActions();
  const onTaskClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    setSelectedTaskId(task.id);
  };

  const subTasks = useSubtasks(task);
  const countDoneSubtasks = useMemo(() => {
    return subTasks.filter((subTask) => subTask.isDone).length;
  }, [subTasks]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => {
        return (
          <div ref={provided.innerRef} className="task" {...provided.draggableProps} onClick={onTaskClick}>
            <div className="task__head">
              <div className="task__title title">
                <Priority task={task}/>
                {task.title}
              </div>
              <div className="task__drag" {...provided.dragHandleProps} onClick={(e) => e.stopPropagation()}>
              </div>
            </div>
            <div className="task__description" dangerouslySetInnerHTML={{__html: task.desription}}/>
            <div className="task__meta">
              {
                Boolean(subTasks.length) &&
                <span className="task__subtasks">
                  {`${countDoneSubtasks} из ${subTasks.length} `} 
                </span>
              }
              <div className="task__dateCreated">
                {task.dateCreated.format('DD.MM.YYYY HH:mm')}
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default Task;