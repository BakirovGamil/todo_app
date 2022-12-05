import moment from 'moment';
import { FC, FormEvent, ChangeEvent, useState} from 'react';
import { useCommentActions } from '../../hooks/useActions';
import { generateID } from '../../lib/todo';
import { IComment, ITask } from '../../types/types';
import Button from '../UI/button/Button';
import Input from '../UI/Input/Input';

interface AddCommentFormProps {
  task: ITask
}

const AddCommentForm: FC<AddCommentFormProps> = ({ task }) => {
  const [commentText, setCommentText] = useState(''); 
  const onChangeCommentText = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const {addComment} = useCommentActions();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if(!commentText.trim()) return;

    const newComment: IComment = {
      id: generateID(),
      taskId: task.id,
      parentId: null,
      commentText,
      commentIds: [],
      dateCreated: moment()
    };

    addComment(newComment);
    setCommentText('');
  };

  return (
    <form onSubmit={onSubmit} className="addCommentForm">
      <Input placeholder="Комментарий..." value={commentText} onChange={onChangeCommentText} className="addCommentForm__input"/>
      <Button>
        Добавить
      </Button>
    </form>
  );
}

export default AddCommentForm;