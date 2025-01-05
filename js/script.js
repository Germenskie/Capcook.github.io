const togglepassword = document.querySelector('#togglepassword');
const password = document.querySelector('#password');

togglepassword.addEventListener('click', function(c) {
  const type = password.getAttribute("type") === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);

  this.classList.toggle('fa-eye');
});



/* Carousel */

$(document).ready(function(){
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});



/* Post Comments */

document.getElementById('submitComment').addEventListener('click', function() {
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const commentInput = document.getElementById('commentInput');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const commentText = commentInput.value.trim();

  if (name && email && commentText) {
    const commentsList = document.getElementById('commentsList');

    // Create a new comment element
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');

    // Create the content for the comment
    commentDiv.innerHTML = `
            <div class="comment-info">
                <i class="fas fa-user"></i>
                <span>${name}</span>
                <span class="badge">✓</span>
            </div>
            <div class="comment-email">${email}</div><br>
            <div class="comment-desc">${commentText}</div>
        `;

    // Append the new comment to the comments list
    commentsList.appendChild(commentDiv);

    // Clear the inputs
    nameInput.value = '';
    emailInput.value = '@';
    commentInput.value = '';
  } else {
    alert('Please fill in all fields before submitting.');
  }
});