import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const SearchBar = () => {
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const defaultAvatar = "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg";

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsername(res.data.username);
        setUserImage(res.data.user_image || ""); // may be null/undefined
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='w-full flex flex-row border-b-2 border-black'>
      <div className='w-3/4 bg-[#F78F1F] p-4 border-r-2 border-black'>
        <input
          type="text"
          placeholder='Enter user name'
          className='bg-[#FFEFD7] p-4 w-2/4 border-2 border-black'
        />
      </div>

      <div className='flex flex-row w-1/4'>
        {isLoggedIn ? (
          <>
            <div className='w-1/4 border-r-2 border-black'>
              <img
                src={userImage || defaultAvatar}
                alt="User Avatar"
                className='p-3 w-full h-full object-cover'
              />
            </div>
            <div className='flex border-r-2 border-black w-2/4 items-center justify-center'>
              <p className='text-lg font-bold'>{username}</p>
            </div>
          </>
        ) : (
          <div className='flex w-full justify-center items-center'>
            <button
              onClick={() => window.location.href = "/login"}
              className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition'
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
