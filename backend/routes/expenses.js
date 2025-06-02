const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Category = require('../models/Category');
const { verifyToken } = require('../middleware/authMiddleware');  

// Obtener gastos del usuario
router.get('/', verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).populate('category');
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener gastos' });
  }
});

// Crear gasto
router.post('/', verifyToken, async (req, res) => {
  const { description, amount, categoryId, date } = req.body;
  if (!description || !amount || !categoryId)
    return res.status(400).json({ message: 'Datos incompletos' });

  try {
    
    const category = await Category.findOne({
      _id: categoryId,
      $or: [{ user: null }, { user: req.user.id }],
    });
    if (!category) return res.status(400).json({ message: 'Categoría inválida' });

    const expense = new Expense({
      description,
      amount,
      category: categoryId,
      date: date || new Date(),
      user: req.user.id,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear gasto' });
  }
});

// Actualizar gasto (solo propietario)
router.put('/:id', verifyToken, async (req, res) => {
  const { description, amount, categoryId, date } = req.body;
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Gasto no encontrado' });
    if (expense.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'No autorizado' });

    if (categoryId) {
      const category = await Category.findOne({
        _id: categoryId,
        $or: [{ user: null }, { user: req.user.id }],
      });
      if (!category) return res.status(400).json({ message: 'Categoría inválida' });
      expense.category = categoryId;
    }

    if (description) expense.description = description;
    if (amount) expense.amount = amount;
    if (date) expense.date = date;

    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar gasto' });
  }
});

// Eliminar gasto (solo propietario)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Gasto no encontrado' });
    if (expense.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'No autorizado' });

    await expense.deleteOne();
    res.json({ message: 'Gasto eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar gasto' });
  }
});

module.exports = router;
