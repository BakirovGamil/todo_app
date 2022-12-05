import moment from 'moment';
import { getDataLocalStorage } from '../../lib/todo';
import { ProjectAction, ProjectActionTypes, ProjectState } from '../../types/project';

const data = getDataLocalStorage();

const initialState: ProjectState = {
  selectedProjectId: null,
  projects: data.projects
};

export const projectReducer = (state = initialState, action: ProjectAction) => {
  switch(action.type) {
    case ProjectActionTypes.ADD_PROJECT:
      const newProject = action.payload;

      return {
        ...state, 
        projects: {
          ...state.projects,
          [newProject.id]: newProject
        }
      }; 
    case ProjectActionTypes.ADD_TASK_TO_PROJECT:
      const { projectId, taskId } = action.payload;
      const project ={...state.projects[projectId]};
      project.dateEdited = moment();
      const taskIds = [...project.taskIds];
      taskIds.unshift(taskId);

      return {
        ...state, 
        projects: {
          ...state.projects,
          [projectId]: {...project, taskIds}
        }
      };
    case ProjectActionTypes.SET_SELECTED_PROJECT_ID:
      return {...state, selectedProjectId: action.payload};
    case ProjectActionTypes.SET_TASK_IDS: {
      const {projectId, taskIds} = action.payload;
      const project = {...state.projects[projectId]};
      project.dateEdited = moment();

      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: {
            ...project,
            taskIds
          }
        }
      };
    }
    case ProjectActionTypes.DELETE_PROJECT: {
      const {projectId} = action.payload;
      const projects = {...state.projects};
      delete projects[projectId];

      return {
        ...state,
        projects: {
          ...projects
        }
      };
    }
    case ProjectActionTypes.EDIT_PROJECT: {
      const {project} = action.payload;
      project.dateEdited = moment();

      return {
        ...state,
        projects: {
          ...state.projects,
          [project.id]: {
            ...project
          }
        }
      }
    }
    default:
      return state;
  }
};