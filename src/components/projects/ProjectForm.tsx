import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { generateID } from '../../lib/todo';
import { IProject } from '../../types/types';
import Button from '../UI/button/Button';
import Input from '../UI/Input/Input';

interface ProjectFormProps {
  project: IProject,
  onSave: (resultProject: IProject) => void;
}

const ProjectForm: FC<ProjectFormProps> = ({project, onSave}) => {
  const [title, setTitle] = useState(project.title);
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const newProject: IProject = {
      id: project.id || generateID(),
      title: title,
      dateEdited: project.dateEdited,
      taskIds: project.taskIds.length ? project.taskIds : []
    };

    onSave(newProject);
  }

  return (
    <form className="addProjectForm" onSubmit={onSubmit}>
      <span>
        Название проекта
      </span>
      <Input placeholder="Название проекта" value={title} onChange={onChangeTitle}/>
      <Button>
        Сохранить
      </Button>
    </form>
  );
}

export default ProjectForm;