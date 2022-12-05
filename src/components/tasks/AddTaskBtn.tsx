import { FC, useState } from 'react';
import { TaskStatus } from '../../types/types';
import Modal from '../UI/modal/Modal';
import AddTaskForm from './AddTaskForm';

interface AddTaskBtnProps {
  taskStatus?: TaskStatus
}

const AddTaskBtn: FC<AddTaskBtnProps> = ({ taskStatus = TaskStatus.queue }) => {
  const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);

  const openAddModal = () => setIsVisibleAddModal(true);

  return (
    <div>
      <Modal isVisible={isVisibleAddModal} setIsVisible={setIsVisibleAddModal} title="Добавить задачу" preload className="addTaskModal">
        <AddTaskForm taskStatus={taskStatus} setIsVisible={setIsVisibleAddModal}/>
      </Modal>
      <button className="taskList__addBtn title" onClick={() => openAddModal()}>+ Новая задача</button>
    </div>
  );
}

export default AddTaskBtn;