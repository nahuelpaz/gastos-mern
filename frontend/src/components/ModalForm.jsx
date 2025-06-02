import React from 'react';
import { FiX, FiSave, FiLoader } from 'react-icons/fi';

const ModalForm = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  loading,
  onCancel,
  submitLabel = 'Guardar',
  cancelLabel = 'Cancelar',
  children,
  showActions = true // Nueva prop con valor por defecto true
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="border-b border-gray-100 p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={onSubmit}>
          <div className="p-5 space-y-4">
            {children}
          </div>
          
          {showActions && (
            <div className="bg-gray-50 px-5 py-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-medium"
              >
                {cancelLabel}
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-white font-medium flex items-center ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 transition-colors duration-200'
                }`}
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <FiSave className="mr-2" />
                    {submitLabel}
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ModalForm;