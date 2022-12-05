import { TaskActionTypes } from '../../types/task';
import { ITask, TaskStatus } from '../../types/types';

export const addTask = (task: ITask) => {
  return {
    type: TaskActionTypes.ADD_TASK,
    payload: task
  };
}

export const changeTaskStatus = (taskId: string, status: TaskStatus) => {
  return {
    type: TaskActionTypes.CHANGE_STATUS,
    payload: {
      taskId,
      status
    }
  };
}

export const deleteTasks = (taskIds: string[]) => {
  return {
    type: TaskActionTypes.DELETE_TASKS,
    payload: {
      taskIds
    }
  };
}

export const editTask = (task: ITask) => {
  return {
    type: TaskActionTypes.EDIT_TASK,
    payload: {
      task
    }
  };
}

export const setSelectedTaskId = (taskId: string | null) => {
  return {
    type: TaskActionTypes.SET_SELECTED_TASK_ID,
    payload: {
      taskId
    }
  };
}