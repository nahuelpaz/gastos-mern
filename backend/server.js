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
app.use('/api/auth', authRoutes); // Asegúrate de que esta línea esté presente
app.use('/api/admin', adminRoutes);

const Category = require('./models/Category');  // Importá el modelo Category aquí

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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('MongoDB conectado');

  // Crear categorías predefinidas
  await createPredefinedCategories();

  app.listen(process.env.PORT, () => console.log(`Servidor en puerto ${process.env.PORT}`));
}).catch(err => console.error(err));
