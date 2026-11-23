import type { Metadata } from "next";
import "./globals.css";
import { ActivityTracker } from "@/components/activity-tracker";

export const metadata: Metadata = {
  title: "Clevira | Clearer information when infection symptoms worry you",
  description:
    "Clear, responsible information for people worried about infection symptoms. Product details and claims remain subject to official verification.",
  applicationName: "Clevira",
  openGraph: {
    title: "Clevira | Clearer information when infection symptoms worry you",
    description:
      "Understand what information to check and where to find responsible next steps. Clevira product claims remain subject to official verification.",
    siteName: "Clevira",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Clevira | Clearer information when infection symptoms worry you",
    description:
      "Explore responsible health information from Trendora Global Ltd. Clevira product claims remain subject to official verification.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {process.env.ACTIVITY_WEBHOOK_URL && <ActivityTracker />}
        {children}
      </body>
    </html>
  );
}
