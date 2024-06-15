import "./globals.css";
import "./auth.css";
import "remixicon/fonts/remixicon.css";

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "./providers/theme-provider";
import LayoutProvider from "./providers/layout-provider";

export const metadata: Metadata = {
  title: "Expense-Tracker",
  description: "A Simle Expense Tracker App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
