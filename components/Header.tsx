"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import useDarkmode from "@/utils/useDarkMode";
import { useLayoutEffect } from "react";

const Header = () => {
  const [theme, toggleTheme] = useDarkmode();
  const router = useRouter();
  const currentPath = usePathname().replace("/", "");

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken) {
      router.replace("/users");
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    router.replace("/");
  };

  return (
    <div className="w-full flex gap-3 px-3">
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white flex-grow">
        {currentPath === "users" ? "Users" : "Login"}
      </h2>
      <button onClick={toggleTheme}>
        {theme === "light" ? (
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/darkMode.svg"
            alt="Dark Mode"
            width={20}
            height={20}
          />
        ) : (
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/lightMode.svg"
            alt="Switch to Light Mode"
            width={20}
            height={20}
          />
        )}
      </button>
      {currentPath === "users" && (
        <button onClick={handleSignOut}>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/signOut.svg"
            alt="Sign Out"
            width={20}
            height={20}
          />
        </button>
      )}
    </div>
  );
};

export default Header;
