import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'BREAKPOINT / Find the spot', description: 'Image geolocation, without the creep factor.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
