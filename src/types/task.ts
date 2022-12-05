import { ITask } from './types'

interface Tasks {
    [key: string]: ITask
}

export interface TaskState {
  selectedTaskId: string | null,
  tasks: Tasks
}

export enum TaskActionTypes {
  ADD_TASK = 'ADD_TASK',
  CHANGE_STATUS = 'CHANGE_STATUS',
  DELETE_TASKS = 'DELETE_TASKS',
  EDIT_TASK = 'EDIT_TASK',
  SET_SELECTED_TASK_ID = 'SET_SELECTED_TASK_ID'
}

export interface TaskAction {
  type: TaskActionTypes,
  payload: any
}