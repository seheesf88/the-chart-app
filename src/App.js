import { useState, useEffect } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";

function App() {
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users Gained",
        data: [],
      },
    ],
  });
  const [stockSymbolInput, setStockSymbolInput] = useState('');
  const [dayInput, setDayInput] = useState('');
  const API_KEY = process.env.REACT_APP_API_KEY

  const fetchData = async (stockSymbol, days = 10) => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`);

      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const parsedData = await response.json();
      const dailyData = parsedData["Time Series (Daily)"]

      const labels = [];
      const userGainData = [];
      let entryCount = 0

      for (const date in dailyData) {
        if (entryCount >= days) { // Stop processing after 30 entries
          break;
        }
        const entry = dailyData[date];
        labels.push(date);
        userGainData.push(parseFloat(entry["1. open"]));
        entryCount++;
      }

      setUserData({
        labels,
        datasets: [
          {
            label: "Users Gained",
            data: userGainData,
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFetchButtonClick = () => {
    fetchData(stockSymbolInput, dayInput);
  };

  useEffect(() => {
  }, [userData]);

  return (
    <div className="container pt-md-4">
      <h1>Stock chart app with chart.js</h1>
      <div className="row pt-md-5">
        <div className="form-group col-md-8">
          <label htmlFor="stockSymbol">Stock symbol</label>
          <input
            id="stockSymbol"
            type="text"
            className="form-control" 
            value={stockSymbolInput}
            onChange={(e) => setStockSymbolInput(e.target.value)}
            placeholder="Enter stock symbol" 
          />
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="days">Day(s)</label>
          <input
            id="days"
            value={dayInput}
            onChange={(e) => setDayInput(e.target.value)}
            className="form-control" 
            placeholder="Enter days"
          />
        </div>
        <button
          className="btn btn-primary col-md-2"
          onClick={handleFetchButtonClick}
        >
          Get stock price
        </button>
      </div>


        <div className="row">
          <div className="col-md-4">
            <BarChart chartData={userData} />
          </div>
          <div className="col-md-4">
            <LineChart chartData={userData} />
          </div>
          <div className="col-md-4">
            <PieChart chartData={userData} />
          </div>
        </div>

    </div>
  );
}

export default App;
