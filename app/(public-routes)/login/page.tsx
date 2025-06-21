import LoginForm from '@/app/components/login/login-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className='dark flex items-center justify-center md:h-screen'>
      <div className='relative mx-auto my-14 flex max-w-[400px] flex-col px-4 md:my-0'>
        <LoginForm />
        <p>No account? </p>
        <Link
          href='/'
          className='mt-4 flex h-10 w-[6em] items-center rounded-lg bg-yellow-400 px-4 text-center text-sm font-medium text-black hover:bg-yellow-500'
        >
          Register
        </Link>
      </div>
    </main>
  );
}
