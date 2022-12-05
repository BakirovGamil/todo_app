import moment, { Moment } from 'moment';
import { Data, ITask, TaskLists, TaskStatus } from '../types/types';

export const generateID = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const getTasksByStatus = (tasks: ITask[], status: TaskStatus) => {
  return tasks?.filter((task) => task.status === status);
};

export const compareDate = (firstDate: Moment, secondDate: Moment) => {
  if(firstDate.isAfter(secondDate)) return -1;
  if(firstDate.isBefore(secondDate)) return 1;

  return 0;
};

export const getTaskIdsFromTaskList = (taskList: TaskLists) => {
  const queueTask = taskList.queue.map((task) => task.id);
  const developmentTask = taskList.development.map((task) => task.id);
  const doneTask = taskList.done.map((task) => task.id);

  return [...queueTask, ...developmentTask, ...doneTask];
};

export const replacer = (key: string, value: any) => {
  let newValue: Moment = value;
  const regDate = /date/ig;
  if(regDate.test(key)) {
    newValue = moment(value);
  }

  return newValue;
};

export const saveDataLocalStorage = (data: Data) => {
  localStorage.setItem('todo', JSON.stringify(data));
};

const defaultData: Data = {
  projects: {},
  tasks: {},
  subTasks: {},
  comments: {},
  options: {
    isVisibleMenu: false
  }
};

export const getDataLocalStorage = () => {
  const dataJSON = localStorage.getItem('todo');
  if(dataJSON === null) return defaultData;

  const data: Data = JSON.parse(dataJSON, replacer);

  return data;
};