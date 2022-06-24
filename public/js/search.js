// login DOM
const searchEl = document.getElementById('search-ticker');
const searchButton = document.getElementById('search-btn');
const currentPrice = document.getElementById('symbol-list');

const sendSearch = async (e) => {
    e.preventDefault();
    const ticker =  searchEl.value.trim().toUpperCase();

    if (ticker) {
        const response = await fetch(`/search/${ticker}`)
        if (response.ok) {
          document.location.replace(`/search/${ticker}`);
        } else {
          alert('No Alert found for this Ticker.');
        }
      }
    };
    searchButton.addEventListener('click', sendSearch);
