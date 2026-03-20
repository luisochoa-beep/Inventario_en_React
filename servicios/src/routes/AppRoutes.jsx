import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from '../pages/Login';
import Productos from '../pages/Productos';
import Proveedores from '../pages/Proveedores';

const AppRoutes = () => {
return (
<BrowserRouter>


{localStorage.getItem("token") && (
<nav className="bg-gray-800 p-4 text-white flex gap-4">
  <Link to="/productos" className="hover:text-blue-400">Inventario</Link>
  <Link to="/proveedores" className="hover:text-blue-400">Proveedores</Link>
  <Link 
    to="/" 
    className="ml-auto hover:text-red-400"
    onClick={() => {
  localStorage.removeItem("token");
  window.location.href = "/";
}}
  >
    Salir
  </Link>
</nav>
)}

<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/productos" element={<Productos />} />
  <Route path="/proveedores" element={<Proveedores />} />
</Routes>

</BrowserRouter>
);
};

export default AppRoutes;