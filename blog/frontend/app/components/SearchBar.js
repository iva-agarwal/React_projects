import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export const SearchBar = () => {
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const defaultAvatar = "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg";

  const verifyUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:8000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsername(res.data.username);
      setUserImage(res.data.user_image || "");
      setIsLoggedIn(true);
    } catch (error) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    verifyUser();
    const interval = setInterval(verifyUser, 30_000);
    return () => clearInterval(interval);
  }, []);

  // 🔍 Handle search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        axios
          .get(`http://localhost:8000/users/search?query=${query}`)
          .then(res => setResults(res.data))
          .catch(err => {
            console.error("Search error", err);
            setResults([]);
          });
      } else {
        setResults([]);
      }
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className='w-full flex flex-row border-b-2 border-black relative'>
      {/* Search Input */}
      <div className='w-3/4 bg-[#F78F1F] p-4 border-r-2 border-black relative'>
        <input
          type="text"
          placeholder='Search users by username...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='bg-[#FFEFD7] p-4 w-2/4 border-2 border-black'
        />

        {/* Search Results */}
        {results.length > 0 && (
          <ul className="absolute z-10 mt-2 bg-white shadow border w-[50%] max-h-60 overflow-y-auto">
            {results.map((user) => (
              <li key={user.id} className="border-b last:border-b-0 hover:bg-gray-100">
                <Link
                  href={`/profile/${user.id}`}
                  className="flex items-center p-2 gap-3"
                  onClick={() => setQuery("")}
                >
                  <img
                    src={user.user_image || defaultAvatar}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user.username}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* User Info or Login */}
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
