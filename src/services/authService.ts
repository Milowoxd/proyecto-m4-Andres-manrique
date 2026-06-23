import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from './firebase';

// ============================================
// PROVEEDOR DE GOOGLE
// ============================================
const googleProvider = new GoogleAuthProvider();

// ============================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================

// Registro con email y password
export async function registerWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Login con email y password
export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Login con Google
export async function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

// Cerrar sesión
export async function logout() {
  return signOut(auth);
}

// Traduce los códigos de error de Firebase a mensajes legibles
export function getAuthErrorMessage(code: string): string {
  const errors: Record<string, string> = {
    'auth/email-already-in-use': 'Este email ya está registrado.',
    'auth/invalid-email': 'El email no es válido.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/user-not-found': 'No existe una cuenta con este email.',
    'auth/wrong-password': 'La contraseña es incorrecta.',
    'auth/invalid-credential': 'Email o contraseña incorrectos.',
    'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
    'auth/popup-closed-by-user': 'Cerraste la ventana de Google antes de completar.',
  };
  return errors[code] || 'Ocurrió un error. Intenta de nuevo.';
}