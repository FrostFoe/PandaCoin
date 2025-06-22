import type { Metadata, Viewport } from "next";
import { Fredoka, Inter, Cutive_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/context/Providers";
import { Toaster } from "@/components/ui/toaster";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cutiveMono = Cutive_Mono({
  subsets: ["latin"],
  variable: "--font-cutive-mono",
  weight: "400",
});

const APP_NAME = "Bamboo Tame";
const APP_DESCRIPTION = "Tame pandas, complete tasks, and build your collection!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_NAME,
      template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: "https://placehold.co/1200x630.png",
        width: 1200,
        height: 630,
        alt: "A collection of cute pandas.",
        "data-ai-hint": "cute pandas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_NAME,
      template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
    images: ["https://placehold.co/1200x630.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#81B29A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-inter antialiased",
          fredoka.variable,
          inter.variable,
          cutiveMono.variable,
        )}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
