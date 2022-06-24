 ///get all the alert data to table
 const getAllAlert = async () => {
    const response = await fetch("https://financialmodelingprep.com/api/v3/quote-short/AAPL?apikey=426a180ed615b15a788f685fbecd647b");
  
    const data = await response.json();
  
    console.log(data);
  }
  getAllAlert();