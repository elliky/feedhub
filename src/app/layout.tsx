import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

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

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col h-screen">
          {/* Header */}
          <header className="bg-gray-800 text-white p-4">
            <h1 className="text-xl">My App Header</h1>
            <nav>
              <Link href="/applications" className="text-white hover:underline">
                Applications
              </Link>
              <Link
                href="/access-groups"
                className="text-white hover:underline"
              >
                Access groups
              </Link>
            </nav>
          </header>

          {/* Main Content with Sidebar */}
          <div className="flex flex-grow">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-4">
              <nav>
                <ul>
                <li className="mb-2">
                    <Link
                      href="/"
                      className="text-gray-700 hover:underline"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href="/applications"
                      className="text-gray-700 hover:underline"
                    >
                      Applications
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href="/access-groups"
                      className="text-gray-700 hover:underline"
                    >
                      Access groups
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>

            {/* Content */}
            <main className="flex-grow p-8 bg-white">{children}</main>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
