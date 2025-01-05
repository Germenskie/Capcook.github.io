
/* Search Section */
const products = [
    "Sweet CupCake", "Banoffee Dessert Cake", "Ice Cream Sandwich Cake", "Lemon Panna Cotta",
    "Cupcake Brownie Sliders", "Nutella Burger", "Piri-piri chicken", "Fish Soup-Cook",
    "Broccoli Stem Falafel Bowl", "Potato, Leek & Chorizo Soup", "Pan-grilled Liempo",
    "Bagnet Kari-Kari", "BEER", "Coke", "Heineken", "Cocktail", "Diabolo Grenadine", "Tequila Sunrise Cocktail"
];

const searchBar = document.getElementById("search-bar");
const suggestionsDiv = document.getElementById("suggestions");
const productList = document.getElementById("product-list");

// Sort products alphabetically
products.sort();

// Function to show all products
function showAllProducts() {
    const allProducts = document.querySelectorAll('.dessert-section');
    allProducts.forEach(product => {
        product.style.display = 'block'; // Display all products
    });
}

// Handle the search bar input
searchBar.addEventListener("input", function() {
    const query = searchBar.value.toLowerCase();
    suggestionsDiv.innerHTML = ''; // Clear previous suggestions
    if (query) {
        const filteredProducts = products.filter(product => product.toLowerCase().includes(query));
        filteredProducts.forEach(product => {
            const suggestionItem = document.createElement("div");
            suggestionItem.textContent = product;
            suggestionItem.addEventListener("click", function() {
                searchBar.value = product;
                showProduct(product);
                suggestionsDiv.innerHTML = ''; // Clear suggestions when a product is selected
            });
            suggestionsDiv.appendChild(suggestionItem);
        });
    } else {
        // If the input is cleared, show all products again
        showAllProducts();
    }
});

// Show product based on search
function showProduct(productName) {
    // Hide all products
    const allProducts = document.querySelectorAll('.dessert-section');
    allProducts.forEach(product => {
        product.style.display = 'none';
    });

    // Show the selected product
    const selectedProduct = Array.from(allProducts).find(product =>
        product.querySelector('.product').getAttribute('data-name') === productName
    );

    if (selectedProduct) {
        selectedProduct.style.display = 'block';
    }
}

// Additional check: when the input is cleared (no text), show all products
searchBar.addEventListener("focus", function() {
    if (searchBar.value === "") {
        showAllProducts();
    }
});
