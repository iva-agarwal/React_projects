"use client";
import React, { useState } from "react";
import axios from "axios";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "http://localhost:8000/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.access_token);
      alert("Logged in!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#F2E5DC] min-h-screen text-black p-10 flex justify-center items-center">
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
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Necessitatibus molestias nesciunt hic temporibus iure
                praesentium unde, modi eveniet veniam dignissimos molestiae
                deleniti culpa, distinctio, quo placeat expedita nihil ipsam
                deserunt!
              </p>
            </div>
          </div>

          {/* Vertical Line for md+ screens */}
          <div className="hidden md:block w-[2px] bg-black "></div>

          {/* Right Side */}
          <div className="w-full md:w-2/5 p-10 self-center">
            <div className="flex flex-col gap-4">
              <button className=" border-2 border-black px-5 py-4 w-full">
                Continue with google
              </button>
              <p className="text-center">or</p>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  className=" border-2 border-black p-4 w-full mb-4"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  className=" border-2 border-black p-4 w-full my-4"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  <button
                type="submit"
                className="bg-[#E9846C]  border-2 border-black px-5 py-4 w-full"
              >
                Continue{" "}
              </button>
              </form>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
