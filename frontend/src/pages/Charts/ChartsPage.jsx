import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Chart from "../../components/Chart/Chart";

function ChartsPage() {
  return (
    <>

      <div
        style={{
          minHeight: "80vh",
          padding: "40px",
        }}
      >
        <Chart />
      </div>
    </>
  );
}

export default ChartsPage;