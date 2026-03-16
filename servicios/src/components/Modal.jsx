import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
if (!isOpen) return null; //recomendacion de no renderizar el modal si no esta abierto

return (
<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
<div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-xl">
{}
<div className="flex items-center justify-between pb-3 border-b border-gray-200">
<p className="text-2xl font-bold">{title}</p>
    <button onClick={onClose} className="p-2 ml-auto bg-transparent border-0 text-gray-400 opacity-50 text-2xl leading-none font-semibold outline-none focus:outline-none">
<span className="text-2xl">×</span>
</button>
</div>

{}
  <div className="pt-5 pb-5">
  {children}
</div>

{}
  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
  <button
className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
type="button"
onClick={onClose}>
Cerrar
</button>
</div>
</div>
</div>
);};


export default Modal;