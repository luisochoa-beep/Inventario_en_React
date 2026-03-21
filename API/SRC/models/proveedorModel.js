const pool = require('./connection');



const Proveedor = {
getAll: async () => {
const res = await pool.query('SELECT * FROM proveedores');
return res.rows;},
create: async (d) => {
const res = await pool.query(
'INSERT INTO proveedores (nombre_empresa, contacto_nombre, telefono, email) VALUES ($1, $2, $3, $4) RETURNING *',
[d.nombre_empresa, d.contacto_nombre, d.telefono, d.email]);return res.rows[0];


},
update: async (id, d) => {
const res = await pool.query(
'UPDATE proveedores SET nombre_empresa=$1, contacto_nombre=$2, telefono=$3, email=$4 WHERE id=$5 RETURNING *',
[d.nombre_empresa, d.contacto_nombre, d.telefono, d.email, id]);
return res.rows[0];
},
delete: async (id) => {
await pool.query('DELETE FROM proveedores WHERE id = $1', [id]);
return { mensaje: "Proveedor eliminado" };}
}; module.exports = Proveedor;