const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Expense = require('../models/Expense');
const { verifyToken } = require('../middleware/authMiddleware');  // <-- así importas

// Obtener categorías globales + propias
router.get('/', verifyToken, async (req, res) => {
  try {
    const categories = await Category.find({
      $or: [{ user: null }, { user: req.user.id }],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
});

// Actualizar categoría (solo user/admin logueado)
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Nombre requerido' });

  try {
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });

    // No se puede modificar categoría global
    if (category.user === null) {
      return res.status(403).json({ message: 'No se puede modificar una categoría global' });
    }

    // Solo puede modificar su propia categoría
    if (category.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    category.name = name;
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar categoría' });
  }
});

// Eliminar categoría (solo user/admin logueado)
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });

    // No se puede eliminar categoría global
    if (category.user === null) {
      return res.status(403).json({ message: 'No se puede eliminar una categoría global' });
    }

    // Solo puede eliminar su propia categoría
    if (category.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    // Buscar la categoría "Sin categoría"
    const uncategorizedCategory = await Category.findOne({ 
      name: 'Sin categoría',
      user: null 
    });
    
    if (!uncategorizedCategory) {
      return res.status(500).json({ 
        message: 'Error: Categoría "Sin categoría" no encontrada en el sistema' 
      });
    }

    // Actualizar todos los gastos que usan esta categoría
    await Expense.updateMany(
      { category: id },
      { category: uncategorizedCategory._id }
    );

    // Eliminar la categoría
    await Category.findByIdAndDelete(id);
    
    res.json({ 
      message: 'Categoría eliminada y gastos reasignados a "Sin categoría"' 
    });
  } catch (err) {
    console.error('Error al eliminar categoría:', err);
    res.status(500).json({ message: 'Error al eliminar categoría' });
  }
});


// Crear categoría personalizada (solo user/admin logueado)
router.post('/', verifyToken, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Nombre requerido' });

  try {
    const exists = await Category.findOne({
      name,
      $or: [{ user: null }, { user: req.user.id }],
    });
    if (exists) return res.status(400).json({ message: 'Categoría ya existe' });

    const category = new Category({
      name,
      user: req.user.id,
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear categoría' });
  }
});

module.exports = router;
