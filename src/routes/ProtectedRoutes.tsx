import useAuth from '@/auth/hooks';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const { me } = useAuth();

  if (!me) {
    return <Navigate to="/" replace={true} />;
  }

  // 유저 정보가 있다면 자식 컴포넌트를 보여줌
  return <Outlet />;
}

export default ProtectedRoute;
