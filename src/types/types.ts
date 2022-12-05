import  { Moment } from 'moment';

export enum TaskStatus {
  queue,
  development,
  done
}

export enum TaskPriority {
  low,
  medium,
  high
}

export interface ITask {
  id: string,
  projectId: string,
  title: string,
  desription: string,
  dateCreated: Moment,
  status: TaskStatus,
  priority: TaskPriority
}

export enum TaskListTypes {
  default,
  queue,
  development,
  done
}

export interface IProject {
  id: string,
  title: string,
  dateEdited: Moment,
  taskIds: string[]
}

export enum TaskListIds {
  queue = 'queue',
  development = 'development',
  done = 'done'
}

export interface TaskLists {
  [TaskListIds.queue]: ITask[],
  [TaskListIds.development]: ITask[],
  [TaskListIds.done]: ITask[]
}

export interface ISubTask {
  id: string,
  parentId: string,
  title: string,
  isDone: boolean
}

export interface IComment {
  id: string,
  taskId: string,
  parentId: string | null,
  commentIds: string[],
  commentText: string,
  dateCreated: Moment
}

export interface IOptions {
  isVisibleMenu: boolean
}

export interface Data {
  projects: {
    [ket: string]: IProject
  },
  tasks: {
    [key: string]: ITask
  },
  subTasks: {
    [key: string]: ISubTask
  },
  comments: {
    [key: string]: IComment
  },
  options: IOptions
}