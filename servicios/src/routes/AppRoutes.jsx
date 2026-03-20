import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate
} from 'react-router-dom';

import Login from '../pages/Login';
import Productos from '../pages/Productos';
import Proveedores from '../pages/Proveedores';

const RutaProtegida = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
};

const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <>
      {token && (
        <nav className="bg-gray-800 p-4 text-white flex gap-4">
          <Link to="/productos" className="hover:text-blue-400">
            Inventario
          </Link>

          <Link to="/proveedores" className="hover:text-blue-400">
            Proveedores
          </Link>

          <button
            onClick={cerrarSesion}
            className="ml-auto hover:text-red-400"
            type="button"
          >
            Salir
          </button>
        </nav>
      )}

      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/productos" replace /> : <Login />
          }
        />

        <Route
          path="/productos"
          element={
            <RutaProtegida>
              <Productos />
            </RutaProtegida>
          }
        />

        <Route
          path="/proveedores"
          element={
            <RutaProtegida>
              <Proveedores />
            </RutaProtegida>
          }
        />

        <Route
          path="*"
          element={<Navigate to={token ? "/productos" : "/"} replace />}
        />
      </Routes>
    </>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default AppRoutes;