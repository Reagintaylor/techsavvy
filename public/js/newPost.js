const newPostHandler = async function(event) {
    event.preventDefault();
  
    const title = $('#posttitle').val();
    const body = $r('#postbody').val();
  
    await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/dashboard');
  };
  
  const switchToEdit = async function () {
    document.location.replace('/editPost')
  }
  
  document
    $('.commentbutton').on('click', newPostHandler);
    $('.updateButton').on('click',switchToEdit);