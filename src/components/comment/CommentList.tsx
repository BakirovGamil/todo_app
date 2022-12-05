import { FC } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ITask } from '../../types/types';
import Comment from './Comment';

interface CommentListProps {
  task: ITask
}

const CommentList: FC<CommentListProps> = ({task}) => {
  const comments = useTypedSelector((state) => state.comments.comments);
  const taskComments = Object.values(comments).filter((comment) => comment.taskId === task.id && comment.parentId === null).reverse();

  return (
    <div className="commentList">
      {
        taskComments.map((comment) => <Comment key={comment.id} comment={comment}/>)
      }
    </div>
  );
}

export default CommentList;