import { useState, ChangeEvent, FormEvent, FC } from 'react';
import { useSubTaskActions } from '../../hooks/useActions';
import { generateID } from '../../lib/todo';
import { ITask } from '../../types/types';
import Button from '../UI/button/Button';
import Input from '../UI/Input/Input';

interface AddSubTaskFormProps {
  task: ITask
}

const AddSubTaskForm: FC<AddSubTaskFormProps> = ({task}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState('');
  const {addSubTask} = useSubTaskActions();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if(isAdding) {
      if(!subtaskTitle.trim()) {
        setIsAdding(false);
        setSubtaskTitle('');
        return;
      };

      addSubTask({
        id: generateID(),
        parentId: task.id,
        title: subtaskTitle,
        isDone: false
      });

      setSubtaskTitle('');
      setIsAdding(false);
    } else {
      setIsAdding(true);
    }
  };

  const onChangeSubtaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSubtaskTitle(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="addSubTaskForm">
      {
        isAdding &&
        <Input value={subtaskTitle} onChange={onChangeSubtaskTitle} placeholder="Заголовок подзадачи"/>
      }
      <Button>
        {isAdding
          ?  <span>Сохранить</span>
          : <span>+ Добавить подзадачу</span> 
        } 
      </Button>
    </form>
  );
}

export default AddSubTaskForm;