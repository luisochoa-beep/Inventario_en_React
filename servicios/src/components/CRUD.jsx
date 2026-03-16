import React, { useState, useEffect } from 'react';
import Tabla from './Tabla';
import Modal from './Modal';
import Alerta from './Alerta';

const CRUD = ({ columnHeaders, getItems, createItem, deleteItem, title, renderForm }) => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState({ type: null, message: null });


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      setAlert({ type: 'error', message: 'Error al obtener datos.' });
    }
  };

const handleCreate = async (e) => {
e.preventDefault();
try { await createItem(formData);
fetchItems();
setIsModalOpen(false);
setFormData({});
setAlert({ type: 'success', message: `${title} añadido correctamente.` });
} catch (error) {
setAlert({ type: 'error', message: `Error al añadir ${title.toLowerCase()}.` });
}
};

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      fetchItems();
      setAlert({ type: 'success', message: `${title} eliminado correctamente.` });
    } catch (error) {

      setAlert({ type: 'error', message: `Error al eliminar ${title.toLowerCase()}.` });

    }
  };

// accciones de lass fila 
const renderRowActions = (item) => (
<button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 ml-4">
Eliminar
</button>
  );

  return (
    <div>
    <h2 className="text-2xl font-bold mb-4">{title}</h2> 
{}
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Añadir {title}
      </button>
{}
      <Alerta {...alert} />


<Tabla
columnHeaders={columnHeaders}items={items}renderRowActions={renderRowActions}
/>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Añadir ${title}`}>
        {renderForm(formData, setFormData, handleCreate)}
      </Modal>
    </div>
  );
};

export default CRUD;