import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {

  title: "eLearn Platform | Learn Anything, Anytime",
  description:
    "A modern e-learning platform built with Next.js, Tailwind CSS, and Framer Motion. Explore tutorials and enhance your skills for free.",
  keywords:
    "elearning, online courses, tutorials, nextjs, tailwind, programming, education",
  authors: [{ name: "eLearn Platform Team" }],
  openGraph: {
    title: "eLearn Platform | Learn Anything, Anytime",
    description:
      "A modern e-learning platform with interactive tutorials built using Next.js and Tailwind CSS.",
    url: "https://yourdomain.com",
    siteName: "eLearn Platform",
    images: [
      {
        url: "/og-image.png", // you can add this later
        width: 1200,
        height: 630,
        alt: "eLearn Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "eLearn Platform | Learn Anything, Anytime",
    description:
      "A modern e-learning platform with interactive tutorials built using Next.js and Tailwind CSS.",
    creator: "@yourhandle",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <main className="pt-18">{children}</main>
      </body>
    </html>
  );
}
