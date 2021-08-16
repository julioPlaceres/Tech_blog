async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('input[name="post-content"]').value;
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    // edt post by id
  const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          title,
          post_content
      }),
      headers: {
          'Content-Type': 'application/json'
      }
    });
    
      // If data is okay render dashboard view with updated post
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);