
import "./globals.css";
import Nav from "../app/Nav/page"
import Footer from "../app/Footer/page"
import NavbarWithFilter from "../app/Nav/page";





export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <NavbarWithFilter/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
