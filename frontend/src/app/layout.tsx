import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider, UseAppData } from "@/context/appContext";
import { LoaderIcon } from "lucide-react";


export const metadata: Metadata = {
  title: "EzHire",
  description: "To simplify the hiring and applying process.",
  openGraph: {
    title: "EzHire",
    description: "To simplify the hiring and applying process.",
    url: "https://ez-hire-monolith.vercel.app", // Replace with your actual domain
    siteName: "EzHire",
    images: [
      {
        url: "/EzHireLogo.webp", // Path to your OG image in the public folder
        width: 1200,
        height: 630,
        alt: "EzHire Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EzHire",
    description: "To simplify the hiring and applying process.",
    images: ["/EzHireLogo.webp"], // Path to your Twitter image in the public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        
        <AppProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar/>
        {children}
        </ThemeProvider>
        </AppProvider>

      </body>
    </html>
  );
}
