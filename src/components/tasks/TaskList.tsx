import React, { FC, useMemo, useState } from 'react';
import Task from './Task';
import { ITask, TaskListTypes, TaskStatus } from '../../types/types';
import { Droppable } from 'react-beautiful-dnd';
import AddTaskBtn from './AddTaskBtn';

interface TaskListProps {
  id: string,
  title: string,
  tasks?: ITask[],
  type: TaskListTypes
}

const TaskList: FC<TaskListProps> = ({ id, title, tasks, type }) => {
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(TaskStatus.queue);
  const titleClassName = useMemo(() => {
    const className = ['taskList__title title']
    if(type === TaskListTypes.queue) {
      className.push('queue');
      setTaskStatus(TaskStatus.queue);
    }

    if(type === TaskListTypes.development) {
      className.push('development');
      setTaskStatus(TaskStatus.development);
    }

    if(type === TaskListTypes.done) { 
      className.push('done');
      setTaskStatus(TaskStatus.done);
    }
    
    return className;
  }, [ type ]);

  const taskCount = tasks?.length ?? 0;

  return (
    <div className="taskList">
      <div className={titleClassName.join(' ')}>
        <span>{title}</span>
        <span className="taskList__count">
          {`( ${taskCount} )`}
        </span>
      </div>
      <div  className="taskList__body">
        <AddTaskBtn taskStatus={taskStatus}/>
        <Droppable droppableId={id}>
          {(provided) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks?.map((task, indx) => <Task key={task.id} task={task} index={indx}/>)}
                  {provided.placeholder}
                </div>
              )
          }}
        </Droppable>
      </div>
    </div>
  );
}

export default TaskList;