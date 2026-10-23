import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Strategic Communications & Geopolitical Risk Advisory',
  description: 'Navigating complex landscapes, media relations, and geopolitical risk across the US and the Gulf markets.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#0b0f17] text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}