import { getDataLocalStorage } from '../../lib/todo';
import { TaskAction, TaskActionTypes, TaskState } from '../../types/task';

const data = getDataLocalStorage();

const initialState: TaskState ={ 
  selectedTaskId: null,
  tasks: data.tasks
};

export const taskReducer = (state = initialState, action: TaskAction) => {
  switch(action.type) {
    case TaskActionTypes.ADD_TASK:
      const newTask = action.payload;

      return {
        ...state,
        tasks: { 
          ...state.tasks,
          [newTask.id]: newTask
        }
      };
    case TaskActionTypes.CHANGE_STATUS:
      const {taskId, status} = action.payload;

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...state.tasks[taskId],
            status
          }
        }
      };
    case TaskActionTypes.DELETE_TASKS: {
      const {taskIds} = action.payload;
      const tasks = {...state.tasks};

      for (const taskID of taskIds) {
        delete tasks[taskID];
      }

      return {
        ...state,
        tasks
      }
    }
    case TaskActionTypes.EDIT_TASK: {
      const {task} = action.payload

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [task.id]: {...task}
        }
      };
    }
    case TaskActionTypes.SET_SELECTED_TASK_ID: {
      const {taskId} = action.payload

      return {
        ...state,
        selectedTaskId: taskId
      };
    }
    default:
      return state;
  }
};