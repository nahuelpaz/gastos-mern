import { useState } from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUserPlus, FiArrowLeft, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast'; // Asegúrate de que esté importado correctamente


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(''); // Limpia el estado de error antes de intentar registrar
      const response = await registerUser({ email, password }); // Asegúrate de que registerUser devuelva una respuesta válida
      if (response?.data?.success || response?.status === 201) { // Valida el éxito según la estructura de la respuesta
        toast.success('Usuario registrado exitosamente');
        navigate('/login'); // Redirige al login después de un registro exitoso
      } else {
        throw new Error('Registro fallido'); // Lanza un error si la respuesta no es exitosa
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al registrar usuario';
      setError(errorMessage);
      toast.error(errorMessage); // Muestra el error usando react-hot-toast
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-1 text-sm hover:underline"
          >
            <FiArrowLeft size={16} /> Volver
          </button>
          <h2 className="text-2xl font-bold mt-2 flex items-center gap-2">
            <FiUserPlus size={24} /> Crear cuenta
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
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <FiUserPlus size={18} /> Registrarse
          </button>

          <p className="text-center text-gray-500 text-sm">
            ¿Ya tienes cuenta?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/login')} 
              className="text-green-600 hover:underline"
            >
              Inicia sesión aquí
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;