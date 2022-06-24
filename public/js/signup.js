const signupForm = document.getElementById('signupform');
const createPassword = document.getElementById('create_password');
const createEmail = document.getElementById('create_email');
const createUsername = document.getElementById('create_username');


const sendInformation = async (e) => {
    e.preventDefault();

    const signupBody = {
        username: createUsername.value.trim(),
        email: createEmail.value.trim(),
        password: createPassword.value.trim()
    };
    // send textbox value Username,email,password to server side using post request to save it on database

    const fetchSignup = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(signupBody)
    });
    const response = await fetchSignup.json()
    // .then((data) => {
    //     window.alert(data.message);

        if(response.status === 201) {
            localStorage.setItem('user', JSON.stringify(response.userInfo))
            window.location.pathname = '/login'
        }

        createEmail.value = "";
        createPassword.value = "";
        createUsername.value = "";
        // window.alert(`Email:${data.email} added sucessfully,Thank you for your signup,please register your information through sign in page`)

}
signupForm.addEventListener('submit', sendInformation);
