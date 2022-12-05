import { SubTaskActionTypes } from '../../types/subTask';
import { ISubTask } from '../../types/types';

export const addSubTask = (subTask: ISubTask) => {
  return {
    type: SubTaskActionTypes.ADD_SUBTASK,
    payload: {
      subTask
    }
  };
}

export const deleteSubTask = (subTaskId: string) => {
  return {
    type: SubTaskActionTypes.DELETE_SUBTASK,
    payload: {
      subTaskId
    }
  };
}

export const deleteSubTasksTask = (taskId: string) => {
  return {
    type: SubTaskActionTypes.DELETE_SUBTASKS_TASK,
    payload: {
      taskId
    }
  };
}

export const editSubTask =  (subTask: ISubTask) => {
  return {
    type: SubTaskActionTypes.EDIT_SUBTASK,
    payload: {
      subTask
    }
  };
}