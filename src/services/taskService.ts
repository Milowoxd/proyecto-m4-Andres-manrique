import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';


// ============================================
// REFERENCIA A LA COLECCIÓN
// ============================================
const tasksCollection = collection(db, 'tasks');

// ============================================
// SUSCRIPCIÓN EN TIEMPO REAL
// ============================================
// onSnapshot escucha cambios en Firestore en tiempo real.
// Cada vez que se crea, edita o elimina una tarea,
// llama al callback con la lista actualizada.
export function subscribeToTasks(
  userId: string,
  callback: (tasks: Task[]) => void
) {
  const q = query(tasksCollection, where('userId', '==', userId));

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        completed: data.completed,
        userId: data.userId,
        createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
        updatedAt: (data.updatedAt as Timestamp)?.toDate() || new Date(),
      } as Task;
    });
    callback(tasks);
  });
}

// ============================================
// CREAR TAREA
// ============================================
export async function createTask(userId: string, values: TaskFormValues) {
  return addDoc(tasksCollection, {
    ...values,
    completed: false,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

// ============================================
// ACTUALIZAR TAREA
// ============================================
export async function updateTask(taskId: string, values: Partial<TaskFormValues>) {
  const taskRef = doc(db, 'tasks', taskId);
  return updateDoc(taskRef, {
    ...values,
    updatedAt: serverTimestamp(),
  });
}

// ============================================
// MARCAR COMO COMPLETADA
// ============================================
export async function toggleTaskComplete(taskId: string, completed: boolean) {
  const taskRef = doc(db, 'tasks', taskId);
  return updateDoc(taskRef, {
    completed,
    updatedAt: serverTimestamp(),
  });
}

// ============================================
// ELIMINAR TAREA
// ============================================
export async function deleteTask(taskId: string) {
  const taskRef = doc(db, 'tasks', taskId);
  return deleteDoc(taskRef);
}
