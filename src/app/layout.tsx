"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { useState } from "react";
import Header from "@/layouts/Header";
import LeftSidebar from "@/layouts/LeftSidebar";
import { Provider } from 'react-redux';
import { store } from "@/store/configureStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <div className="flex min-h-screen bg-slate-50">
            <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 min-w-0">
              <Header onMenuClick={() => setIsSidebarOpen(true)} />
              <main className="p-4 md:p-6">
                {children}
              </main>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}