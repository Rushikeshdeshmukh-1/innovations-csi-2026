import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INNOVATIONS — CSI SIES GST",
  description:
    "The official technical innovation hub by CSI SIES GST. Explore projects, view the timeline, and access team portals.",
  keywords: ["CSI", "innovations", "SIES GST", "hackathon", "engineering", "technical", "projects"],
  openGraph: {
    title: "INNOVATIONS — CSI SIES GST",
    description: "The official technical innovation hub by CSI SIES GST. Explore projects and dive into the future.",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
