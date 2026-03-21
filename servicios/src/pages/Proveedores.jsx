import React from 'react';
import CRUD from '../components/CRUD';
import { getProveedores, crearProveedor, actualizarProveedor, eliminarProveedor } from '../services/proveedoresService';

const Proveedores = () => {
const columnas = [
{ key: 'id', title: 'ID' },
{ key: 'nombre_empresa', title: 'Empresa' },
{ key: 'contacto_nombre', title: 'Contacto' },
{ key: 'email', title: 'Correo' },
{ key: 'telefono', title: 'Teléfono' }
];

const formulario = (formData, setFormData, onSave) => (
<form onSubmit={onSave} className="space-y-4">
        <input placeholder="Nombre de Empresa" className="w-full border p-2 rounded" value={formData.nombre_empresa || ''} onChange={e => setFormData({...formData, nombre_empresa: e.target.value})}/>
        <input placeholder="Nombre de Contacto" className="w-full border p-2 rounded" value={formData.contacto_nombre || ''} onChange={e => setFormData({...formData, contacto_nombre: e.target.value})}/>
        <input placeholder="Email" className="w-full border p-2 rounded" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})}/>
        <input placeholder="Teléfono" className="w-full border p-2 rounded" value={formData.telefono || ''} onChange={e => setFormData({...formData, telefono: e.target.value})}/>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Guardar Proveedor</button>
</form>
);


return (
<div className="p-10">
<CRUD 
title="Gestión de Proveedores"
columnHeaders={columnas}
getItems={getProveedores}
createItem={crearProveedor}
updateItem={actualizarProveedor}
deleteItem={eliminarProveedor}
renderForm={formulario}
/>
</div>
);};

export default Proveedores;