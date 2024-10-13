import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Cashio",
  description: "Expense Tracker",
  icons:{
    icon:"https://cdn-icons-png.flaticon.com/512/2769/2769441.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider 
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div style={{backgroundColor:"#fff4e8"}}>
          <div style={{backgroundColor:"#fff4e8"}} className="fixed w-full z-50">
            <Navbar/>
          </div>
          <div className="p-8 pt-20">
            {children}
          </div>
          <div style={{backgroundColor:"#fff4e8"}}>
            <Footer/>
          </div>
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
