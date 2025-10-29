'use client';
import React from 'react'
import { useState } from 'react'
import OneEditText from './OneEditText';
import auth from '@/app/appwrite/auth';
import ModalConfirmation from './ModalConfirmation';
import AlertModal from './AlertModal';

const SettingsWindow = ({ templates, status, ChangeTemplateName, ChangeAbilityName, createAbility, DeleteAbility, logout, UpdateTitle, uploadProfilePic, profile_pic }) => {
  const [title, setTitle] = useState('');
  const [newAbility, setNewAbility] = useState('');
  const [content, setcContent] = useState('profile');
  const [file, setFile] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [abilityToDelete, setAbilityToDelete] = useState(null); 
  const [showAlert, setShowAlert] = useState(false);

  const createAbilityMini = (name) => {
    if (name === '') return;
    createAbility(name);
    setNewAbility('');
  }

  const handleDelete = (ability) => {
    setAbilityToDelete(ability); // Set the ability to delete
    setShowModal(true); // Show the modal
  };

  const confirmDelete = () => {
    if (abilityToDelete) {
      DeleteAbility(abilityToDelete.ability_id); // Perform delete
      setAbilityToDelete(null); // Clear the selected ability
    }
    setShowModal(false); // Close the modal
  };

  const cancelDelete = () => {
    setAbilityToDelete(null); // Clear the selected ability
    setShowModal(false); // Close the modal
  };

  const handleTitleChange = (value) => {
    setTitle(value);

  }

  const saveTitle = () => {
    if (title === '') {
      setShowAlert(true);
      return;
    }
    UpdateTitle(title);
  }

  


  return (
    <div className='flex sm:justify-center sm:p-6 gap-10'>
      <div className={`${showSettings ? "" : "sm:translate-x-0   -translate-x-full  "}  transition-all ease-in-out duration-700  sidebar text-white sm:w-80 sm:p-0 z-50  sm:bg-transparent sm:relative w-full bg-black absolute  left-0 h-full p-4`}>
        <div className="sidebar-header relative mb-4">
          <h3 className='text-lg font-semibold '>Settings</h3>
          <button className='sm:hidden text-3xl absolute right-0 top-0 font-medium' onClick={() => { setShowSettings(false) }}>&times;</button>
        </div>
        <ul className="sidebar-menu space-y-3 border-y border-borderColor py-3">
          <li className='hover:bg-buttonColor py-1 px-3 rounded-md' onClick={() => { setcContent('profile'),setShowSettings(false) }}>Profile</li>
          <li className='hover:bg-buttonColor py-1 px-3 rounded-md' onClick={() => { setcContent('templates'),setShowSettings(false) }}>Templates</li>
          <li className='hover:bg-buttonColor py-1 px-3 rounded-md' onClick={() => { setcContent('abilities'),setShowSettings(false) }}>Abilities & skills</li>
        </ul>
      </div>
      <div className="content sm:w-2/3 w-full p-4">
        <button className='sm:hidden z-40 w-8 absolute border border-borderColor p-2 rounded-md' onClick={() => { setShowSettings(true) }}>
          <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill='var(--svg-color)'>
          <path d={"M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"}></path>
        </svg></button>
        {content === 'profile' &&
          <div>
            <h1 className='text-2xl sm:pl-0 pl-10 text-white pb-2 border-b border-borderColor'>Profile</h1>
            <div className=' flex flex-col gap-4 mt-4'>

              <label className='text-white'>Profile picture</label>
              <div className='sm:block flex justify-center items-center w-full'>

                <img
                  src={typeof profile_pic === 'string' && profile_pic ? profile_pic : '/profile.png'}
                  alt="profile"
                  className='object-cover rounded-full object-center overflow-hidden border border-borderColor mb-5 w-80 h-80'
                  loading="lazy"
                  onError={(e) => {
                    console.warn('SettingsWindow: profile image failed to load, falling back to placeholder', profile_pic);
                    e.currentTarget.src = '/profile.png';
                  }}
                />
              </div>
              <div className='flex gap-2'>
                <input type="file" className='max-w-96 w-full p-2 bg-transparent rounded-md bg-bgColor border border-borderColor' onChange={(e) => { setFile(e.target.files[0]) }} />
                <button className='bg-green-700 hover:bg-green-800 p-2 rounded-md w-32 ' onClick={() => { uploadProfilePic(file) }}>Upload</button>
              </div>


              <label className='text-white'>Title</label>
              <div className='flex gap-2'>
                <input type="text" className='max-w-96 w-full p-2 bg-transparent rounded-md bg-bgColor border border-borderColor' value={title} onChange={(e) => { handleTitleChange(e.target.value) }} />
                <button className='bg-green-700 hover:bg-green-800 p-2 rounded-md w-32 ' onClick={saveTitle}>Save</button>
              </div>
            </div>
            <div className='mt-4'>
              <h1 className='text-2xl text-white pb-2 border-b border-borderColor'>Danger zone</h1>
              <div className=' flex flex-col gap-4 mt-4'>

                <button className='bg-red-500 hover:bg-red-600 p-2 rounded-md w-32 ' onClick={logout}>Logout</button>
              </div>
            </div>
          </div>}
        {content === 'templates' &&
          <div>
            <h1 className='text-2xl sm:pl-0 pl-10 text-white pb-2 border-b border-borderColor'>Templates</h1>
            <div className=' flex flex-col gap-1 mt-4'>
              {templates.map((template, index) => (
                <div key={index} className='flex justify-between items-center bg-bgColor px-2 hover:bg-buttonColor rounded-md'>
                  <OneEditText initialValue={template.template_name} onSave={(value) => { ChangeTemplateName(template, value) }} />
                </div>
              ))}
            </div>
          </div>}
          {content === 'abilities' && (
          <div>
            <h1 className="text-2xl sm:pl-0 pl-10 text-white pb-2 border-b">Abilities & Skills</h1>
            <div className="flex flex-col gap-4 mt-4">
              <label className="text-white">Abilities</label>
              <div className="flex flex-col gap-2">
                {status.map((ability, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-bgColor px-2 hover:bg-buttonColor rounded-md"
                    onDoubleClick={() => handleDelete(ability)}
                  >
                    <OneEditText
                      initialValue={ability.name}
                      onSave={(value) => ChangeAbilityName(ability, value)}
                    />
                  </div>
                ))}
              </div>
              <label className="text-white">Create New States</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="max-w-96 w-full p-2 bg-transparent rounded-md border"
                  value={newAbility}
                  onChange={(e) => setNewAbility(e.target.value)}
                />
                <button
                  className="bg-green-700 hover:bg-green-800 p-2 rounded-md w-32"
                  onClick={() => createAbilityMini(newAbility)}
                >
                  Add Ability
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ModalConfirmation
        isOpen={showModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        title="Delete Ability"
        message={`Are you sure you want to delete the ability "${abilityToDelete?.name}"?`}
      />
      <AlertModal 
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title="Error"
        message="Title cannot be empty"
      />
    </div>
  )
}

export default SettingsWindow
