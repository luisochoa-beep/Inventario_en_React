import { fetchData } from "./api";

export const getProveedores = async () => {
return await fetchData("/proveedores");};

export const crearProveedor = async (proveedor) => {
return await fetchData("/proveedores", {
method: "POST",
body: JSON.stringify(proveedor),
});};

export const actualizarProveedor = async (id, proveedor) => {
return await fetchData(`/proveedores/${id}`, {
method: "PUT",
body: JSON.stringify(proveedor),
});};

export const eliminarProveedor = async (id) => {
return await fetchData(`/proveedores/${id}`, {
method: "DELETE",
}
);
};