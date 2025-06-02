import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiLogIn, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast'; // Asegúrate de que esté importado correctamente

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(''); // Limpia el estado de error antes de intentar iniciar sesión
      const res = await loginUser({ email, password }); // Asegúrate de que loginUser devuelva una respuesta válida
      if (res?.data?.token) {
        login({
          ...res.data.user,
          token: res.data.token,
        }); // Actualiza el contexto de autenticación
        toast.success('Inicio de sesión exitoso');
        navigate('/dashboard'); // Redirige al dashboard después de un inicio de sesión exitoso
      } else {
        throw new Error('Inicio de sesión fallido'); // Lanza un error si la respuesta no es exitosa
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
      setError(errorMessage);
      toast.error(errorMessage); // Muestra el error usando react-hot-toast
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
         
          <h2 className="text-2xl font-bold mt-2 flex items-center gap-2">
            <FiLogIn size={24} /> Iniciar sesión
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2">
              <FiX size={18} /> {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-gray-700 text-sm font-medium">Correo electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" size={18} />
              </div>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-gray-700 text-sm font-medium">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" size={18} />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <FiLogIn size={18} /> Ingresar
          </button>

          <p className="text-center text-gray-500 text-sm">
            ¿No tienes cuenta?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/register')} 
              className="text-blue-600 hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;