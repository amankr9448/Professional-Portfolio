import type { Metadata } from "next";
import FloatingNav from "@/components/FloatingNav";
import SideNav from "@/components/SideNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aman Kumar — Backend Engineer",
  description:
    "Aman Kumar — Backend Developer working across Python, Django, PostgreSQL, Redis and AWS, with production experience in high-throughput enterprise systems.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-void text-paper">
        <div className="mx-auto flex min-h-screen max-w-7xl">
          <div className="hidden lg:block">
            <SideNav />
          </div>
          <main className="min-w-0 flex-1 px-6 pb-32 pt-16 sm:px-8 lg:px-12 lg:py-24">
            {children}
          </main>
        </div>
        <FloatingNav />
      </body>
    </html>
  );
}
