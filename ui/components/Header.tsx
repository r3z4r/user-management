"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import useDarkmode from "@/utils/useDarkMode";
import { useLayoutEffect } from "react";

const Header = () => {
  const [theme, toggleTheme] = useDarkmode();
  const router = useRouter();
  const currentPath = usePathname().replace("/", "");

  const handleSignOut = () => {
    localStorage.removeItem("ISSUED_AT");
    localStorage.removeItem("ACCESS_TOKEN");
    router.replace("/");
  };
  useLayoutEffect(() => {
    const issuedAt = localStorage.getItem("ISSUED_AT");
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    //check if more than one hour is passed from login and if so logout
    const isExpired =
      issuedAt &&
      (new Date().getTime() - +localStorage.ISSUED_AT) / (1000 * 60 * 60) > 1;
    if (isExpired || !accessToken) {
      handleSignOut();
    } else {
      router.replace("/users");
    }
  }, []);

  return (
    <div className="w-full flex gap-3 px-3">
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white flex-grow">
        {currentPath === "users" ? "Users" : "Login"}
      </h2>
      <button onClick={toggleTheme as () => void}>
        {theme === "light" ? (
          <Image
            className="icon-main"
            src="/darkMode.svg"
            alt="Switch to Dark Mode"
            width={20}
            height={20}
          />
        ) : (
          <Image
            className="icon-main"
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
            className="icon-main"
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
