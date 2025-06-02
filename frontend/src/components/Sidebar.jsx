import { NavLink, useNavigate } from "react-router-dom";
import {
  FiPieChart,
  FiDollarSign,
  FiFolder,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada exitosamente');
    navigate("/login");
  };

  return (
    <div
      className={`h-screen bg-gray-800 text-white fixed left-0 top-0 flex flex-col border-r border-gray-700 transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo/Título */}
      <div
        className={`flex items-center ${
          collapsed ? "justify-center p-4" : "gap-3 p-6 pl-2"
        } mb-10`}
      >
        <RiMoneyDollarCircleLine className="text-2xl text-blue-400" />
        {!collapsed && (
          <h2 className="text-xl font-bold text-gray-100">Finance Dashboard</h2>
        )}
      </div>

      {/* Menú principal */}
      <nav className="flex flex-col gap-1 flex-grow">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center p-3" : "gap-3 p-3 mx-2"
            } rounded-lg transition-colors duration-200
            ${
              isActive
                ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-400"
                : "hover:bg-gray-700/50 hover:text-gray-100 text-gray-300"
            }`
          }
        >
          <FiPieChart className="text-lg" />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/expense"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center p-3" : "gap-3 p-3 mx-2"
            } rounded-lg transition-colors duration-200
            ${
              isActive
                ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-400"
                : "hover:bg-gray-700/50 hover:text-gray-100 text-gray-300"
            }`
          }
        >
          <FiDollarSign className="text-lg" />
          {!collapsed && <span>Gastos</span>}
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center p-3" : "gap-3 p-3 mx-2"
            } rounded-lg transition-colors duration-200
            ${
              isActive
                ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-400"
                : "hover:bg-gray-700/50 hover:text-gray-100 text-gray-300"
            }`
          }
        >
          <FiFolder className="text-lg" />
          {!collapsed && <span>Categorías</span>}
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center ${
              collapsed ? "justify-center p-3" : "gap-3 p-3 mx-2"
            } rounded-lg transition-colors duration-200
            ${
              isActive
                ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-400"
                : "hover:bg-gray-700/50 hover:text-gray-100 text-gray-300"
            }`
          }
        >
          <FiUser className="text-lg" />
          {!collapsed && <span>Perfil</span>}
        </NavLink>
      </nav>

      {/* Menú inferior */}
      <div className="mt-auto mb-4">
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            collapsed ? "justify-center p-3" : "gap-3 p-3 mx-2"
          } rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-red-400 transition-colors duration-200`}
        >
          <FiLogOut className="text-lg transform rotate-180" />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>

      {/* Botón de colapso */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-gray-300 hover:text-white rounded-full p-1 border border-gray-700 shadow-md hover:bg-gray-700 transition-colors duration-200"
      >
        {collapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
      </button>
    </div>
  );
};

export default Sidebar;
