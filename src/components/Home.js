import React, { useState, useEffect } from "react";
import StockChart from './StockChart.js';

function Home() {
  const [stockSymbolInput, setStockSymbolInput] = useState('');
  const [dayInput, setDayInput] = useState('');
 
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Open price",
        data: [],
      },
      {
        label: "Closed price",
        data: [],
      },
    ],
  });

  const API_KEY = process.env.REACT_APP_API_KEY

  const fetchData = async (stockSymbol, days = 10) => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`);

      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const parsedData = await response.json();
      const dailyData = parsedData["Time Series (Daily)"]
      console.log(dailyData)
      const labels = [];
      const openPriceData = [];
      const closedPriceData = [];
      let entryCount = 0

      for (const date in dailyData) {
        if (entryCount >= days) {
          break;
        }
        const entry = dailyData[date];
        labels.push(date);
        openPriceData.push(parseFloat(entry["1. open"]));
        closedPriceData.push(parseFloat(entry["4. close"]));
        entryCount++;
      }

      setUserData({
        labels,
        datasets: [
          {
            label: "Open Price",
            data: openPriceData,
            backgroundColor: [
              "#4D96FF",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
          {
            label: "Closed price",
            data: closedPriceData,
            backgroundColor: [
              "#FF6B6B"
            ],
            borderColor: "red",
            borderWidth: 2,
          }
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
    <div className="container pt-5">
      <h1>Stock chart app with chart.js</h1>
      <div className="row py-5">
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
      
      <StockChart userData={userData} />
    </div>
  )
}

export default Home;