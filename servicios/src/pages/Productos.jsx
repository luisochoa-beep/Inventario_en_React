import React from 'react';
import CRUD from '../components/CRUD';
import { getProductos, crearProducto, actualizarProducto, eliminarProducto } from '../services/productosService';


const Productos = () =>  {
const columnas = [
{ key: 'id', title: 'ID' },
{ key: 'nombre', title: 'Producto' },
{ key: 'marca', title: 'Marca' },
{ key: 'precio', title: 'Precio', renderer: (val) => `$${val}` },
{ key: 'stock', title: 'Stock' },
{ key: 'categoria_nombre', title: 'Categoría' }
];

const formulario = (formData, setFormData, onSave) => (
<form onSubmit={onSave} className="space-y-4">
        <input placeholder="Nombre" className="w-full border p-2 rounded" value={formData.nombre || ''} onChange={e => setFormData({...formData, nombre: e.target.value})}/>
        <input placeholder="Marca" className="w-full border p-2 rounded" value={formData.marca || ''} onChange={e => setFormData({...formData, marca: e.target.value})}/>
        <input type="number" placeholder="Precio" className="w-full border p-2 rounded" value={formData.precio || ''} onChange={e => setFormData({...formData, precio: e.target.value})}/>
        <input type="number" placeholder="Stock" className="w-full border p-2 rounded" value={formData.stock || ''} onChange={e => setFormData({...formData, stock: e.target.value})}/>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Guardar Producto</button>
</form>
);

return (
<div className="p-10">
<CRUD 
title="Inventario de Productos"
columnHeaders={columnas}
getItems={getProductos}
createItem={crearProducto}
updateItem={actualizarProducto}
deleteItem={eliminarProducto}
renderForm={formulario}/>
</div>);};



export default Productos;