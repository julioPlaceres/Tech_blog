async function deleteFormHandler(event) {
  event.preventDefault();
  
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    // Delete Post by ID
  const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        post_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

      // If data is okay render dashboard view after deleting posts
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    } 
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);