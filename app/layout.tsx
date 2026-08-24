import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'BREAKPOINT / Find your line', description: 'Find your next surf spot.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
