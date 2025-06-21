import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className='flex w-screen items-center justify-center'>
      <div className='w-[100%] sm:w-[375px]'>{children}</div>
    </div>
  );
}
