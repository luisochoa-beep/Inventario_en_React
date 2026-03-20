const Proveedor = require('../models/proveedorModel');

exports.listar = async (req, res, next) => {
  try {
    console.log('[GET] /api/proveedores - Listando proveedores');
    const lista = await Proveedor.getAll();
    res.json({ success: true, data: lista, cantidad: lista.length });
  } catch (error) {
    console.error('[ERROR GET /api/proveedores]:', error.message);
    next(error);
  }
};

exports.crear = async (req, res, next) => {
  try {
    console.log('[POST] /api/proveedores - Creando proveedor:', req.body);
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Body vacío' });
    }
    const nuevo = await Proveedor.create(req.body);
    res.status(201).json({ success: true, data: nuevo });
  } catch (error) {
    console.error('[ERROR POST /api/proveedores]:', error.message);
    next(error);
  }
};

exports.eliminar = async (req, res, next) => {
  try {
    console.log('[DELETE] /api/proveedores/:id - ID:', req.params.id);
    if (!req.params.id) {
      return res.status(400).json({ error: 'ID requerido' });
    }
    await Proveedor.delete(req.params.id);
    res.json({ success: true, mensaje: 'Proveedor eliminado correctamente' });
  } catch (error) {
    console.error('[ERROR DELETE /api/proveedores]:', error.message);
    next(error);
  }
};