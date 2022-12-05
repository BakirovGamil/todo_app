import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ShortTask from '../tasks/ShortTask';
import Input from '../UI/Input/Input';

const Search = () => {
  const [query, setQuery] = useState('');
  const tasks = useTypedSelector((state) => state.tasks.tasks);
  const foundTasks = useMemo(() => {
    if(!query.trim()) return [];

    const reqExp = new RegExp(query, 'ig');

    return Object.values(tasks).filter((task) => {
      const isIdMatch = reqExp.test(task.id);
      const isTitleMatch = reqExp.test(task.title);

      return isIdMatch || isTitleMatch;
    });
  }, [query, tasks]);

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const [isVisibleResult, setIsVisibleResult] = useState(false);
  useEffect(() => {
    if(query) {
      setIsVisibleResult(true);
    } else {
      setIsVisibleResult(false);
    }
  }, [setIsVisibleResult, query]);

  useEffect(() => {
    const onClick = () => {
      setIsVisibleResult(false);
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div className="search">
      <Input className="search__input" placeholder='Поиск...' value={query} onChange={onChangeQuery}/>
        <div className={isVisibleResult ? "search__result search__result_active": "search__result"}>
          {
            Boolean(foundTasks.length) 
            ? foundTasks.slice(0, 6).map((task) => <ShortTask key={task.id} task={task}/>)
            : <span>Не найдено!</span>
          }
        </div>
    </div>
  );
}

export default Search;