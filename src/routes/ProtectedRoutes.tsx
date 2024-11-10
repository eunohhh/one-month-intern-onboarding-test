import { useMeQuery } from '@/auth';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const token = localStorage.getItem('one-month-intern-token');
  const { data: me, isPending } = useMeQuery(token);

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!me) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
