const deleteButton = document.querySelector('#delete-alert')


const deleteHandler = async (e) => {
    if (e.target.hasAttribute('data-id')) {
      const id = e.target.getAttribute('data-id');
      // console.log(id);
      await fetch(`/api/alert/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      document.location.replace('/');
    }
  };
  
  deleteButton.addEventListener('click', deleteHandler);
  