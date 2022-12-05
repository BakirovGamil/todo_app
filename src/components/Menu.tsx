import { useMemo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useOptionsActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { compareDate } from '../lib/todo';
import AddProjectBtn from './projects/AddProjectBtn';

const Menu = () => {
  const projects = useTypedSelector((state) => state.projects.projects);
  const sortedProjects = useMemo(() => {
    return Object.values(projects).sort((a, b) => compareDate(a.dateEdited, b.dateEdited));
  }, [projects])

  const isVisibleMenu = useTypedSelector((state) => state.options.isVisibleMenu);
  const menuClassName = ['menu'];
  if(isVisibleMenu) menuClassName.push('menu_active');

  const {setMenuVisibility} = useOptionsActions();
  const onClose = () => {
    setMenuVisibility(false);
  };

  const onClick = (e: MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    if(target.tagName === 'A') {
      setMenuVisibility(false);
    }
  };

  return (
    <aside className={menuClassName.join(' ')}>
      <nav className="menu__nav">
        <ul className="menu__list" onClick={onClick}>
          <li className="menu__item">  
            <Link to="/">Проекты</Link>
            <AddProjectBtn/>
          </li>
          {
            sortedProjects.map((project) => {
              return (
                <li key={project.id} className="menu__item">
                  <Link to={'/project/' + project.id} className="menu__projectLink">
                    {project.title} 
                  </Link>
                  <span className='menu__countTasks'>{project.taskIds.length}</span>
                </li>
              );
            })
          }
        </ul>
      </nav>
      <button className="menu__closeBtn" onClick={onClose}/>
    </aside>
  );
}

export default Menu;