const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
const citaRoutes = require('./routes/citaRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Conexión DB
connectDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/citas', citaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
