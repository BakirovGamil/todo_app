import { ISubTask } from './types'

interface SubTasks {
  [key: string]: ISubTask
}

export interface SubTaskState {
  subTasks: SubTasks
}

export enum SubTaskActionTypes {
  ADD_SUBTASK = 'ADD_SUBTASK',
  DELETE_SUBTASK = 'DELETE_SUBTASK',
  DELETE_SUBTASKS_TASK = 'DELETE_SUBTASKS_TASK',
  EDIT_SUBTASK = 'EDIT_SUBTASK'
}

export interface SubTaskAction {
  type: SubTaskActionTypes,
  payload: any
}