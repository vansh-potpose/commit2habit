import React from 'react'
import { useState } from 'react'
import OneEditText from './OneEditText';
import auth from '@/app/appwrite/auth';

const SettingsWindow = ({templates,status,ChangeTemplateName,ChangeAbilityName,createAbility,DeleteAbility,logout,UpdateTitle,uplodadProfilePic,profile_pic}) => {
  const [title, setTitle] = useState('');
  const [newAbility, setNewAbility] = useState('');
  const [content, setcContent] = useState('profile');
  const [file, setFile] = useState(null);

  const createAbilityMini = (name) => {
    if(name === '') return;
    createAbility(name);
    setNewAbility('');
  }

  const handleDelete = (ability) => {
    let confirmDelete = confirm(`do you want to delete ${ability.name} stat`);
    if(confirmDelete){
      DeleteAbility(ability.ability_id);
    }
  }

  const handleTitleChange = (value) => {
    setTitle(value);
    
  }

  const saveTitle = () => {
    if(title === ''){
      alert('Title cannot be empty');
      return;
    }
    UpdateTitle(title);
    console.log(title);
  }

  const handleFileSave = () => {
    if(file === null){
      alert('Please select a file');
      return;
    }
    uplodadProfilePic(file);
    setFile(null)
  }
  

  return (
    <div className='flex justify-center p-6 gap-10'>
      <div className="sidebar text-white w-80 ">
        <div className="sidebar-header">
          <h3 className='text-lg font-semibold mb-4'>Settings</h3>
        </div>
        <ul className="sidebar-menu space-y-3 border-y border-borderColor py-3">
         <li className='hover:bg-buttonColor py-1 px-3 rounded-md' onClick={()=>{setcContent('profile')}}>Profile</li>
         <li className='hover:bg-buttonColor py-1 px-3 rounded-md' onClick={()=>{setcContent('templates')}}>Templates</li>
         <li className='hover:bg-buttonColor py-1 px-3 rounded-md' onClick={()=>{setcContent('dailyprogress')}}>Daily progress</li>
         <li className='hover:bg-buttonColor py-1 px-3 rounded-md' onClick={()=>{setcContent('abilities')}}>Abilities & skills</li>
        </ul>
      </div>
      <div className="content w-2/3">
        {content === 'profile' && 
          <div>
            <h1 className='text-2xl text-white pb-2 border-b border-borderColor'>Profile</h1>
            <div className=' flex flex-col gap-4 mt-4'>
              
              <label className='text-white'>Profile picture</label>
              <div className=''>

              <img src={profile_pic||"/profile.png"} alt="profile" className='object-cover rounded-full object-center overflow-hidden border border-borderColor mb-5 w-80 h-80'/>
              </div>
              <div className='flex gap-2'>
              <input type="file" className='max-w-96 w-full p-2 bg-transparent rounded-md bg-bgColor border border-borderColor' onChange={(e)=>{setFile(e.target.files[0])}}/>
              <button className='bg-green-700 hover:bg-green-800 p-2 rounded-md w-32 ' onClick={()=>{uplodadProfilePic(file)}}>Upload</button>
              </div>
              
            
              <label className='text-white'>Title</label>
              <div className='flex gap-2'>
              <input type="text" className='max-w-96 w-full p-2 bg-transparent rounded-md bg-bgColor border border-borderColor' value={title} onChange={(e)=>{handleTitleChange(e.target.value)}}/>
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
          <h1 className='text-2xl text-white pb-2 border-b border-borderColor'>Templates</h1>
          <div className=' flex flex-col gap-1 mt-4'>
            {templates.map((template,index)=>(
              <div key={index} className='flex justify-between items-center bg-bgColor px-2 hover:bg-buttonColor rounded-md'>
                <OneEditText initialValue={template.template_name} onSave={(value)=>{ChangeTemplateName(template,value)}}/>
              </div>
            ))}
          </div>
        </div>}
        {content === 'dailyprogress' && 
          <div>
            <h1 className='text-2xl text-white pb-2 border-b border-borderColor'>Daily progress</h1>
            <button className='bg-red-500 hover:bg-red-600 p-2 rounded-md w-32 m-3 '>Reset all data</button>
          </div>}
        {content === 'abilities' && <div>
          <h1 className='text-2xl text-white pb-2 border-b border-borderColor'>Abilities & skills</h1>
          <div className=' flex flex-col gap-4 mt-4'>
              <label className='text-white'>Abilities</label>
               <div className='flex flex-col gap-2'>
                {status.map((ability,index)=>(
                  <div onDoubleClick={()=>{handleDelete(ability)}} key={index} className='flex items-center bg-bgColor px-2 hover:bg-buttonColor rounded-md'>
                    <OneEditText initialValue={ability.name} onSave={(value)=>{ChangeAbilityName(ability,value)}}/>
                  </div>
                ))} 
              </div>
              <label className='text-white'>Create new States</label>
              <div className='flex gap-2'>
              <input type="text" className='max-w-96 w-full p-2 bg-transparent rounded-md bg-bgColor border border-borderColor' value={newAbility} onChange={(e)=>{setNewAbility(e.target.value)}}/>
              <button className='bg-green-700 hover:bg-green-800 p-2 rounded-md w-32 ' onClick={()=>{createAbilityMini(newAbility);}}>Add ability</button>
              </div>
            </div>
          </div>}
      </div>
      
    </div>
  )
}

export default SettingsWindow
