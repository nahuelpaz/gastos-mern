import React from 'react';
import ModalForm from './ModalForm';

const CategoryFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  categoryName,
  setCategoryName,
  error,
  editingCategory,
}) => {
  return (
    <ModalForm
      title={editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onSubmit={onSubmit}
      loading={false}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej. Comida"
            autoFocus
          />
        </div>
        {error && (
          <div className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}
      </div>
    </ModalForm>
  );
};

export default CategoryFormModal;
