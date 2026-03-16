const Producto = require('../models/productoModel');

exports.listar = async (req, res) => {
  const lista = await Producto.getAll(); res.json(lista);
};

exports.crear = async (req, res) => {
  const nuevo = await Producto.create(req.body);
  res.json(nuevo);};

exports.eliminar = async (req, res) => {
  await Producto.delete(req.params.id);
  res.json({ mensaje: "Ok" });
};