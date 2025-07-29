import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CineMax - Movie Reservation System",
  description: "Book your favorite movies with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-primary">
                  CineMax
                </Link>
                
                <div className="flex items-center space-x-6">
                  <Link 
                    href="/movies" 
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    Movies
                  </Link>
                  <Link 
                    href="/reservations" 
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    Book Tickets
                  </Link>
                </div>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t bg-muted/50 mt-16">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center text-muted-foreground">
                <p>&copy; 2024 CineMax. All rights reserved.</p>
                <p className="text-sm mt-2">Experience movies like never before</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
