"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // ✅ import router

const page = () => {
  const router = useRouter(); // ✅ initialize router
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      router.push("/posts");
    } catch (err) {
      console.log(err);
      alert("Login failed.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/signup", {
        email,
        password,
        username,
      });
      alert("Signup successful! You can now log in.");
      setIsSignup(false);
    } catch (err) {
      console.error(err);
      alert("Signup failed.");
    }
  };

  return (
    <div className="bg-[#FFEFD7] min-h-screen text-black p-10 flex justify-center items-center">
      <div className=" border-2 border-black h-full">
        <div className="flex flex-col md:flex-row justify-center">
          {/* Left Side */}
          <div className="w-full md:w-3/5 p-10">
            <div className="p-5 flex flex-col gap-5">
              <img
                src="https://cdn.prod.website-files.com/60bf472d552095558f2bb639/66a8ba589f664521bd859aa6_AdobeStock_651658306.webp"
                alt=""
                className=" border-2 border-black"
              />
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
            </div>
          </div>

          <div className="hidden md:block w-[2px] bg-black "></div>

          {/* Right Side */}
          <div className="w-full md:w-2/5 p-10 self-center">
            <div className="flex flex-col gap-4">
              <button className=" border-2 border-black px-5 py-4 w-full">
                Continue with Google
              </button>
              <p className="text-center">or</p>
              {isSignup ? (
                <form onSubmit={handleSignup}>
                  <input
                    type="text"
                    className="border-2 border-black p-4 w-full mb-4"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    className="border-2 border-black p-4 w-full "
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    className="border-2 border-black p-4 w-full my-4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-[#E9846C] border-2 border-black px-5 py-4 w-full"
                  >
                    Sign Up
                  </button>
                </form>
              ) : (
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    className="border-2 border-black p-4 w-full mb-4"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    className="border-2 border-black p-4 w-full my-4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-[#E9846C] border-2 border-black px-5 py-4 w-full"
                  >
                    Login
                  </button>
                </form>
              )}
            </div>
            <p
              className="text-center mt-4 cursor-pointer underline"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Sign up"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
