const pool = require('./connection');



const Producto = {
getAll: async () => {
const res = await pool.query('SELECT p.*, c.nombre as categoria_nombre FROM productos p LEFT JOIN categorias c ON p.categoria_id = c.id');
return res.rows;
},


create: async (d) => {
const res = await pool.query(
'INSERT INTO productos (nombre, marca, precio, stock, categoria_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
[d.nombre, d.marca, d.precio, d.stock, d.categoria_id]);return res.rows[0];},


update: async (id, d) => {
const res = await pool.query(
'UPDATE productos SET nombre=$1, marca=$2, precio=$3, stock=$4 WHERE id=$5 RETURNING *',
[d.nombre, d.marca, d.precio, d.stock, id]);
return res.rows[0];},


delete: async (id) => {
await pool.query('DELETE FROM productos WHERE id = $1', [id]);
return { mensaje: "Eliminado" };
}};


module.exports = Producto;