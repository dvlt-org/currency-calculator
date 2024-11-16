import React, { useState, useEffect } from 'react';

const API_URL = 'https://api.currencyapi.com/v3/latest?apikey=cur_live_FzL42EEBtgerQBThuvNvvuJvDAjT1QqFYFYfadQm';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const currencies = Object.keys(data.data);
        setCurrencyOptions(currencies);
      });
  }, []);

  const handleConvert = () => {
    if (!fromCurrency || !toCurrency || !amount) {
      alert('Please fill all fields!');
      return;
    }

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const rates = data.data;
        const fromRate = rates[fromCurrency].value;
        const toRate = rates[toCurrency].value;
        const result = (amount / fromRate) * toRate;
        setConvertedAmount(result.toFixed(2));
      });
  };

  return (
    <div className="app">
      <h1>Currency Converter</h1>

      <div className="converter">
        <div>
          <label>From:</label>
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            <option value="">Select currency</option>
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>To:</label>
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            <option value="">Select currency</option>
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <button onClick={handleConvert}>Convert</button>

        {convertedAmount && (
          <div>
            <h3>
              Converted Amount: {convertedAmount} {toCurrency}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
