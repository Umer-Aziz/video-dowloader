import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "All in one Video Downlaoder",
  description: "Downlaod Youtube , Instagram , facebook , and Tiktok video for Free in HD Quality without Watermark.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
