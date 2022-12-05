import { FC } from 'react';
import { IProject } from '../../types/types';
import ProjectForm from './ProjectForm';

interface EditProjectFormProps {
  project: IProject,
  onSave: (resultProject: IProject) => void
}

const EditProjectForm: FC<EditProjectFormProps> = ({project, onSave}) => {
  return (
    <ProjectForm project={project} onSave={onSave}/>
  );
}

export default EditProjectForm;