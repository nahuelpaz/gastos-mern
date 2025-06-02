import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'admin') return <Navigate to="/unauthorized" />;

  return children;
};

export default AdminRoute;
