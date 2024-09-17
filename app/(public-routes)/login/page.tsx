import LoginForm from "@/app/components/login/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm />
        <p>
          No account?{" "}
          <Link href="/" className="text-yellow-500">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
