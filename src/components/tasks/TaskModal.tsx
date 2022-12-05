import { FC, useEffect, useState } from 'react';
import { useTaskActions } from '../../hooks/useActions';
import { useSubtasks } from '../../hooks/useSubtasks';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import AddCommentForm from '../comment/AddCommentForm';
import CommentList from '../comment/CommentList';
import File from '../file/File';
import FileUploader from '../file/FileUploader';
import AddSubTaskForm from '../subTasks/AddSubTaskForm';
import SubTask from '../subTasks/SubTask';
import Button from '../UI/button/Button';
import Modal from '../UI/modal/Modal';
import Priority from './Priority';

const TaskModal: FC = () => {
  const taskId = useTypedSelector((state) => state.tasks.selectedTaskId);
  const tasks = useTypedSelector((state) => state.tasks.tasks);
  const task = tasks[taskId as string];
  const subTasks = useSubtasks(task);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if(taskId) {
      setIsVisible(true);
    }
  }, [taskId]);

  const {setSelectedTaskId} = useTaskActions();
  const onCloseModal = (isVisible: boolean) => {
    setIsVisible(isVisible);
    setSelectedTaskId(null);
  };

  const onCopy =  () => {
    navigator.clipboard.writeText(task.id);
  };

  return (
    <Modal title={task?.title} isVisible={isVisible} setIsVisible={onCloseModal} className="taskModal">
      { task &&
        <div className="taskModal__body">
           <div className="taskModal__section">
            <div className="taskModal__title">
              Номер
            </div>
            <div className="taskModal__content taskModal__id">
              {`${task.id.slice(0, 6)}... `}
              <Button className="taskModal__copyBtn" onClick={onCopy}></Button>
            </div>
          </div>
          {
            task.desription &&
            <div className="taskModal__section">
              <div className="taskModal__title">
                Описание
              </div>
              <div className="taskModal__content taskModal__description" dangerouslySetInnerHTML={{ __html: task.desription}}/>
            </div>
          }
           <div className="taskModal__section">
            <div className="taskModal__title">
              Приоритет
            </div>
            <div className="taskModal__content taskModal__priority">
              <Priority task={task} isText/>
            </div>
          </div>
          {
            task?.timeCompletion &&
            <div className="taskModal__section">
            <div className="taskModal__title">
              Время выполнения:
            </div>
            <div className="taskModal__content">
              {`${task.timeCompletion} минут` }
            </div>
          </div>
          }
          {
            task?.dateCompletion &&
            <div className="taskModal__section">
            <div className="taskModal__title">
              Дата завершения:
            </div>
            <div className="taskModal__content">
              {task.dateCompletion.format('DD.MM:YYYY HH:mm')}
            </div>
          </div>
          }
          <div className="taskModal__section">
            <div className="taskModal__title">
              Подзадачи
            </div>
            <div className="taskModal__content taskModal__subTasks">
              {subTasks.map((subTask) => <SubTask key={subTask.id} subTask={subTask}/>)}
              <AddSubTaskForm task={task}/>
            </div>
          </div>
          <div className="taskModal__section">
            <div className="taskModal__title">
              Файлы
            </div>
            <div className="taskModal__content taskModal__files">
              <FileUploader/>
              <div className="taskModal__fileList">
                {
                  task.files.map((file) => <File key={file.id} file={file}/>)
                }
              </div>
            </div>
          </div>
          <div className="taskModal__section">
            <div className="taskModal__title">
              Комментарии
            </div>
            <div className="taskModal__content taskModal__comments">
              <AddCommentForm task={task}/>
              <CommentList task={task}/>
            </div>
          </div>
        </div>
      }  
    </Modal>
  );
}

export default TaskModal;