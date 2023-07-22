"use client";

import { FormEvent, useState } from "react";
import { handleLogin } from "./login/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessToken = await handleLogin(email, password);
    if (accessToken) {
      router.replace("/users");
    } else {
      alert("Login not successfull");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg px-8 py-10">
      <form onSubmit={onLogin}>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none border dark:border-none rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-slate-600 leading-tight focus:outline-none focus:shadow-outline"
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
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none border dark:border-none rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-slate-600 leading-tight focus:outline-none focus:shadow-outline"
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
  );
};

export default Login;
