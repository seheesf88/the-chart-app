import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import StockChart from "./components/StockChart.js";


function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<StockChart />} />
      </Routes>
    </main>
  );
}

export default App;
