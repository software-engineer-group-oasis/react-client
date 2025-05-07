import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// 添加网页metadata
export const metadata = {
  title: 'house rental',
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property'
  
};

export default function MainLayout ({children}) {
  return (
    <html>
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}