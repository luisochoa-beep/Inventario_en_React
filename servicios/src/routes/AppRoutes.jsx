import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import Productos from '../pages/Productos';
import Proveedores from '../pages/Proveedores';

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/proveedores" element={<Proveedores />} />
      </Routes>
    </BrowserRouter>
  );
};

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return isAuthenticated && location.pathname !== "/" ? (
    <nav className="bg-gray-800 p-4 text-white flex gap-4">
      <Link to="/productos" className="hover:text-blue-400">Inventario</Link>
      <Link to="/proveedores" className="hover:text-blue-400">Proveedores</Link>
      <button 
        onClick={handleLogout}
        className="ml-auto hover:text-red-400 bg-transparent border-0 cursor-pointer"
      >
        Salir
      </button>
    </nav>
  ) : null;
};

export default AppRoutes;