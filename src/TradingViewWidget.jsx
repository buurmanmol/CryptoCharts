import React, { useEffect, useRef } from "react";
import "./TradingViewWidget.css";
import Cookies from "js-cookie";


let tvScriptLoadingPromise;

function CryptoChart({ symbol, indicators }) {
  const onLoadScriptRef = useRef();
  const containerIdRef = useRef(`tradingview_${symbol}`);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById(containerIdRef.current) &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: `BINANCE:${symbol}`,
          interval: "5",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          save_image: false,
          studies: indicators,
          container_id: containerIdRef.current,
        });
      }
    }
  }, [symbol, indicators]);

  return (
    <div className="tradingview-widget-container">
      <div id={containerIdRef.current} Style="height:500px" />
    </div>
  );
}

export default function TradingViewWidget() {
  const [cryptos, setCryptos] = React.useState([]);
  const [indicators, setIndicators] = React.useState([]);
  const cookieCryptos = Cookies.get("cryptos");
  const cookieIndicators = Cookies.get("indicators");

  React.useEffect(() => {
    if (cookieCryptos) {
      setCryptos(JSON.parse(cookieCryptos));
    }

    if (cookieIndicators) {
      setIndicators(JSON.parse(cookieIndicators));
    }
  }, []);

  React.useEffect(() => {
    Cookies.set("cryptos", JSON.stringify(cryptos));
  }, [cryptos]);

  React.useEffect(() => {
    Cookies.set("indicators", JSON.stringify(indicators));
  }, [indicators]);

  const handleCryptoChange = (event) => {
    const { value } = event.target;
    if (value === "none") {
      setCryptos([]);
      return;
    }

    if (cryptos.includes(value)) {
      setCryptos(cryptos.filter((c) => c !== value));
    } else {
      setCryptos([...cryptos, value]);
    }
  };

  const handleIndicatorChange = (event) => {
    const { value } = event.target;
    if (value === "none") {
      setIndicators([]);
      return;
    }

    if (indicators.includes(value)) {
      setIndicators(indicators.filter((i) => i !== value));
    } else {
      if (indicators.length >= 3) {
        return;
      }

      setIndicators([...indicators, value]);
    }
  };

  const cryptoOptions = [
    { value: "AAVEUSDT", label: "Aave (AAVE)" },
    { value: "ARBUSDT", label: "Arbitrum (ARB)" },
    { value: "BNBUSDT", label: "Binance Coin (BNB)" },
    { value: "BTCUSDT", label: "Bitcoin (BTC)" },
    { value: "BCHUSDT", label: "Bitcoin Cash (BCH)" },
    { value: "ADAUSDT", label: "Cardano (ADA)" },
    { value: "LINKUSDT", label: "Chainlink (LINK)" },
    { value: "ATOMUSDT", label: "Cosmos (ATOM)" },
    { value: "DOGEUSDT", label: "Dogecoin (DOGE)" },
    { value: "EOSUSDT", label: "EOS (EOS)" },
    { value: "ETHUSDT", label: "Ethereum (ETH)" },
    { value: "ETCUSDT", label: "Ethereum Classic (ETC)" },
    { value: "FILUSDT", label: "Filecoin (FIL)" },
    { value: "ICPUSDT", label: "Internet Computer (ICP)" },
    { value: "MIOTAUSDT", label: "IOTA (MIOTA)" },
    { value: "LTCUSDT", label: "Litecoin (LTC)" },
    { value: "LUNAUSDT", label: "Luna (LUNA)" },
    { value: "XMRUSDT", label: "Monero (XMR)" },
    { value: "NEOUSDT", label: "NEO (NEO)" },
    { value: "DOTUSDT", label: "Polkadot (DOT)" },
    { value: "SOLUSDT", label: "Solana (SOL)" },
    { value: "XLMUSDT", label: "Stellar (XLM)" },
    { value: "THETAUSDT", label: "Theta (THETA)" },
    { value: "TRXUSDT", label: "TRON (TRX)" },
    { value: "UNIUSDT", label: "Uniswap (UNI)" },
    { value: "VETUSDT", label: "VeChain (VET)" },
    { value: "XRPUSDT", label: "XRP (XRP)" },

    
  ];

  const indicatorOptions = [
    
    
    
    { value: "STD;BollingerBands", label: "Bollinger Bands" },
    { value: "STD;MACD", label: "MACD" },
    { value: "STD;Stochastic", label: "Stochastic" },
    { value: "STD;RSI", label: "RSI" },
    { value: "STD;VWAP", label: "VWAP" },
  ];

  return (
    <div className="tradingview-widget">
      <div className="tradingview-widgets-grid">
        <div className="col-md-3"Style="height:100%">
          <div className="crypto-selector">
            <h3>Select Cryptocurrencies</h3>
            {cryptoOptions.map((option) => (
              <div key={option.value} className="cryptoList">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={cryptos.includes(option.value)}
                  onChange={handleCryptoChange}
                />
                {option.label}
                <br></br>
              </div>
            ))}
          </div>
  
          <div className="indicator-selector">
            <h3>Indicators (Max 3)</h3>
            {indicatorOptions.map((option) => (
              <div key={option.value} className="indicator-option">
                <input
                  type="checkbox"
                  id={option.value}
                  value={option.value}
                  checked={indicators.includes(option.value)}
                  onChange={handleIndicatorChange}
                  disabled={
                    indicators.length >= 3 && !indicators.includes(option.value)
                  }
                />
  
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="col-xl-9"Style="width:80%">
            {cryptos.map((crypto, index) => (
              <div key={crypto} Style="width:50%; display:inline-flex; flex-wrap:wrap;">
                <CryptoChart symbol={crypto} indicators={indicators} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

