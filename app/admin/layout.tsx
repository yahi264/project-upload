import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = { title: "Requests · Hieron", robots: { index: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
