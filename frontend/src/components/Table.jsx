import React from 'react';
import { FiEdit2, FiTrash2, FiEye, FiMoreHorizontal, FiAlertCircle } from 'react-icons/fi';

const Table = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  {column.label}
                  {column.sortable && (
                    <button className="ml-1 text-gray-400 hover:text-gray-600">
                      <FiMoreHorizontal size={14} />
                    </button>
                  )}
                </div>
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-6 py-8 text-center"
              >
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <FiAlertCircle size={32} className="mb-2" />
                  <p className="text-sm font-medium">No hay datos para mostrar</p>
                  <p className="text-xs mt-1">Agrega nuevos registros para verlos aquí</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr 
                key={item._id || item.id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {columns.map((column) => {
                  const value = column.key.includes('.')
                    ? column.key.split('.').reduce((acc, key) => acc?.[key], item)
                    : item[column.key];

                  return (
                    <td
                      key={column.key}
                      className={`px-6 py-4 text-sm ${column.bold ? 'font-medium text-gray-900' : 'text-gray-500'}`}
                    >
                      {column.render ? column.render(item) : (value ?? '-')}
                    </td>
                  );
                })}

                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {actions(item)}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Componentes de acción predefinidos para usar en la tabla
Table.ActionEdit = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors duration-200"
    title="Editar"
  >
    <FiEdit2 size={18} />
  </button>
);

Table.ActionDelete = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
    title="Eliminar"
  >
    <FiTrash2 size={18} />
  </button>
);

Table.ActionView = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50 transition-colors duration-200"
    title="Ver"
  >
    <FiEye size={18} />
  </button>
);

export default Table;