import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shortlink Frontend",
  description: "Short link management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
