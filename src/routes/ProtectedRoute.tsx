import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

// ============================================
// RUTA PROTEGIDA
// ============================================
// Este componente decide si el usuario puede ver
// una página o debe ser redirigido al login.

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  // Mientras Firebase verifica si hay sesión activa,
  // mostramos un estado de carga para evitar
  // redireccionamientos prematuros
  if (loading) {
    return (
      <div className="loading-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  // Si no hay usuario autenticado, redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, muestra la página solicitada
  return <>{children}</>;
}   