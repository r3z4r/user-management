import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "User Management Tool",
  description: "Modify Users Roles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang: string = "en";
  return (
    <html lang={lang} dir={lang === "en" ? "ltr" : "rtl"}>
      <body>
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-700">
          <div className="w-full max-w-lg">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
