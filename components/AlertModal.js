'use client'; 

import React from 'react';

const AlertModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg xs:w-96 w-80 p-6">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{message}</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  ); 
};

export default AlertModal;
