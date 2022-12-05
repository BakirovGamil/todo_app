import { FC, useState } from 'react';
import { useCommentActions, useProjectActions, useSubTaskActions, useTaskActions } from '../../hooks/useActions';
import { IProject } from '../../types/types';
import DropDown from '../UI/drop-down/DropDown';
import Modal from '../UI/modal/Modal';
import EditProjectForm from './EditProjectForm';

interface ProjectActionsProps {
  project: IProject
}

const ProjectActions: FC<ProjectActionsProps> = ({project}) => {
  const {deleteProject} = useProjectActions();
  const {deleteTasks} = useTaskActions();
  const {deleteSubTasksTask} = useSubTaskActions();
  const {deleteCommentsTask} = useCommentActions();
  const onDelete = () => {
    deleteProject(project.id);
    deleteTasks(project.taskIds);
    project.taskIds.forEach(taskId => {
      deleteSubTasksTask(taskId);
      deleteCommentsTask(taskId);
    });
  };

  const [isVisibleEditModal, setIsVisibleEditModal] = useState(false);
  const onEdit = () => {
    setIsVisibleEditModal(true);
  };

  const {editProject} = useProjectActions();
  const onSave = (resultProject: IProject) => {
    editProject(resultProject);
    setIsVisibleEditModal(false);
  };

  return (
    <div>
       <Modal title='Изменить проект' isVisible={isVisibleEditModal} setIsVisible={setIsVisibleEditModal}>
        <EditProjectForm project={project} onSave={onSave}/>
      </Modal>
      <DropDown>
        <button className='projects__btn' onClick={onEdit}>
          Изменить
        </button>
        <button className='projects__btn' onClick={onDelete}>
          Удалить
        </button>
      </DropDown>
    </div> 
  );
}

export default ProjectActions;