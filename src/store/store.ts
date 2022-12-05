import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { projectReducer } from './reducers/projectReducer';
import { taskReducer } from './reducers/taskReducer';
import { subTaskReducer } from './reducers/subTaskReducer';
import { commentReducer } from './reducers/commentReducer';
import { optionsReducer } from './reducers/optionsReducer';


const rootReducer = combineReducers({
  tasks: taskReducer,
  projects: projectReducer,
  subTasks: subTaskReducer,
  comments: commentReducer,
  options: optionsReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;

export type RootState = ReturnType<typeof rootReducer>; 