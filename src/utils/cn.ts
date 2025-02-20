import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import fontSize from '../../fontSize';

// Custom Tailwind merge configuration to handle font size classes dynamically
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Generate font size class group from imported fontSize configuration
      'font-size': Object.keys(fontSize).map((key) => `text-${key}`),
    },
  },
});

// Enhanced class name utility that combines clsx with custom Tailwind merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
