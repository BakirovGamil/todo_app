import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProject } from '../../types/types';
import ProjectActions from './ProjectActions';

interface ProjectProps {
  project: IProject
}

const Project: FC<ProjectProps> = ({ project }) => {
  const navigate = useNavigate();
  const openProject = () => {
    navigate('/project/' + project.id);
  };

  return (
    <div key={project.id} className="projects__item" onClick={() => openProject()}>
      <div className="projects__title">
        <span>{project.title}</span>
        <ProjectActions project={project}/>
      </div>
      <div className="projects__timeEdited">
        {project.dateEdited.format('DD.MM.YYYY HH:mm')}
      </div>
    </div>
  );
}

export default Project;