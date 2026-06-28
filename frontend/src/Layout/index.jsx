import React from "react";
import Navbar from "../components/Navbar/Navbar"; // Sesuaikan jika path navbar kelompokmu berbeda
import Footer from "../components/Footer/Footer"; // Sesuaikan jika path footer kelompokmu berbeda
import Container from "../components/Container";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Layout;