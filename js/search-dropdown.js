// Get elements
const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

// Function to toggle the dropdown menu visibility
dropdownBtn.addEventListener('click', function() {
    dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
});

// Function to change the displayed category
function changeCategory(category) {
    const sections = document.querySelectorAll('.section');

    // Hide all sections
    sections.forEach(function(section) {
        section.style.display = 'none';
    });

    // Show the selected category
    if (category === 'all') {
        document.getElementById('desserts').style.display = 'block';
        document.getElementById('foods').style.display = 'block';
        document.getElementById('drinks').style.display = 'block';
    } else {
        document.getElementById(category).style.display = 'block';
    }

    // Close the dropdown menu after selection
    dropdownMenu.style.display = 'none';

    // Update button text
    dropdownBtn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
}

// Initial load: Show Desserts, Foods, and Drinks
document.getElementById('desserts').style.display = 'block';
document.getElementById('foods').style.display = 'block';
document.getElementById('drinks').style.display = 'block';



