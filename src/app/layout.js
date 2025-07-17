'use client';
import "./globals.css";
import Nav from "../app/Nav/page"
import Footer from "../app/Footer/page"
import NavbarWithFilter from "../app/Nav/page";
import { store } from "../../store/store";
import { Provider } from "react-redux";





export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
           <Provider store={store}>
        <NavbarWithFilter/>
        {children}
        <Footer/>
        </Provider>
      </body>
    </html>
  );
}
