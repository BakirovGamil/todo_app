import { FC, MouseEvent, useMemo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTaskActions } from '../../hooks/useActions';
import { useSubtasks } from '../../hooks/useSubtasks';
import { ITask } from '../../types/types';
import DropDown from '../UI/drop-down/DropDown';
import Modal from '../UI/modal/Modal';
import EditTaskForm from './EditTaskForm';
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

  const [isVisibleEditModal, setIsVisibleEditModal] = useState(false);
  const openEditModal = () => setIsVisibleEditModal(true);

  const { editTask } = useTaskActions();
  const onEdit = (resultTask: ITask) => {
    editTask(resultTask);
    setIsVisibleEditModal(false);
  };

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
              <div style={{display: 'flex', gap: 5}}>
                <Modal isVisible={isVisibleEditModal} setIsVisible={setIsVisibleEditModal} title="Изменить задачу" preload>
                  <EditTaskForm task={task} onEdit={onEdit}/>
                </Modal>
                <DropDown>
                  <button className="editTask__btn" onClick={() => openEditModal()}>Изменить</button>
                </DropDown>
                <div className="task__drag" {...provided.dragHandleProps} onClick={(e) => e.stopPropagation()}>
                </div>
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