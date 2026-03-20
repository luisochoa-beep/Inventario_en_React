const express = require('express');
const cors = require('cors');
const db = require('./SRC/models/connection');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Rutas
app.use('/api/productos', require('./SRC/routes/productosRoutes'));
app.use('/api/proveedores', require('./SRC/routes/proveedorsRoutes'));
app.use('/api/usuarios', require('./SRC/routes/usuariosRoutes'));

// Health check
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT NOW()');
    res.json({ status: 'OK', mensaje: 'API funcionando correctamente', bd: 'conectada' });
  } catch (error) {
    console.error('Error en health check:', error.message);
    res.status(503).json({ status: 'ERROR', mensaje: 'API funcionando pero BD no disponible', error: error.message });
  }
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Inventario v1.0', endpoints: ['/api/productos', '/api/proveedores', '/api/usuarios', '/health'] });
});

// Middleware 404
app.use((req, res) => {
  console.error(`[404] Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Ruta no encontrada', ruta: req.originalUrl });
});

// Middleware de error global
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    tipo: err.constructor.name,
    ruta: req.originalUrl,
    metodo: req.method
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[INICIADO] API escuchando en puerto ${PORT}`);
  console.log(`[AMBIENTE] ${process.env.NODE_ENV || 'desarrollo'}`);
});