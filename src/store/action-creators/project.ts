import { ProjectActionTypes } from '../../types/project';
import { IProject } from '../../types/types';

export const addProject = (project: IProject) => {
  return {
    type: ProjectActionTypes.ADD_PROJECT,
    payload: project
  };
}

export const addTaskToProject = (projectId: string, taskId: string) => {
  return {
    type: ProjectActionTypes.ADD_TASK_TO_PROJECT,
    payload: {
      projectId,
      taskId
    }
  };
}

export const setSelectedProject = (projectId: string | null) => {
  return {
    type: ProjectActionTypes.SET_SELECTED_PROJECT_ID,
    payload: projectId
  };
}

export const setTaskIds = (projectId: string, taskIds: string[]) => {
  return {
    type: ProjectActionTypes.SET_TASK_IDS,
    payload: {
      projectId,
      taskIds
    }
  }
}

export const deleteProject = (projectId: string) => {
  return {
    type: ProjectActionTypes.DELETE_PROJECT,
    payload: {
      projectId
    }
  }
}

export const editProject = (project: IProject) => {
  return {
    type: ProjectActionTypes.EDIT_PROJECT,
    payload: {
      project
    }
  }
}