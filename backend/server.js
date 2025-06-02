const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categories');
const expenseRoutes = require('./routes/expenses');

app.use('/api/categories', categoryRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const Category = require('./models/Category');

const predefinedCategories = ['Sin categoría', 'Alimentos', 'Transporte', 'Entretenimiento', 'Salud', 'Educación'];

async function createPredefinedCategories() {
  for (const name of predefinedCategories) {
    const exists = await Category.findOne({ name, user: null });
    if (!exists) {
      await new Category({ name, user: null }).save();
      console.log(`Categoría predefinida creada: ${name}`);
    }
  }
}

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB conectado');

    // Crear categorías predefinidas
    await createPredefinedCategories();

    app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1); 
  });
