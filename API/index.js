const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/productos', require('./SRC/routes/productosRoutes'));
app.use('/api/proveedores', require('./SRC/routes/proveedorsRoutes'));
app.use('/api/usuarios', require('./SRC/routes/usuariosRoutes'));





app.listen(3000, () => {
console.log("API escuchando en http://localhost:3000");
});