import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className='flex w-screen justify-center'>
      <div className='sm:shadow-z1 w-[100%] sm:w-[375px]'>{children}</div>
    </div>
  );
}
