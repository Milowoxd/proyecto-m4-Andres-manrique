import { useState, useEffect } from 'react';
import type { Task, TaskFormValues } from '../types';
import { subscribeToTasks, createTask, updateTask, toggleTaskComplete, deleteTask } from '../services/taskService';

export function useTasks(userId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const unsubscribe = subscribeToTasks(userId, (tasks) => {
      setTasks(tasks);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  async function addTask(values: TaskFormValues) {
    try { await createTask(userId, values); }
    catch { setError('Error al crear la tarea.'); }
  }

  async function editTask(taskId: string, values: Partial<TaskFormValues>) {
    try { await updateTask(taskId, values); }
    catch { setError('Error al actualizar la tarea.'); }
  }

  async function toggleComplete(taskId: string, completed: boolean) {
    try { await toggleTaskComplete(taskId, completed); }
    catch { setError('Error al actualizar la tarea.'); }
  }

  async function removeTask(taskId: string) {
    try { await deleteTask(taskId); }
    catch { setError('Error al eliminar la tarea.'); }
  }

  return { tasks, loading, error, addTask, editTask, toggleComplete, removeTask };
}