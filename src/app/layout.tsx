"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
        <div className="flex">
          <LeftSidebar />
          <div className="flex-1 bg-gray-50 min-h-screen p-6">
            <Header />
            
              <div className="mt-4">
                {children}
              </div>
          </div>
        </div>
        </Provider>
      </body>
    </html>
  );
}