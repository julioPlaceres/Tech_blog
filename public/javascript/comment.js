async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
console.log(comment_text);
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log(post_id);

  // If comment is not empty then fecth the post request
  if (comment_text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          post_id,
          comment_text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
        // If data is okay render dashboard view with new comments
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
    console.log(comment_text); 
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);