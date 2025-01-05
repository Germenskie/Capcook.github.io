document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const paymentModal = document.getElementById('payment-modal');
    const checkoutButton = document.getElementById('checkout-button');
    const placeOrderButton = document.getElementById('place-order-button');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const buyNowButtons = document.querySelectorAll('.buy-now');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const paymentForm = document.getElementById('payment-form');
    const paymentMethod = document.getElementById('payment-method');
    const cardDetails = document.getElementById('card-details');
    const onlinePaymentDetails = document.getElementById('online-payment-details');
    const codDetails = document.getElementById('cod-details');
    const notification = document.getElementById('notification');

    let cart = [];

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const product = button.closest('.modaldm');
            const name = product.querySelector('.title').textContent;
            const price = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
            const image = product.querySelector('.DMphoto img').src;
            addToCart({
                name: name,
                price: price,
                image: image
            });
        });
    });

    buyNowButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const product = button.closest('.modaldm');
            const name = product.querySelector('.title').textContent;
            showNotification(`You want to buy ${name}? You need to fill up the form first!`);
            paymentModal.style.display = 'block';
        });
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification("Your cart is empty!");
        } else {
            showNotification("You Need to Fill Up The Form First!");
            cartModal.style.display = 'none';
            paymentModal.style.display = 'block';
        }
    });

    paymentMethod.addEventListener('change', () => {
        cardDetails.style.display = 'none';
        onlinePaymentDetails.style.display = 'none';
        codDetails.style.display = 'none';

        switch(paymentMethod.value) {
            case 'card':
                cardDetails.style.display = 'flex';
                break;
            case 'online':
                onlinePaymentDetails.style.display = 'flex';
                break;
            case 'cod':
                codDetails.style.display = 'flex';
                break;
        }
    });

    placeOrderButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateForm()) {
            showNotification("Your Order has been Placed!");
            paymentModal.style.display = 'none';
            cart = [];
            updateCart();
            paymentForm.reset();
        }
    });

    function addToCart(product) {
        cart.push(product);
        updateCart();
        showNotification(`${product.name} added to cart!`);
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.style.display = 'contents';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 5px;">
                <span style="display: flex; align-items: center; width: 100%; height: 50px;">${item.name}</span>
                <span style="display: flex; align-items: center; width: 100%; height: 50px;">$${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
            `;
            cartItems.appendChild(itemElement);
            total += item.price;
        });
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    window.removeFromCart = function(index) {
        const removedItem = cart.splice(index, 1)[0];
        updateCart();
        showNotification(`${removedItem.name} removed from cart!`);
    }

    function validateForm() {
        let isValid = true;
        const paymentMethod = document.getElementById('payment-method').value;
        const requiredFields = ['full-name', 'phone-number', 'email', 'payment-method'];

        if (paymentMethod === 'card') {
            requiredFields.push('card-type', 'card-number', 'cvv', 'expiry-date');
        } else if (paymentMethod === 'online') {
            requiredFields.push('online-payment-type', 'account-name', 'account-number');
        } else if (paymentMethod === 'cod') {
            requiredFields.push('country', 'province', 'municipality', 'barangay', 'street');
        }

        requiredFields.forEach(field => {
            const element = document.getElementById(field);
            if (!element.value) {
                element.classList.add('error');
                isValid = false;
            } else {
                element.classList.remove('error');
            }
        });

        if (!isValid) {
            showNotification("Please fill in all required fields.");
        }

        return isValid;
    }

    // Address data
    const addressData = {
        usa: {
            provinces: ['California', 'New York', 'Texas'],
            municipalities: {
                California: ['Los Angeles', 'San Francisco', 'San Diego'],
                'New York': ['New York City', 'Buffalo', 'Albany'],
                Texas: ['Houston', 'Austin', 'Dallas']
            }
        },
        japan: {
            provinces: ['Tokyo', 'Osaka', 'Kyoto'],
            municipalities: {
                Tokyo: ['Shinjuku', 'Shibuya', 'Minato'],
                Osaka: ['Osaka City', 'Sakai', 'Higashiosaka'],
                Kyoto: ['Kyoto City', 'Uji', 'Kameoka']
            }
        },
        philippines: {
            provinces: ['Cebu', 'Bohol', 'Manila'],
            municipalities: {
                Cebu: ['Cebu City', 'Mandaue', 'Lapu-Lapu'],
                Bohol: ['Tagbilaran', 'Talibon', 'Trinidad', 'Jagna'],
                Manila: ['Manila City', 'Quezon City', 'Makati']
            },
            barangays: {
                Talibon: ['San Isidro', 'San Jose', 'Sto. Niño', 'Poblacion', 'Bagacay', 'Balintawak', 'Burgos', 'Cataban', 'Magsaysay', 'San Francisco', 'Sag', 'San Roque', 'Tanghaligue']
            }
        }
    };

    const countrySelect = document.getElementById('country');
    const provinceSelect = document.getElementById('province');
    const municipalitySelect = document.getElementById('municipality');
    const barangaySelect = document.getElementById('barangay');
    const streetSelect = document.getElementById('street');

    countrySelect.addEventListener('change', updateProvinces);
    provinceSelect.addEventListener('change', updateMunicipalities);
    municipalitySelect.addEventListener('change', updateBarangays);
    barangaySelect.addEventListener('change', updateStreets);

    function updateProvinces() {
        const country = countrySelect.value;
        provinceSelect.innerHTML = '<option value="">Select Province</option>';
        municipalitySelect.innerHTML = '<option value="">Select Municipality</option>';
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
        streetSelect.innerHTML = '<option value="">Select Street</option>';

        if (country in addressData) {
            addressData[country].provinces.forEach(province => {
                const option = document.createElement('option');
                option.value = province;
                option.textContent = province;
                provinceSelect.appendChild(option);
            });
        }
    }

    function updateMunicipalities() {
        const country = countrySelect.value;
        const province = provinceSelect.value;
        municipalitySelect.innerHTML = '<option value="">Select Municipality</option>';
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
        streetSelect.innerHTML = '<option value="">Select Street</option>';

        if (country in addressData && province in addressData[country].municipalities) {
            addressData[country].municipalities[province].forEach(municipality => {
                const option = document.createElement('option');
                option.value = municipality;
                option.textContent = municipality;
                municipalitySelect.appendChild(option);
            });
        }
    }

    function updateBarangays() {
        const country = countrySelect.value;
        const municipality = municipalitySelect.value;
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
        streetSelect.innerHTML = '<option value="">Select Street</option>';

        if (country === 'philippines' && municipality in addressData.philippines.barangays) {
            addressData.philippines.barangays[municipality].forEach(barangay => {
                const option = document.createElement('option');
                option.value = barangay;
                option.textContent = barangay;
                barangaySelect.appendChild(option);
            });
        }
    }

    function updateStreets() {
        streetSelect.innerHTML = '<option value="">Select Street</option>';
        for (let i = 1; i <= 8; i++) {
            const option = document.createElement('option');
            option.value = `Purok ${i}`;
            option.textContent = `Purok ${i}`;
            streetSelect.appendChild(option);
        }
    }
});

