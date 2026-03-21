const Producto = require('../models/productoModel');

exports.listar = async (req, res, next) => {
  try {
    console.log('[GET] /api/productos - Listando productos');
    const lista = await Producto.getAll();
    res.json({ success: true, data: lista, cantidad: lista.length });
  } catch (error) {
    console.error('[ERROR GET /api/productos]:', error.message);
    next(error);
  }
};

exports.crear = async (req, res, next) => {
  try {
    console.log('[POST] /api/productos - Creando producto:', req.body);
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Body vacío' });
    }
    const nuevo = await Producto.create(req.body);
    res.status(201).json({ success: true, data: nuevo });
  } catch (error) {
    console.error('[ERROR POST /api/productos]:', error.message);
    next(error);
  }
};

exports.actualizar = async (req, res, next) => {
  try {
    console.log('[PUT] /api/productos/:id - ID:', req.params.id, 'Data:', req.body);
    if (!req.params.id) {
      return res.status(400).json({ error: 'ID requerido' });
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Body vacío' });
    }
    const actualizado = await Producto.update(req.params.id, req.body);
    res.json({ success: true, data: actualizado });
  } catch (error) {
    console.error('[ERROR PUT /api/productos]:', error.message);
    next(error);
  }
};

exports.eliminar = async (req, res, next) => {
  try {
    console.log('[DELETE] /api/productos/:id - ID:', req.params.id);
    if (!req.params.id) {
      return res.status(400).json({ error: 'ID requerido' });
    }
    await Producto.delete(req.params.id);
    res.json({ success: true, mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('[ERROR DELETE /api/productos]:', error.message);
    next(error);
  }
};