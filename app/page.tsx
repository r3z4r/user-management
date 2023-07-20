"use client";
import useDarkmode from "@/utils/useDarkMode";
import Image from "next/image";
import { useState } from "react";
import { handleLogin } from "./login/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [theme, toggleTheme] = useDarkmode();

  const onLogin = async (e) => {
    e.preventDefault();
    const accessToken = await handleLogin(email, password);
    if (accessToken) {
      //redirect
    } else {
      alert("Login not successfull");
    }
  };

  return (
    <>
      <div className="w-full flex px-2">
        <h2 className="text-3xl font-bold mb-6 text-black dark:text-white flex-grow">
          Login
        </h2>
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/darkMode.svg"
              alt="Dark Mode"
              width={16}
              height={16}
            />
          ) : (
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/lightMode.svg"
              alt="Switch to Light Mode"
              width={16}
              height={16}
            />
          )}
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg px-8 py-10">
        <form onSubmit={onLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
