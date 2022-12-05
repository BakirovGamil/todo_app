import { TaskActionTypes } from '../../types/task';
import { IFile, ITask, TaskStatus } from '../../types/types';

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

export const deleteTask = (taskId: string) => {
  return {
    type: TaskActionTypes.DELETE_TASK,
    payload: {
      taskId
    }
  };
}

export const addFileToTask = (taskId: string, file: IFile) => {
  return {
    type: TaskActionTypes.ADD_FILE_TO_TASK,
    payload: {
      taskId,
      file
    }
  };
}

export const removeFileFromTask = (taskId: string, fileId: string) => {
  return {
    type: TaskActionTypes.REMOVE_FILE_FROM_TASK,
    payload: {
      taskId,
      fileId
    }
  };
}