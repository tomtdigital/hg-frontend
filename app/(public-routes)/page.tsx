import RegisterForm from '@/app/components/login/register-form';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className='w-full p-5 sm:p-7 md:p-10 lg:p-20'>
        <div className='flex flex-col md:flex-row'>
          <div className='mb-[1em] px-[1em] py-[1.5em] md:mb-0 md:w-[50%] md:pl-[2.5em] md:pr-[3.5em]'>
            <h1 className='mb-3 text-[2em]'>Welcome to Hannagrams</h1>
            <p>
              This is a long introduction so you understand what the game is
              about, how to sign up, and what the premium membership look like.
            </p>
          </div>
          <div className='px-[1em] py-[1.5em] md:w-[50%] md:px-[2.5em]'>
            <div className='max-w-[400px]'>
              <h2 className='text-2xl'>Please register to continue.</h2>
              <RegisterForm />
              <p>
                Already have an account?{' '}
                <Link
                  href='/login'
                  className='mt-4 flex h-10 w-[6em] items-center justify-center rounded-lg bg-yellow-400 px-4 text-center text-sm font-medium text-black hover:bg-yellow-500'
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
