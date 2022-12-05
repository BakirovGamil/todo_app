import { useMemo } from 'react';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as taskActionCreators from '../store/action-creators/task';
import * as projectActionCreators from '../store/action-creators/project';
import * as subTaskActionCreators from '../store/action-creators/subTask';
import * as commentActionCreators from  '../store/action-creators/comment';
import * as optionsActionCreators from  '../store/action-creators/options';

export const useTaskActions = () => {
  const dispatch = useDispatch(); 
  
  //useMemo - т.к. срабатывает useEffect если action передать в массив зависимостей
  return useMemo(() => bindActionCreators(taskActionCreators, dispatch), [dispatch]); 
};

export const useProjectActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(projectActionCreators, dispatch), [dispatch]);
};

export const useSubTaskActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(subTaskActionCreators, dispatch), [dispatch]);
};

export const useCommentActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(commentActionCreators, dispatch), [dispatch]);
};

export const useOptionsActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(optionsActionCreators, dispatch), [dispatch]);
};