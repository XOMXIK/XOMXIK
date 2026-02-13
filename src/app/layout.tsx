import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ClientProviders from "@/components/layout/ClientProviders";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "XOMXIK | The End, and Begins.",
  description:
    "XOMXIK - IT Development Company. We build digital experiences that transcend boundaries.",
  keywords: ["XOMXIK", "IT", "Development", "Web", "App", "Consulting"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={montserrat.variable}>
      <body className="antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
