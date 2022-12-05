import { getDataLocalStorage } from '../../lib/todo';
import { SubTaskAction, SubTaskActionTypes, SubTaskState } from '../../types/subTask';

const data = getDataLocalStorage();

const initialState: SubTaskState = {
  subTasks: data.subTasks
} 

export const subTaskReducer = (state: SubTaskState = initialState, action: SubTaskAction) => {
  switch(action.type) {
    case SubTaskActionTypes.ADD_SUBTASK: {
      const {subTask} = action.payload;

      return {
        ...state,
        subTasks: {
          ...state.subTasks,
          [subTask.id]: subTask
        }
      }
    }
    case SubTaskActionTypes.DELETE_SUBTASK: {
      const {subTaskId} = action.payload;
      const subTasks = {...state.subTasks};
      delete subTasks[subTaskId];

      return {
        ...state,
        subTasks: {
          ...subTasks
        }
      }
    }
    case SubTaskActionTypes.EDIT_SUBTASK: {
      const {subTask} = action.payload;

      return {
        ...state,
        subTasks: {
          ...state.subTasks,
          [subTask.id]: subTask 
        }
      }
    }
    case SubTaskActionTypes.DELETE_SUBTASKS_TASK: {
      const {taskId} = action.payload;
      const subTasks = {...state.subTasks};

      const subTasksList = Object.values(subTasks);
      for(let subTask of subTasksList) {
        if(subTask.parentId === taskId) {
          delete subTasks[subTask.id];
        }
      }

      return {
        ...state,
        subTasks
      }
    }
    default:
      return state;
  }
}