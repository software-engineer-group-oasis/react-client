"use client";
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import {AuthProvider} from '@/contexts/AuthContext';
import Script from 'next/script';

export default function MainLayout ({children}) {

  return (
    <AuthProvider>
    <html>
     
      <body className="flex flex-col h-[100vh]">
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
      </body>
    </html>
    </AuthProvider>
  )
}