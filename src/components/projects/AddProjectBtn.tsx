import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectActions } from '../../hooks/useActions';
import { IProject } from '../../types/types';
import Modal from '../UI/modal/Modal';
import AddProjectForm from './AddProjectForm';

const AddProjectBtn = () => {
  const [isVisibleAddProjectModal, setIsVisibleAddProjectModal] = useState(false);

  const openAddProjectModal = () => {
    setIsVisibleAddProjectModal(true);
  };

  const navigate = useNavigate();
  const { addProject } = useProjectActions();
  const onAddProject = (resultProject: IProject) => {
    if(!resultProject.title) return;
    
    addProject(resultProject);
    setIsVisibleAddProjectModal(false);
    navigate('/');
  }

  return (<>
    <Modal title="Добавить проект" isVisible={isVisibleAddProjectModal} setIsVisible={setIsVisibleAddProjectModal}>
      <AddProjectForm onSave={onAddProject}/>
    </Modal>
    <button className="menu__addBtn" onClick={openAddProjectModal}>+</button>
  </>);
}

export default AddProjectBtn;