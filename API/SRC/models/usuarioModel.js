const pool = require('./connection');


const Usuario = {
findByUser: async (username) => {
const res = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
return res.rows[0];}};
module.exports = Usuario;