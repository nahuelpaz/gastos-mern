import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Bienvenido, {user.email}</h1>
      <p className="mb-4">Rol: <strong>{user.role}</strong></p>

      {user.role === 'admin' && (
        <button
          onClick={() => navigate('/admin')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
        >
          Ir a la página de Admin
        </button>
      )}

      <button
        onClick={handleLogout}
        className="mt-4 block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
