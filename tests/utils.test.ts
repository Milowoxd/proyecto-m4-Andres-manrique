import { describe, it, expect } from 'vitest';

// ============================================
// TESTS DE FUNCIONES UTILITARIAS
// ============================================

// Función que formatea el resumen de tareas para el email
function formatTaskSummary(tasks: { title: string; completed: boolean }[]) {
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  return { total: tasks.length, completed, pending };
}

// Función que valida que una tarea tenga título
function isValidTask(task: { title: string; description: string }) {
  return task.title.trim().length > 0;
}

// Función que formatea fecha
function formatDate(date: Date): string {
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Función que filtra tareas por estado
function filterTasks(
  tasks: { title: string; completed: boolean }[],
  filter: 'all' | 'completed' | 'pending'
) {
  if (filter === 'completed') return tasks.filter(t => t.completed);
  if (filter === 'pending') return tasks.filter(t => !t.completed);
  return tasks;
}

// ============================================
// TESTS
// ============================================

describe('formatTaskSummary', () => {
  it('debe contar correctamente tareas completadas y pendientes', () => {
    const tasks = [
      { title: 'Tarea 1', completed: true },
      { title: 'Tarea 2', completed: false },
      { title: 'Tarea 3', completed: true },
    ];
    const result = formatTaskSummary(tasks);
    expect(result.total).toBe(3);
    expect(result.completed).toBe(2);
    expect(result.pending).toBe(1);
  });

  it('debe retornar ceros si no hay tareas', () => {
    const result = formatTaskSummary([]);
    expect(result.total).toBe(0);
    expect(result.completed).toBe(0);
    expect(result.pending).toBe(0);
  });
});

describe('isValidTask', () => {
  it('debe retornar true para una tarea con titulo', () => {
    expect(isValidTask({ title: 'Mi tarea', description: '' })).toBe(true);
  });

  it('debe retornar false para una tarea sin titulo', () => {
    expect(isValidTask({ title: '', description: 'algo' })).toBe(false);
  });

  it('debe retornar false para un titulo con solo espacios', () => {
    expect(isValidTask({ title: '   ', description: '' })).toBe(false);
  });
});

describe('filterTasks', () => {
  const tasks = [
    { title: 'Tarea 1', completed: true },
    { title: 'Tarea 2', completed: false },
    { title: 'Tarea 3', completed: false },
  ];

  it('debe retornar todas las tareas con filtro all', () => {
    expect(filterTasks(tasks, 'all')).toHaveLength(3);
  });

  it('debe retornar solo las completadas', () => {
    expect(filterTasks(tasks, 'completed')).toHaveLength(1);
  });

  it('debe retornar solo las pendientes', () => {
    expect(filterTasks(tasks, 'pending')).toHaveLength(2);
  });
});

describe('formatDate', () => {
  it('debe formatear una fecha correctamente', () => {
    const date = new Date(2026, 5, 24);
    const result = formatDate(date);
    expect(result).toContain('2026');
  });
});