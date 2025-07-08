import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Price Tracker",
  description:
    "This is a price tracker website for goods. With just one click, you can find out the price of any good in any country.",
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
