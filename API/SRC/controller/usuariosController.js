const Usuario = require('../models/usuarioModel');

exports.login = async (req, res, next) => {
  try {
    console.log('[POST] /api/usuarios/login - Intentando login para:', req.body.username);
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username y password son requeridos' });
    }
    
    const user = await Usuario.findByUser(username);

    if (user && user.password_hash === password) {
      console.log('[LOGIN SUCCESS]:', username);
      res.json({ success: true, mensaje: "Bienvenido", user: user.username });
    } else {
      console.log('[LOGIN FAILED]:', username);
      res.status(401).json({ success: false, error: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    console.error('[ERROR LOGIN]:', error.message);
    next(error);
  }
};