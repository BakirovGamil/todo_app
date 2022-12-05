import { FC, MouseEvent, useMemo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useCommentActions, useProjectActions, useSubTaskActions, useTaskActions } from '../../hooks/useActions';
import { useSubtasks } from '../../hooks/useSubtasks';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ITask, TaskStatus } from '../../types/types';
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

  const {deleteTask} = useTaskActions();
  const {setTaskIds} = useProjectActions();
  const {deleteSubTasksTask} = useSubTaskActions();
  const {deleteCommentsTask}= useCommentActions();
  const projects = useTypedSelector((state) => state.projects.projects);
  const onDelete = () => {
    const projectId = task.projectId;
    const taskIds = projects[projectId].taskIds;
    const newTaskIds = taskIds.filter((taskId) => taskId !== task.id);
    setTaskIds(projectId, newTaskIds);
    deleteTask(task.id);
    deleteSubTasksTask(task.id);
    deleteCommentsTask(task.id);
  };

  const {changeTaskStatus} = useTaskActions();
  const onChangeStatus = (taskStatus: TaskStatus) => {
    changeTaskStatus(task.id, taskStatus);
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
                  <button className="editTask__btn" onClick={() => onChangeStatus(TaskStatus.queue)}>В очередь</button>
                  <button className="editTask__btn" onClick={() => onChangeStatus(TaskStatus.development)}>В работе</button>
                  <button className="editTask__btn" onClick={() => onChangeStatus(TaskStatus.done)}>Выполнено</button>
                  <button className="editTask__btn" onClick={() => onDelete()}>Удалить</button>
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