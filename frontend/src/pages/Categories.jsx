import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { getCategories } from '../api/categories';
import Table from '../components/Table';
import CategoryFormModal from '../components/CategoryFormModal';
import CategoryActions from '../components/CategoryActions';
import FilterBar from '../components/FilterBar';
import toast from 'react-hot-toast';
import NewCategoryButton from '../components/NewCategoryButton';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ name: "", type: "" });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      setError('Error al cargar categorías');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openModalForCreate = () => {
    setEditingCategory(null);
    setCategoryName('');
    setModalOpen(true);
    setError(null);
  };

  const openModalForEdit = (cat) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setModalOpen(true);
    setError(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCategory(null);
    setCategoryName('');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError('Por favor, ingresa un nombre para la categoría');
      toast.error('Por favor, ingresa un nombre para la categoría');
      return;
    }

    try {
      if (editingCategory) {
        await axios.put(`api/categories/${editingCategory._id}`, { name: categoryName });
        toast.success('Categoría actualizada exitosamente');
      } else {
        await axios.post('api/categories', { name: categoryName });
        toast.success('Categoría creada exitosamente');
      }
      await fetchCategories();
      closeModal();
    } catch (error) {
      const errorMessage = editingCategory ? 'Error al editar categoría' : 'Error al crear categoría';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    toast((t) => (
      <div className="flex flex-col space-y-2">
        <p>¿Estás seguro de eliminar esta categoría?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await axios.delete(`api/categories/${id}`);
                await fetchCategories();
                toast.success('Categoría eliminada exitosamente');
              } catch (error) {
                const errorMessage = 'Error al eliminar categoría';
                setError(errorMessage);
                toast.error(errorMessage);
              }
            }}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Eliminar
          </button>
        </div>
      </div>
    ));
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredCategories = categories.filter((cat) => {
    if (filters.name && !cat.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }
    if (filters.type === "predeterminada" && cat.user !== null) return false;
    if (filters.type === "personalizada" && cat.user === null) return false;
    return true;
  });

  if (loading) return <div className="text-center py-8">Cargando categorías...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-800">Categorías</h1>
        <NewCategoryButton onClick={openModalForCreate} />
      </div>

      <FilterBar
        filters={[
          {
            name: "name",
            label: "Nombre",
            type: "text",
            value: filters.name,
            placeholder: "Buscar categoría",
          },
          {
            name: "type",
            label: "Tipo",
            type: "select",
            value: filters.type,
            placeholder: "Todos los tipos",
            options: [
              { value: "predeterminada", label: "Predeterminada" },
              { value: "personalizada", label: "Personalizada" },
            ],
          },
        ]}
        onFilterChange={handleFilterChange}
      />

      {error && !modalOpen && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          {error}
        </div>
      )}

      <Table
        columns={[{ key: 'name', label: 'Nombre', bold: true }]}
        data={filteredCategories}
        actions={(cat) => (
          <CategoryActions
            category={cat}
            onEdit={openModalForEdit}
            onDelete={handleDelete}
          />
        )}
      />

      <CategoryFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        error={error}
        editingCategory={editingCategory}
      />
    </div>
  );
};

export default Categories;
