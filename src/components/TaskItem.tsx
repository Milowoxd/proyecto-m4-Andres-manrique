import { useState } from 'react';

import TaskForm from './TaskForm';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string, completed: boolean) => void;
  onEdit: (taskId: string, values: Partial<TaskFormValues>) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit(values: TaskFormValues) {
    onEdit(task.id, values);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="task-item task-item--editing">
        <TaskForm
          onSubmit={handleEdit}
          initialValues={{ title: task.title, description: task.description }}
          submitLabel="Guardar cambios"
        />
        <button className="btn-secondary" onClick={() => setIsEditing(false)}>
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
      <div className="task-item__content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={e => onToggle(task.id, e.target.checked)}
          className="task-checkbox"
        />
        <div className="task-info">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>
      </div>
      <div className="task-actions">
        <button
          className="btn-icon"
          onClick={() => setIsEditing(true)}
          title="Editar"
        >
          
        </button>
        <button
          className="btn-icon btn-icon--danger"
          onClick={() => onDelete(task.id)}
          title="Eliminar"
        >
          
        </button>
      </div>
    </div>
  );
}
