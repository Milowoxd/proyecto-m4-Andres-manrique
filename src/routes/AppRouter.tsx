import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../features/auth/authService';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Importamos Tasks como placeholder por ahora
// Lo reemplazaremos cuando creemos la página real
function TasksPlaceholder() {
  return <div style={{ padding: '2rem' }}>Página de tareas — próximamente</div>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      {/* AuthProvider envuelve todo para que cualquier componente
          pueda acceder al estado de autenticación */}
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksPlaceholder />
              </ProtectedRoute>
            }
          />

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}