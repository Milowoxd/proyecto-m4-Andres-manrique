import { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext.tsx';
import { useTasks } from '../hooks/useTasks';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';


export default function Tasks() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { tasks, loading, error, addTask, editTask, toggleComplete, removeTask } =
    useTasks(user?.uid || '');
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  async function handleSendEmail() {
    setSendingEmail(true);
    setEmailStatus(null);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email,
          tasks,
        }),
      });
      if (!response.ok) throw new Error('Error al enviar email');
      setEmailStatus('Email enviado correctamente.');
    } catch {
      setEmailStatus('Error al enviar el email. Intenta de nuevo.');
    } finally {
      setSendingEmail(false);
    }
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="tasks-layout">
      <header className="tasks-header">
        <div className="tasks-header__left">
          <h1 className="tasks-title">MateCode Tasks</h1>
          <p className="tasks-subtitle">
            Hola, {user?.email} · {completedCount} completadas · {pendingCount} pendientes
          </p>
        </div>
        <div className="tasks-header__right">
          <button
            className="btn-secondary"
            onClick={handleSendEmail}
            disabled={sendingEmail || tasks.length === 0}
          >
            {sendingEmail ? 'Enviando...' : 'Enviar resumen por email'}
          </button>
          <button className="btn-outline" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {emailStatus && (
        <div className={`email-status ${emailStatus.includes('Error') ? 'email-status--error' : 'email-status--success'}`}>
          {emailStatus}
        </div>
      )}

      <main className="tasks-main">
        <section className="tasks-form-section">
          <h2>Nueva tarea</h2>
          <TaskForm onSubmit={addTask} />
        </section>

        <section className="tasks-list-section">
          <h2>Mis tareas</h2>
          {loading && <p>Cargando tareas...</p>}
          {error && <p className="error-text">{error}</p>}
          {!loading && (
            <TaskList
              tasks={tasks}
              onToggle={toggleComplete}
              onEdit={(id, values) => editTask(id, values)}
              onDelete={removeTask}
            />
          )}
        </section>
      </main>
    </div>
  );
}
