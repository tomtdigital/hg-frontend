import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { cn } from '@/app/utils/classname';

type PreviewLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export const PreviewLink: FC<PreviewLinkProps> = ({
  href,
  className,
  children,
}) => (
  <Link
    className={cn(
      'm-1 block w-[8em] rounded-[10em] bg-white p-4 text-center text-black hover:bg-lightGrey',
      className
    )}
    href={href}
  >
    {children}
  </Link>
);
