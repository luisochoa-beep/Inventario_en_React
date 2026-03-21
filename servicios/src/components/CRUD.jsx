import React, { useState, useEffect } from 'react';
import Tabla from './Tabla';
import Modal from './Modal';
import Alerta from './Alerta';

const CRUD = ({ columnHeaders, getItems, createItem, updateItem, deleteItem, title, renderForm }) => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState({ type: null, message: null });
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      const list = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
      setItems(list);
    } catch (error) {
      setAlert({ type: 'error', message: 'Error al obtener datos.' });
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateItem(editingId, formData);
        setAlert({ type: 'success', message: `${title} actualizado correctamente.` });
      } else {
        await createItem(formData);
        setAlert({ type: 'success', message: `${title} añadido correctamente.` });
      }
      fetchItems();
      setIsModalOpen(false);
      setFormData({});
      setEditingId(null);
    } catch (error) {
      setAlert({ type: 'error', message: `Error al guardar ${title.toLowerCase()}.` });
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setIsModalOpen(true);
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({});
    setEditingId(null);
  };

  // acciones de las filas 
  const renderRowActions = (item) => (
    <div className="flex gap-2">
      <button 
        onClick={() => handleEdit(item)} 
        className="text-blue-600 hover:text-blue-900"
      >
        Editar
      </button>
      <button 
        onClick={() => handleDelete(item.id)} 
        className="text-red-600 hover:text-red-900"
      >
        Eliminar
      </button>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <button 
        onClick={() => {
          setFormData({});
          setEditingId(null);
          setIsModalOpen(true);
        }} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Añadir {title}
      </button>

      <Alerta {...alert} />

      <Tabla
        columnHeaders={columnHeaders}
        items={items}
        renderRowActions={renderRowActions}
      />
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingId ? `Editar ${title}` : `Añadir ${title}`}
      >
        {renderForm(formData, setFormData, handleCreate)}
      </Modal>
    </div>
  );
};

export default CRUD;
