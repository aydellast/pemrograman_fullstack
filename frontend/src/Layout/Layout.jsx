import React from "react";
import { Outlet } from "react-router-dom"; // Pastikan baris ini sudah di-import di paling atas
import Navbar from "../components/Navbar/Navbar"; 
import Footer from "../components/Footer/Footer"; 
import Container from "../components/Container";

function Layout() { // Di sini kosong, tidak pakai ({ children }) lagi
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: "1 0 auto", width: "100%" }}>
        <Container>
          {/* UBAH BARIS 15: Ganti {children} menjadi <Outlet /> */}
          <Outlet /> 
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;