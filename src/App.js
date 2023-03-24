import React, { useState, useEffect } from 'react';
import './App.css';
import TradingViewWidget from './TradingViewWidget';

function App() {
  const [selectedCryptos, setSelectedCryptos] = useState(['BTC', 'ETH', 'ADA']);
  const [selectedIndicators, setSelectedIndicators] = useState(['MACD']);

  useEffect(() => {
    const selectedCryptosString = JSON.stringify(selectedCryptos);
    const selectedIndicatorsString = JSON.stringify(selectedIndicators);
    localStorage.setItem('selectedCryptos', selectedCryptosString);
    localStorage.setItem('selectedIndicators', selectedIndicatorsString);
  }, [selectedCryptos, selectedIndicators]);

  return (
    <div className='App'>
      <div className='header'>
            <h2>How to use</h2>
            <p>
              Select the crypto symbols you want to see in the chart and the indicators you want to see in the chart.
              The chart will automatically update when you select a new crypto symbol or indicator.
              Your preferences will be saved for 30 days.
            </p>
            
          </div>
      <div className='chart-container'>
        <TradingViewWidget symbols={selectedCryptos} indicators={selectedIndicators} />
      </div>
      <div className='explanation'>
        <h2>How to read charts and use indicators?</h2>
        <div className='explanation__section'>
          <h2>MACD</h2>
          <p>
            The MACD indicator is a trend-following momentum indicator that shows the relationship between two moving
            averages of prices. The MACD is calculated by subtracting the 26-period Exponential Moving Average (EMA) from
            the 12-period EMA. A nine-day EMA of the MACD, called the "signal line", is then plotted on top of the MACD
            line, which can function as a trigger for buy and sell signals. Traders may buy the security when the MACD
            crosses above its signal line and sell—or short—the security when the MACD crosses below the signal line.
          </p>
      </div>
      <div className='explanation__section'>
        <h2>RSI</h2>
        <p>
          The Relative Strength Index (RSI) is a momentum oscillator that measures the speed and change of price
          movements. The RSI is displayed as an oscillator (a line graph that moves between two extremes) and can have a
          reading from 0 to 100. The RSI is considered overbought when above 70 and oversold when below 30.
        </p>
        <p>
          Try to open a long position when the RSI is oversold and the price is rising. This happens when the RSI is below a level of 30.
          Try to open a short position when the RSI is overbought and the price is falling. This happens when the RSI is above a level of 70.
        </p>
        <p>
          The RSI can also be used to identify the general trend. If the RSI is trending higher, prices are generally
          increasing. If the RSI is trending lower, prices are generally decreasing.
        </p>
        </div>
        <div className='explanation__section'>
          <h2>VWAP</h2>
          <p>
            The Volume Weighted Average Price (VWAP) is a trading benchmark used by traders that gives the average price a
            security has traded at throughout the day, based on both volume and price. The VWAP is calculated by adding
            the dollars traded for every transaction (price multiplied by number of shares traded) and then dividing by
            the total shares traded for the day. The VWAP is displayed as a line graph that moves throughout the trading
            day.
          </p>
          </div>
          </div>
    </div>
  );
}
export default App;
