import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

function PrivateRoutes() {
  const authToken = useAppSelector((store) => store.auth.token);
  const auth = !!authToken;

  return auth ? <Outlet /> : <Navigate to='/?auth=signin' />;
}

export default PrivateRoutes;
