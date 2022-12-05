import moment from 'moment';
import { FC } from 'react';
import { IProject } from '../../types/types';
import ProjectForm from './ProjectForm';

interface AddProjectFormProps {
  onSave: (resultProject: IProject) => void
}

const AddProjectForm: FC<AddProjectFormProps> = ({ onSave }) => {
  const project: IProject = {
    id: '',
    title: '',
    dateEdited: moment(),
    taskIds: []
  } 

  return (
    <ProjectForm project={project} onSave={onSave}/>
  );
}

export default AddProjectForm;