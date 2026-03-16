const Proveedor = require('../models/proveedorModel');


exports.listar = async (req, res) => {
  const lista = await  Proveedor.getAll();
  res.json(lista);
};


exports.crear = async (req, res) => {
  const nuevo = await Proveedor.create(req.body);res.json(nuevo);};

exports.eliminar = async (req, res) => {
  await Proveedor.delete(req.params.id);
res.json({ mensaje: "Ok" });};