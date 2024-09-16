import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

// * Example Use *
// const buttonClasses = cn(
//   {
//     'bg-blue-500': !pending,
//     'bg-gray-500': pending,
//   },
//   'text-white px-4 py-2 rounded'
// );

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
