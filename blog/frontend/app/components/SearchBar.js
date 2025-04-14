import React from 'react'

export const SearchBar = () => {
  return (
    <div className='w-full flex flex-row border-b-2 border-black'>
        <div className='w-3/4 bg-[#F78F1F] p-4 border-r-2 border-black'> 
        <input type="text" name="" id="" placeholder='Enter user name' className='bg-[#FFEFD7] p-4 w-2/4 border-2 border-black'/>
        </div>
        <div className='flex flex-row w-1/4'>
        <div  className='w-1/4 border-r-2 border-black'>
            <img src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg" alt="" className='p-3'/>
            </div>
            <div  className='flex border-r-2 border-black w-2/4 items-center justify-center'>
            <p className='text-lg font-bold'>Amade Upname</p>
        </div></div>
    </div>
  )
}
