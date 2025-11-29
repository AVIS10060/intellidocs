import "./globals.css";
import ToasterProvider from '@/components/ToasterProvider';
export const metadata = {
  title: "IntelliDocs",
  description: "AI Document Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <ToasterProvider /> {/* Place it here */}
      <body>{children}</body>
    </html>
  );
}
