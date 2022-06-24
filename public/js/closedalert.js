const closedButton = document.querySelector('#close-alert-submit')
const closedPriceEl = document.querySelector('#closed-price')
const closedEntryEl = document.querySelector('#closed-entry');
const profitEL = document.querySelector('#gain-or-loss')
function getApiData(id) {
    return new Promise((resolve) => {
      var requestURL = `/api/alert/${id}`;
      fetch(requestURL)
        .then(function (response) {
          return resolve(response.json());
        })
        .catch((err) => {
          return resolve({});
        });
    });
  }
  
  const closeAlert = async (e) => {
    e.preventDefault();
    if (e.target.hasAttribute('data-id')) {
      const id = e.target.getAttribute('data-id');
      const data = await getApiData(id);
    //   console.log(data);
      const entryPrice = data.entry_price;
    //   console.log(entryPrice);
      const profit = closedPriceEl.value - entryPrice;
      const profit_percent = ((profit / closedPriceEl.value) * 100).toFixed(2);
  
      const alertBody = {
        // user_id: 1,
        close_entry: closedEntryEl.value,
        closed_price: closedPriceEl.value,
        status: 'CLOSED',
        profit_or_loss: profit_percent,
      };
  
      // sending event details to the server using PUt request
      const fetchNewEvent = await fetch(`/api/alert/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(alertBody),
      });
      document.location.replace('/');
    }
  };

closedButton.addEventListener('click', closeAlert);



