import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "prepzone",
  description: "Practice here for exam.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
