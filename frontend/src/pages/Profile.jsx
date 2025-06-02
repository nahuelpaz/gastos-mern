import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiKey, FiLock, FiEye, FiEyeOff, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/change-password', {
        currentPassword,
        newPassword,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success(response.data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al cambiar la contraseña');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FiUser className="text-blue-500" size={28} /> 
            Mi Perfil
          </h1>
        </div>

        {/* Tarjeta de perfil */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
          {/* Banner superior */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 w-full"></div>

          {/* Contenido */}
          <div className="p-6 space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                <FiMail size={20} className="text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Correo electrónico</p>
                <p className="font-medium text-gray-800 truncate">{user.email}</p>
              </div>
            </div>

            {/* Rol */}
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                <FiKey size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Rol</p>
                <p className="font-medium text-gray-800 capitalize">{user.role}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-4"></div>

            {/* Mensaje adicional */}
            <p className="text-center text-sm text-gray-400 mb-4">
              Contacta al administrador para cambios en tu cuenta
            </p>

            {/* Sección de cambio de contraseña */}
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <button 
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FiLock className="text-green-600" size={18} />
                  </div>
                  <span className="font-medium text-gray-800">Cambiar contraseña</span>
                </div>
                {showPasswordForm ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
              </button>
              
              {showPasswordForm && (
                <form onSubmit={handlePasswordChange} className="p-4 space-y-4 bg-white">
                  <div className="relative">
                    <label className="block text-sm text-gray-600 mb-1">Contraseña actual</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm text-gray-600 mb-1">Nueva contraseña</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm text-gray-600 mb-1">Confirmar nueva contraseña</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors shadow-sm"
                    >
                      Guardar cambios
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;