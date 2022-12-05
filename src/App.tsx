import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import { saveDataLocalStorage } from './lib/todo';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import store from './store/store';

function App() {
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      const state = store.getState(); // Чтобы компонент не обновлялся каждый раз когда меняется состояние

      saveDataLocalStorage({
        projects: state.projects.projects,
        tasks: state.tasks.tasks,
        subTasks: state.subTasks.subTasks,
        comments: state.comments.comments,
        options: state.options
      });
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  return (
    <div className="App">
      <Header/>
      <div className="wrapper">
        <Menu/>
        <main className="main">
          <Routes>
            <Route path="/" element={<Projects />}/>
            <Route path="project/:projectId" element={<Tasks />}/>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
