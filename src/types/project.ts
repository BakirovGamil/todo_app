import { IProject } from './types'

interface Projects {
  [key: string]: IProject
}

export interface ProjectState {
  selectedProjectId: string | null,
  projects: Projects
}

export enum ProjectActionTypes {
  ADD_PROJECT = 'ADD_PROJECT',
  ADD_TASK_TO_PROJECT = 'ADD_TASK_TO_PROJECT',
  SET_SELECTED_PROJECT_ID = 'SET_SELECTED_PROJECT_ID',
  SET_TASK_IDS = 'SET_TASK_IDS',
  DELETE_PROJECT = 'DELETE_PROJECT',
  EDIT_PROJECT = 'EDIT_PROJECT'
}

export interface ProjectAction {
  type: ProjectActionTypes,
  payload: any
}