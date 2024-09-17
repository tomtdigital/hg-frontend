import Link, { LinkProps } from "next/link";
import { HTMLProps, FC, ReactNode } from "react";
import { cn } from "../utils/classname";

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
      "m-1 bg-yellow-500 hover:bg-yellow-600 text-black block w-[8em] text-center p-4 rounded-[10em]",
      className
    )}
    href={href}
  >
    {children}
  </Link>
);
