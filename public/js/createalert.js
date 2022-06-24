//get all form data through submission
const tickerEl = document.querySelector('#ticker');
const entryEl = document.querySelector('#entry');
const entryPriceEl = document.querySelector('#entry-price');
const targetEl = document.querySelector('#target');
const stoplossEl = document.querySelector('#stoploss');
const userID = document.querySelector('#userId');
// const currentPriceEl = document.querySelector('#current-price');
const alertSubmitButton = document.querySelector('#alert-submit')

//function for submission 
const createAlert = async (e) =>{
    e.preventDefault();
    const alertBody = {
        // user_id: user_id, no need enter here because it get from the loggedIn user id
        ticker: tickerEl.value.trim().toUpperCase(),
        entry: entryEl.value,
        entry_price: entryPriceEl.value,
        target: targetEl.value,
        stoploss: stoplossEl.value,
        status: "OPEN",
        // profit_or_loss: eventDescription.value,
    };

    // console.log(alertBody)

    // sending event details to the server using POST request
    const fetchNewEvent = await fetch('/api/alert', {
        method: 'POST',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify(alertBody),
    });

    //if the submission is successful then go to the users personal page
    if(fetchNewEvent.ok){
        document.location.replace('/');
    }
    //otherwise if it doesn't work then send text notification of error
    else{
        alert(fetchNewEvent.statusText);
    }
}

//on submit button being clicked then add the details.
alertSubmitButton.addEventListener('submit', createAlert);