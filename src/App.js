import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import StockChart from "./components/StockChart.js";


function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart" element={<StockChart />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
