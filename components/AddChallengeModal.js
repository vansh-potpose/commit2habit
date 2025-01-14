'use client';

import React, { useState } from 'react';

const AddChallengeModal = ({ abilityName, isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');
  const [errors, setErrors] = useState({ name: '', points: '' });

  const handleSubmit = () => {
    let hasError = false;
    const newErrors = { name: '', points: '' };

    if (!name.trim()) {
      newErrors.name = 'Challenge name cannot be empty.';
      hasError = true;
    }

    if (!points || isNaN(points) || points <= 0) {
      newErrors.points = 'Points must be a positive number.';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    onSubmit({
      name: name.trim(),
      points: parseInt(points, 10),
    });

    // Reset state and close modal
    setName('');
    setPoints('');
    setErrors({ name: '', points: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md xs:w-96 w-80">
        <h2 className="text-lg text-borderColor font-semibold mb-4">Add Challenge for {abilityName}</h2>
        <div className="mb-4">
          <label className="block text-sm text-borderColor font-medium mb-2">Challenge Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full border px-3 py-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter challenge name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm text-borderColor font-medium mb-2">Points</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className={`w-full border px-3 py-2 rounded ${errors.points ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter points"
          />
          {errors.points && <p className="text-red-500 text-sm mt-1">{errors.points}</p>}
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            Add Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChallengeModal;
