import { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Project from '../components/projects/Project';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { compareDate } from '../lib/todo';

const Projects = () => {
  const projects = useTypedSelector(state => state.projects.projects);
  const projectList = useMemo(() => {
    return Object.values(projects).sort((a, b) => compareDate(a.dateEdited, b.dateEdited))
  }, [projects])

  return (
    <div className="projects">
      <Helmet>
        <title>Проекты</title>
      </Helmet>
      { projectList.length 
        ?
        <div className="projects__list">
          {
            projectList.map((project) => <Project key={project.id} project={project}/>)
          }
        </div>
        :
        <span>Список проектов пуст</span>
      }
    </div>
  );
}

export default Projects;