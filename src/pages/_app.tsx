import React, { useState } from 'react'
import type { AppProps } from 'next/app';
import { Geist, Geist_Mono } from "next/font/google";

import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from '@/store/configureStore';
import LeftSidebar from '@/layouts/LeftSidebar';
import Header from '@/layouts/Header';
import "../app/globals.css"

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <div className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen bg-slate-50`}>
          <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <div className="flex-1 min-w-0">
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <main className="p-4 md:p-6">
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
