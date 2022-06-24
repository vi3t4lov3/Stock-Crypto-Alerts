const usernameEL = document.querySelector('#user-name')
const emailEL = document.querySelector('#change-email')
const passwordEL = document.querySelector('#change-pass');
const profileSubmitButton = document.querySelector('#change-profile')
  const updateProfile = async (e) => {
    e.preventDefault();
    if (e.target.hasAttribute('data-id')) {
      const id = e.target.getAttribute('data-id');
    // const user_id = req.session.user_id
// console.log(id)
      const profileBody = {
        // user_id: 1,
        username: usernameEL.value,
        email: emailEL.value,
        password: passwordEL.value,
      };
  
      // sending event details to the server using PUT request
      const fetchNewEvent = await fetch(`/api/user/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(profileBody),
      });
      document.location.replace(`/profile/${id}`);
    }
  };

  profileSubmitButton.addEventListener('click', updateProfile);



