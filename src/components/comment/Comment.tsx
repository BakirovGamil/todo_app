import moment from 'moment';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useCommentActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { generateID } from '../../lib/todo';
import { IComment } from '../../types/types';
import Input from '../UI/Input/Input';

interface CommentProps {
  comment: IComment
}

const Comment: FC<CommentProps> = ({ comment }) => {
  const comments = useTypedSelector((state) => state.comments.comments);
  const commentIds = comment.commentIds;
  const {addComment, addCommentToComment, deleteComment} = useCommentActions();

  const onDelete = () => {
    deleteComment(comment.id);
  };

  const [isAddingComment, setIsAddingComment] = useState(false);
  const onAddChlidCommet = () => {
    setIsAddingComment(!isAddingComment);
  };

  const [commentText, setCommentText] = useState('');
  const onChangeCommentText = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const onAddCommentToCommend = (e: FormEvent) => {
    e.preventDefault();
    
    const newComment: IComment = {
      id: generateID(),
      parentId: comment.id,
      commentText: commentText,
      commentIds: [],
      dateCreated: moment(),
      taskId: comment.taskId
    };

    addComment(newComment);
    addCommentToComment(comment.id, newComment.id);
    setCommentText('');
    setIsAddingComment(false);
  };

  return (
    <div className="comment">
      <div className="comment__body">
        <div className="comment__text">
          {comment.commentText}
        </div>
        <button className="comment__deleteBtn" onClick={onDelete}>
          <i className="comment__icon">
            &#10006;
          </i>
        </button>
      </div>
      <div className="comment__footer">
        <div className="comment__addComment">
          <button className="comment__addBtn" onClick={onAddChlidCommet}>
            {
              isAddingComment
              ? <span style={{color: 'pink'}}>Отмена</span>
              : <span>Оставить комментарий</span>
            }
          </button>
        </div>
        <div className="comment__dateCreated">
          {comment.dateCreated.format('DD.MM.YYYY hh:MM')}
        </div>
      </div>
      {
        isAddingComment &&
        <form onSubmit={onAddCommentToCommend}>
          <Input placeholder="Комментарий" value={commentText} onChange={onChangeCommentText}></Input>
        </form>
      }
      {
        Boolean(commentIds.length) && 
        <div>
          {commentIds.map((commentId) => <Comment key={commentId} comment={comments[commentId]}/>)}
        </div>
      }
    </div>
  );
}

export default Comment;