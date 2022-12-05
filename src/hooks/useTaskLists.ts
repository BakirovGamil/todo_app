import { useMemo } from 'react';
import { getTasksByStatus } from '../lib/todo';
import { ITask, TaskLists, TaskListIds, TaskStatus } from '../types/types';

export const useTaskLists = (tasksProject: ITask[]) => {
  const taskLists: TaskLists = useMemo(() => ({
    [TaskListIds.queue]: getTasksByStatus(tasksProject, TaskStatus.queue),
    [TaskListIds.development]: getTasksByStatus(tasksProject, TaskStatus.development),
    [TaskListIds.done]: getTasksByStatus(tasksProject, TaskStatus.done)
  }), [ tasksProject ]);

  return taskLists;
}