import { getDataLocalStorage } from '../../lib/todo';
import { CommentAction, CommentActionTypes, CommentState } from '../../types/comment';
import { Data } from '../../types/types';

const data: Data = getDataLocalStorage();

const initialState: CommentState = {
  comments: data.comments
};

export const commentReducer = (state: CommentState = initialState, action: CommentAction) => {
  switch(action.type) {
    case CommentActionTypes.ADD_COMMENT: {
      const {comment} = action.payload;

      return {
        ...state,
        comments: {
          ...state.comments,
          [comment.id]: comment
        }
      };
    }
    case CommentActionTypes.DELETE_COMMENT: {
      const { commentId } = action.payload;
      const comments = {...state.comments};
      const currentComment = comments[commentId];

      const parentId = currentComment.parentId;
      if(parentId) {
        const parentComment = comments[parentId];
        const parentCommentIds = parentComment.commentIds;
        const newParentCommentIds = parentCommentIds.filter((childCommentId) => childCommentId !== commentId);
        comments[parentId] =  {
          ...parentComment,
          commentIds: newParentCommentIds
        }
      }

      const currentCommentIds = currentComment.commentIds;
      for(let childCommentId of currentCommentIds) {
        delete comments[childCommentId];
      }

      delete comments[commentId];

      return {
        ...state,
        comments
      };
    }
    case CommentActionTypes.ADD_COMMENT_TO_COMMENT: {
      const {parentCommentId, childCommentId} = action.payload;

      const parentComment = {...state.comments[parentCommentId]};
      const parentCommentIds = [...parentComment.commentIds];
      parentCommentIds.push(childCommentId);

      const childComment = {...state.comments[childCommentId]};
      childComment.taskId = parentComment.taskId;
      childComment.parentId = parentCommentId;

      return {
        ...state,
        comments: {
          ...state.comments,
          [parentCommentId]: {
            ...parentComment,
            commentIds: parentCommentIds
          },
          [childCommentId]: childComment
        }
      };
    }
    case CommentActionTypes.DELETE_COMMENTS_TASK: {
      const {taskId} = action.payload;
      const comments = {...state.comments};
      const commentList = Object.values(comments);
      commentList.forEach(comment => {
        if(comment.taskId === taskId) {
          delete comments[comment.id];
        }
      });

      return {
        ...state,
        comments
      }
    }
    default:
      return state;
  }
};