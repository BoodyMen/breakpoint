import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BREAKPOINT / Find the spot',
  description:
    'Drop a photo. Several vision models locate it independently and plot every guess on the map. Coastal intelligence, not surveillance — it finds the place, not the person.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
