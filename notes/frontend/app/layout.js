import { Nunito,PT_Sans } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

const sans = PT_Sans({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${sans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
