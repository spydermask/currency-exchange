import React, { useState } from "react";
import axios from "axios";

function Currency() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const handleFromCurrencyChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAmount(event.target.value);
  };
  const handleConvert = async () => {
    try {
      const res = await axios.get(
        `https://v6.exchangerate-api.com/v6/3a6f1ee4e86faf99a125c3e0/latest/${fromCurrency}`
      );

      console.log("API Response:", res.data);

      if (
        res.data &&
        res.data.conversion_rates &&
        res.data.conversion_rates[toCurrency]
      ) {
        const { conversion_rates } = res.data;
        const exchangeRate = conversion_rates[toCurrency];
        const converted = parseFloat(amount) * exchangeRate;
        setConvertedAmount(parseFloat(converted.toFixed(2)));
      } else {
        console.error(
          "Error converting: Response data or rates not available."
        );
      }
    } catch (error) {
      console.error("Error converting:", error);
    }
  };

  return (
    <>
      <div className="name">
        <div className="head">
          <header>CURRENCY EXCHANGER</header>
        </div>

        <div className="currency-selection">
          <div className="currency-selection-from">
            <label>
              <b>From Currency</b>
            </label>
            <div className="input-with-dropdown">
              <input
                type="text"
                placeholder="Select currency"
                name="fromCurrency"
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
              />
              <select value={fromCurrency} onChange={handleFromCurrencyChange}>
                <CurrencyOptions />
              </select>
            </div>
          </div>

          <br />

          <div className="currency-selection-from">
            <label>
              <b>To Currency</b>
            </label>
            <div className="input-with-dropdown">
              <input
                type="text"
                placeholder="Select currency"
                name="toCurrency"
                value={toCurrency}
                onChange={handleToCurrencyChange}
              />
              <select value={toCurrency} onChange={handleToCurrencyChange}>
                <CurrencyOptions />
              </select>
            </div>
          </div>

          <br />

          <label className="label">
            <b>AMOUNT</b>
          </label>
          <div className="amount">
            <input
              type="number"
              placeholder="Amount"
              name="Amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>

          <div className="result">
            <button onClick={handleConvert}>Convert</button>
            {convertedAmount && (
              <div
                className="amount"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontFamily: "Times New Roman",
                  border: "1px solid",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                Converted amount: {convertedAmount}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function CurrencyOptions() {
  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "JPY",
    "SEK",
    "NZD",
    "KRW",
    "SGD",
    "NOK",
    "MXN",
    "INR",
    "RUB",
    "BRL",
    "ZAR",
    "HKD",
    "TRY",
    "DKK",
    "PLN",
    "THB",
    "IDR",
    "HUF",
    "CZK",
    "ILS",
    "PHP",
    "AED",
    "MYR",
    "RON",
    "COP",
    "SAR",
    "VND",
    "ARS",
    "CLP",
    "TWD",
    "NGN",
    "EGP",
    "PKR",
    "UAH",
    "QAR",
    "BDT",
    "KWD",
    "OMR",
    "LKR",
    "UGX",
    "KES",
    "BHD",
    "GHS",
    "TZS",
    "TND",
    "DZD",
    "MAD",
    "BYN",
    "RSD",
    "CRC",
    "MMK",
    "IRR",
    "GTQ",
    "HRK",
    "AMD",
    "BGN",
    "ISK",
    "XAF",
    "CUC",
    "LYD",
    "ALL",
    "XOF",
    "GEL",
    "JMD",
    "MKD",
    "MUR",
    "AFN",
    "NPR",
    "KZT",
    "AOA",
    "ETB",
    "MZN",
    "BND",
    "YER",
    "AWG",
    "BBD",
    "BMD",
    "BND",
    "BSD",
    "BTN",
    "BZD",
    "FJD",
    "FKP",
    "GIP",
    "GYD",
    "HNL",
    "LRD",
    "LSL",
    "MVR",
    "NAD",
    "NIO",
    "PGK",
    "RWF",
    "SBD",
    "SCR",
    "SLL",
    "SRD",
    "STD",
    "TOP",
    "TTD",
    "VUV",
    "WST",
    "XCD",
    "ZMW",
  ];

  return (
    <>
      {currencies.map((currency, index) => (
        <option key={index} value={currency}>
          {currency}
        </option>
      ))}
    </>
  );
}

export default Currency;
