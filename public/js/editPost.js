const postId = $('#postid').val();

const editFormHandler = async function(event) {
  event.preventDefault();

  const title = $('#postitle').val();
  const body = $('#postbody').val();

  await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/dashboard');
};

const deleteClickHandler = async function() {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

$('#updatebutton').on('submit', editFormHandler);
$('#deletebutton').on('click', deleteClickHandler);