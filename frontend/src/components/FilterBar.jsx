import React, { useState, useRef, useEffect } from "react";
import { FiX, FiChevronDown } from "react-icons/fi";

const FilterBar = ({ filters, onFilterChange }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const activeFilters = filters.filter((filter) => {
    if (filter.type === "multiselect") {
      return filter.value && filter.value.length > 0;
    }
    return filter.value;
  });

  const clearFilter = (name) => {
    const filterConfig = filters.find(f => f.name === name);
    if (filterConfig && filterConfig.type === "multiselect") {
      onFilterChange(name, []);
    } else {
      onFilterChange(name, "");
    }
  };

  const clearAllFilters = () => {
    filters.forEach((filter) => {
      if (filter.type === "multiselect") {
        onFilterChange(filter.name, []);
      } else {
        onFilterChange(filter.name, "");
      }
    });
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const MultiSelectDropdown = ({ filter }) => {
    const selectedValues = filter.value || [];
    const isOpen = openDropdown === filter.name;

    const toggleDropdown = () => {
      setOpenDropdown(isOpen ? null : filter.name);
    };

    const handleOptionClick = (optionValue) => {
      onFilterChange(filter.name, optionValue);
    };

    const getDisplayText = () => {
      if (selectedValues.length === 0) {
        return filter.placeholder;
      }
      if (selectedValues.length === 1) {
        const option = filter.options.find(opt => opt.value === selectedValues[0]);
        return option ? option.label : selectedValues[0];
      }
      return `${selectedValues.length} seleccionadas`;
    };

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full px-4 py-2 text-left border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center"
        >
          <span className={selectedValues.length === 0 ? "text-gray-500" : "text-gray-900"}>
            {getDisplayText()}
          </span>
          <FiChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {filter.options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                  selectedValues.includes(option.value) ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                }`}
              >
                <span>{option.label}</span>
                {selectedValues.includes(option.value) && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const getFilterDisplayValue = (filter) => {
    if (filter.type === "select") {
      const option = filter.options.find(opt => opt.value === filter.value);
      return option ? option.label : filter.value;
    }
    
    return filter.value;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filters.map((filter) => (
          <div key={filter.name} className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              {filter.label}
            </label>
            {filter.type === "multiselect" ? (
              <MultiSelectDropdown filter={filter} />
            ) : filter.type === "select" ? (
              <select
                name={filter.name}
                value={filter.value}
                onChange={(e) => onFilterChange(filter.name, e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition"
              >
                <option value="">{filter.placeholder}</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={filter.type}
                name={filter.name}
                value={filter.value}
                onChange={(e) => onFilterChange(filter.name, e.target.value)}
                placeholder={filter.placeholder}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition"
              />
            )}
          </div>
        ))}
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activeFilters.map((filter) => {
            // Para multiselect, crear una etiqueta por cada categoría seleccionada
            if (filter.type === "multiselect" && filter.value && filter.value.length > 0) {
              return filter.value.map((selectedValue) => {
                const option = filter.options.find(opt => opt.value === selectedValue);
                const displayLabel = option ? option.label : selectedValue;
                return (
                  <div
                    key={`${filter.name}-${selectedValue}`}
                    className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow-sm"
                  >
                    <span>{filter.label}: {displayLabel}</span>
                    <button
                      onClick={() => onFilterChange(filter.name, selectedValue)}
                      className="ml-2 text-blue-700 hover:text-blue-900"
                    >
                      <FiX />
                    </button>
                  </div>
                );
              });
            }
            
            // Para otros tipos de filtro, mantener comportamiento original
            return (
              <div
                key={filter.name}
                className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow-sm"
              >
                <span>{filter.label}: {getFilterDisplayValue(filter)}</span>
                <button
                  onClick={() => clearFilter(filter.name)}
                  className="ml-2 text-blue-700 hover:text-blue-900"
                >
                  <FiX />
                </button>
              </div>
            );
          })}
          <button
            onClick={clearAllFilters}
            className="ml-auto bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm shadow-sm hover:bg-red-200"
          >
            Limpiar todas
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;