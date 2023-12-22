export const currencies ={
  "$": "USD (United States Dollar)",
  "C$": "CAD (Canadian Dollar)",
  "¥": "JPY (Japanese Yen)",
  "元": "CNY (Chinese Renminbi)",
  "A$": "AUD (Australian Dollar)",
  "₿": "BTC (Bitcoin)",
  "S$": "SGD (Singapore Dollar)",
  "£": "GBP (British Pound Sterling)"
};
const convertCurrency = (amount, source, target) => {
  var exchangeRates = {
    "$": 1,
    "£": 0.73,
    "¥": 110.15,
    "C$": 1.26,
    "A$": 1.37,
    "S$": 1.34,
    "元": 6.38,
    "₿": 0.000021,
  };

  if (!(source in exchangeRates) || !(target in exchangeRates)) {
    console.error("Source or target currency not found");
    return null; 
  }

  const floatAmount = parseFloat(amount);
  if (isNaN(floatAmount)) {
    console.error("Invalid amount");
    return null; 
  }
  
  console.log('final float amount - ', (floatAmount / exchangeRates[source]) * exchangeRates[target]);
  return (floatAmount / exchangeRates[source]) * exchangeRates[target];
};

export default convertCurrency;
