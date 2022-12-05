import { useMemo } from 'react';
import { ITask } from '../types/types';
import { useTypedSelector } from './useTypedSelector';

export const useSubtasks = (task: ITask) => {
  const subTasks = useTypedSelector((state) => state.subTasks.subTasks);
  const taskSubTasks = useMemo(() => {
    return Object.values(subTasks).filter((subTask) => subTask.parentId === task?.id);
  }, [subTasks, task]);

  return taskSubTasks;
}