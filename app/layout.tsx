import "./globals.css";
import type { Metadata } from "next";

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
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-800">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </body>
    </html>
  );
}
