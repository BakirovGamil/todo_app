import { ChangeEvent, FormEvent, useRef, useState, FC } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Input from '../UI/Input/Input';
import { ITask, TaskPriority } from '../../types/types';
import { generateID } from '../../lib/todo';
import Button from '../UI/button/Button';
import Priority from './Priority';

interface TaskProps {
  initTask: ITask,
  onSave: (resultTask: ITask) => void; 
}

const TaskForm: FC<TaskProps> = ({ initTask, onSave }) => {
  const editorRef = useRef<any>(null);
  const [title, setTitle] = useState(initTask.title);
  const [priority, setPriority] = useState<TaskPriority>(initTask.priority);

  const onChangePriority = (e: ChangeEvent<HTMLSelectElement>) => {
    const key = TaskPriority[e.target.value as keyof typeof TaskPriority];
    const newPriority = TaskPriority[key] as unknown as TaskPriority;

    setPriority(newPriority);
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!title.trim()) return;
    
    const resultTask: ITask = {...initTask};
    resultTask.id = initTask.id || generateID();
    resultTask.title = title;
    resultTask.priority = priority;
    resultTask.desription = editorRef.current.getContent();

    onSave(resultTask);
  };

  return (
    <form className="taskForm" onSubmit={submit}>
      <div className="taskForm__section">
        <Input title="Заголовок" placeholder="Заголовок" value={title} onChange={onChangeTitle}/>
      </div>
      <div className="taskForm__section">
        <div className="taskForm__title">Приоритет</div>
        <div className="taskForm__priority">
          <Priority task={{...initTask, priority}}/>
          <select name="priority" defaultValue={priority} onChange={onChangePriority} className="taskForm__select">
            <option value={TaskPriority.low}>Низкий</option>
            <option value={TaskPriority.medium}>Средний</option>
            <option value={TaskPriority.high}>Высокий</option>
          </select>
        </div>
      </div>
      <div className="taskForm__section">
        <div className="taskForm__title">Описание</div>
        <Editor
          apiKey='7t30sehtuuwc12sv08futsmbafo1dr3h65qck5l7ftg4jehr'
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue={initTask.desription}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
          }}
        />
      </div>
      <div className="taskForm__section">
        <Button>
          Сохранить
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;