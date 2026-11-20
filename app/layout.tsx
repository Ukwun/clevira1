import type { Metadata } from "next";
import "./globals.css";
import { ActivityTracker } from "@/components/activity-tracker";

export const metadata: Metadata = {
  title: "Clevira | Clearer health information",
  description:
    "Find clear, responsible information about health concerns and Clevira Herbal Capsules. Product details and claims remain subject to official verification.",
  applicationName: "Clevira",
  openGraph: {
    title: "Clevira | Clearer health information",
    description:
      "Understand what information to check and where to find responsible next steps. Clevira product claims remain subject to official verification.",
    siteName: "Clevira",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Clevira | Clearer health information",
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
    <html lang="en">
      <body>
        {process.env.ACTIVITY_WEBHOOK_URL && <ActivityTracker />}
        {children}
      </body>
    </html>
  );
}
