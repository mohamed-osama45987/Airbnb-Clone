import "./globals.css";
import { Nunito } from "next/font/google";

import NavBar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={font.className}>
        <ClientOnly>
          <Modal isOpen />
          <NavBar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
