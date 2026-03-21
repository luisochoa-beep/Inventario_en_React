import { fetchData } from "./api";

export const getProductos = async () => {
return await fetchData("/productos");
};

export const crearProducto = async (producto) => {
return await fetchData("/productos", {
method: "POST", body: JSON.stringify(producto),
});};

export const actualizarProducto = async (id, producto) => {
return await fetchData(`/productos/${id}`, {
method: "PUT",
body: JSON.stringify(producto),
});};

export const eliminarProducto = async (id) => {
return await fetchData(`/productos/${id}`, {
method: "DELETE",
});};