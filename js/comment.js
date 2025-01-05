// Function to load comments from localStorage
function loadComments() {
    const commentsList = document.getElementById('commentsList');
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    commentsList.innerHTML = ''; // Clear the current list

    comments.forEach((comment, index) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
          <div class="comment-area">
            <div class="comment-info">
                <i class="fas fa-user"></i>
                <span>${comment.name}</span>
                <span class="badge"><i class="fa-solid fa-check"></i></span>
            </div>
            <div class="dd">
              <button class="dd-btn"><i class="fa-solid fa-ellipsis-vertical"></i></button>
              <div class="dd-content">
                <button class="delete-button" onclick="deleteComment(${index})"><i class="fa-solid fa-trash"></i> Delete</button>
              </div>
            </div>
            
          </div>
          <div class="comment-email">${comment.email}</div>
          <br>
          <div class="comment-desc" >${comment.text}</div>
        `;
        commentsList.appendChild(commentDiv);
    });
}

// Function to save a comment to localStorage
function saveComment(name, email, text) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({ name, email, text });
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Function to delete a comment
function deleteComment(index) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.splice(index, 1); // Remove the comment at the specified index
    localStorage.setItem('comments', JSON.stringify(comments)); // Update localStorage
    loadComments(); // Reload comments to reflect the changes
}

// Event listener for the submit button
document.getElementById('submitComment').addEventListener('click', function() {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const commentInput = document.getElementById('commentInput');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const commentText = commentInput.value.trim();

    if (name && email && commentText) {
        // Save the comment to localStorage
        saveComment(name, email, commentText);

        // Clear the inputs
        nameInput.value = '';
        emailInput.value = '';
        commentInput.value = '';

        // Reload comments to display the new one
        loadComments();
    } else {
        alert('Please fill in all fields before submitting.');
    }
});

// Load comments when the page is loaded
window.onload = loadComments;