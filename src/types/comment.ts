import { IComment } from './types'

interface Comments {
  [key: string]: IComment
}

export interface CommentState {
  comments: Comments
}

export enum CommentActionTypes {
  ADD_COMMENT = 'ADD_COMMENT',
  DELETE_COMMENT = 'DELETE_COMMENT',
  ADD_COMMENT_TO_COMMENT = 'ADD_COMMENT_TO_COMMENT',
  DELETE_COMMENTS_TASK = 'DELETE_COMMENTS_TASK'
}

export interface CommentAction {
  type: CommentActionTypes,
  payload: any
}