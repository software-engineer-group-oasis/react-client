import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import {AuthProvider} from '@/contexts/AuthContext';

// 添加网页metadata
export const metadata = {
  title: 'house rental',
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property'
  
};

export default function MainLayout ({children}) {

  return (
    <html>
      <body className="flex flex-col justify-between h-[100vh]">
        <AuthProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}