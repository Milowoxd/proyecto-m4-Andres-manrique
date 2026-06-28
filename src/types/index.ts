export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskFormValues = {
  title: string;
  description: string;
};

export type AuthFormValues = {
  email: string;
  password: string;
};

export type AsyncState = {
  loading: boolean;
  error: string | null;
};