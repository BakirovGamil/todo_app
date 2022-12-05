import { CommentActionTypes } from '../../types/comment'
import { IComment } from '../../types/types'

export const addComment = (comment: IComment) => {
  return {
    type: CommentActionTypes.ADD_COMMENT,
    payload: {
      comment
    }
  };
};

export const deleteComment = (commentId: string) => {
  return {
    type: CommentActionTypes.DELETE_COMMENT,
    payload: {
      commentId
    }
  };
};

export const deleteCommentsTask = (taskId: string) => {
  return {
    type: CommentActionTypes.DELETE_COMMENTS_TASK,
    payload: {
      taskId
    }
  };
};

export const addCommentToComment = (parentCommentId: string, childCommentId: string) => {
  return {
    type: CommentActionTypes.ADD_COMMENT_TO_COMMENT,
    payload: {
      parentCommentId,
      childCommentId
    }
  };
};