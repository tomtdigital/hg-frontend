import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-between h-[100vh]">
      {children}{" "}
      <footer className="min-h-[3em] w-[100%] flex flex-col md:flex-row justify-center items-center bg-gray-900 p-[1em] md:p-[2em]">
        <div className="mb-[1em] md:mr-[3em] md:mb-0">
          <p className="block">Footer Info</p>
        </div>
        <div>
          <p className="block">Footer Info 2</p>
        </div>
      </footer>
    </div>
  );
}
