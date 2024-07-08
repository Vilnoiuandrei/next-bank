import Navigation from "./_components/Navigation";
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap" });
import "@/app/_styles/globals.css";

export const metadata = {
  title: "NextBank",
  description:
    "Discover secure and efficient banking services at NextBank. Explore our range of products and services tailored to meet your financial needs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-customDark text-customLight min-h-screen  `}
      >
        <Navigation />
        <main> {children}</main>
      </body>
    </html>
  );
}
