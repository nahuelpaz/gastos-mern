import React from "react";
import { FiAlertTriangle, FiHome, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        {/* Icono de error */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full">
            <FiAlertTriangle className="text-red-500 text-5xl" />
          </div>
        </div>
        
        {/* Título y mensaje */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">404 - Página no encontrada</h1>
        <p className="text-gray-600 mb-6">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        
        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            <FiHome /> Ir al Inicio
          </Link>

        </div>
      </div>
    </div>
  );
};

export default NotFound;