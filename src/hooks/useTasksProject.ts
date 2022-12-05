import { useMemo } from 'react';
import { IProject } from '../types/types';
import { useTypedSelector } from './useTypedSelector';

export const useTasksProject = (project: IProject) => {
  const tasks = useTypedSelector((state) => state.tasks.tasks);
  const tasksProject = useMemo(() => {
    return project?.taskIds.map((taskId) => tasks[taskId]);
  }, [project, tasks]);

  return [tasks, tasksProject] as [typeof tasks, typeof tasksProject];
}