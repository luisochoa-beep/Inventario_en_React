const Usuario = require('../models/usuarioModel');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await Usuario.findByUser(username);

  if (user && user.password_hash === password) { 
    res.json({ mensaje: "Bienvenido", user: user.username });
  }  else {res.status(401).json({ error: "Datos incorrectos" }); }};