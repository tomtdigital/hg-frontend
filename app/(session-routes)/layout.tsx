import Logout from "@/app/components/footer/logout";
import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Session",
};

export default function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-between h-[100vh]">
      {children}{" "}
      <footer className="min-h-[3em] w-[100%] flex flex-col md:flex-row justify-center items-center bg-gray-900 p-[1em] md:p-[2em]">
        <div className="mb-[1em] md:mr-[3em] md:mb-0">
          <p className="block">Footer Link 1</p>
        </div>
        <div>
          <Logout />
        </div>
      </footer>
    </div>
  );
}
