import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Helmet } from 'react-helmet';
import { TaskListTypes, TaskListIds, TaskStatus } from '../types/types'; 
import TaskList from '../components/tasks/TaskList';
import { useProjectActions, useTaskActions } from '../hooks/useActions';
import { useTaskLists } from '../hooks/useTaskLists';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useTasksProject } from '../hooks/useTasksProject';
import { getTaskIdsFromTaskList } from '../lib/todo';
import TaskModal from '../components/tasks/TaskModal';

const Tasks = () => {
  const navigate = useNavigate();
  const { setTaskIds, setSelectedProject } = useProjectActions();
  const { changeTaskStatus } = useTaskActions();
  const projectId  = useParams().projectId as string;
  const project = useTypedSelector((state) => state.projects.projects[projectId]);

  useEffect(() => {
    if(!project) return navigate('/');

    setSelectedProject(project.id);

    return () => {
      setSelectedProject(null);
    }
  }, [navigate, project, setSelectedProject]);

  const [tasks, tasksProject] = useTasksProject(project);
  const taskLists = useTaskLists(tasksProject);

  const onDragEnd = (result: DropResult) => {
    const {destination, source, draggableId} = result;

    if(!destination) return;

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = taskLists[source.droppableId as keyof typeof taskLists];
    const finish = taskLists[destination.droppableId as keyof typeof taskLists];
    const draggableTask = {...tasks[draggableId]};

    if(start === finish) {
      const currentTaskLists = [...start];
      currentTaskLists.splice(source.index, 1);
      currentTaskLists.splice(destination.index, 0, draggableTask);

      const newTaskLists = {
        ...taskLists,
        [destination.droppableId]: currentTaskLists
      };

      const newTaskIds = getTaskIdsFromTaskList(newTaskLists);
      setTaskIds(project.id, newTaskIds);
      return;
    }
    
    //Перемещаем из одного списка в другой
    const startTaskList = [...start];
    startTaskList.splice(source.index, 1);

    const newTaskStatus = TaskStatus[destination.droppableId as keyof typeof TaskStatus];
    changeTaskStatus(draggableTask.id, newTaskStatus);
    
    const finishTaskList = [...finish]
    finishTaskList.splice(destination.index, 0, draggableTask);

    const newTaskLists = {
      ...taskLists,
      [source.droppableId]: startTaskList,
      [destination.droppableId]: finishTaskList,
    };

    const newTaskIds = getTaskIdsFromTaskList(newTaskLists);
    setTaskIds(project.id, newTaskIds);
    return;
  };

  return (
    <div className="tasks">
      <Helmet>
        <title>{project?.title}</title>
      </Helmet>
      <TaskModal/>
      <div className="tasks__lists">
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskList id={TaskListIds.queue} title="Очередь" tasks={taskLists.queue} type={TaskListTypes.queue}/>
          <TaskList id={TaskListIds.development} title="В работе" tasks={taskLists.development} type={TaskListTypes.development}/>
          <TaskList id={TaskListIds.done} title="Выполнено" tasks={taskLists.done} type={TaskListTypes.done}/>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Tasks;