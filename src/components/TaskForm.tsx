import { useState } from 'react';

type TaskFormValues = {
  title: string;
  description: string;
};

type TaskFormProps = {
  onSubmit: (values: TaskFormValues) => void;
  initialValues?: TaskFormValues;
  submitLabel?: string;
};

export default function TaskForm({
  onSubmit,
  initialValues = { title: '', description: '' },
  submitLabel = 'Crear tarea',
}: TaskFormProps) {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError('El titulo es obligatorio.');
      return;
    }
    onSubmit({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Titulo</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Nombre de la tarea"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descripcion</label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Descripcion opcional"
          rows={3}
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="btn-primary">
        {submitLabel}
      </button>
    </form>
  );
}