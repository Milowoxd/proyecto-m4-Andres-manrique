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
import type { Task, TaskFormValues } from '../types';

const tasksCollection = collection(db, 'tasks');

export function subscribeToTasks(userId: string, callback: (tasks: Task[]) => void) {
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

export async function createTask(userId: string, values: TaskFormValues) {
  return addDoc(tasksCollection, {
    ...values,
    completed: false,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateTask(taskId: string, values: Partial<TaskFormValues>) {
  const taskRef = doc(db, 'tasks', taskId);
  return updateDoc(taskRef, { ...values, updatedAt: serverTimestamp() });
}

export async function toggleTaskComplete(taskId: string, completed: boolean) {
  const taskRef = doc(db, 'tasks', taskId);
  return updateDoc(taskRef, { completed, updatedAt: serverTimestamp() });
}

export async function deleteTask(taskId: string) {
  return deleteDoc(doc(db, 'tasks', taskId));
}