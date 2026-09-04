import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arandu Go — Ferretería San Martín",
  description: "Página demostrativa administrable de Arandu Go.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
