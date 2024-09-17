import RegisterForm from "@/app/components/login/register-form";
import { lusitana } from "@/app/components/fonts";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="w-full p-3 sm:p-5 md:p-7 lg:p-10">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[50%] mb-[1em] md:mb-0 px-[1em] py-[1.5em] md:px-[2.5em]">
            <h1 className="text-[2em] mb-3">Welcome to Hannagrams</h1>
            <p>
              This is a long introduction so you understand what the game is
              about, how to sign up, and what the membership look like.
            </p>
          </div>
          <div className="md:w-[50%] px-[1em] py-[1.5em] md:px-[2.5em]">
            <h2 className={`${lusitana.className} text-2xl`}>
              Please register to continue.
            </h2>
            <RegisterForm />
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-yellow-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
