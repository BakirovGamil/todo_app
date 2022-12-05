import moment from 'moment';
import { getDataLocalStorage } from '../../lib/todo';
import { TaskAction, TaskActionTypes, TaskState } from '../../types/task';
import { TaskStatus } from '../../types/types';

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
      const task = {...state.tasks[taskId]};
      if(status === TaskStatus.done) {
        task.dateCompletion = moment();
        task.timeCompletion = task.dateCompletion.diff(task.dateCreated, 'minutes');
      } else {
        delete task.dateCompletion;
        delete task.timeCompletion;
      }

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...task,
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
      const {taskId} = action.payload;

      return {
        ...state,
        selectedTaskId: taskId
      };
    }
    case TaskActionTypes.DELETE_TASK: {
      const {taskId} = action.payload;

      const tasks = {...state.tasks};
      delete tasks[taskId];

      return {
        ...state,
        tasks
      };
    }
    case TaskActionTypes.ADD_FILE_TO_TASK: {
      const {taskId, file} = action.payload;
      const task = state.tasks[taskId];
      const files = [...task.files];
      files.push(file);

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...task,
            files
          }
        }
      };
    }
    case TaskActionTypes.REMOVE_FILE_FROM_TASK: {
      const {taskId, fileId} = action.payload;
      const task = state.tasks[taskId];
      const files = [...task.files].filter((file) => file.id !== fileId);
      
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...task,
            files
          }
        }
      };
    }
    default:
      return state;
  }
};