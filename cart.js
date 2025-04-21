document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-items');
    const clearCartButton = document.getElementById('clear-cart');
    const paymentButton = document.getElementById('payment-button');
    const totalItemsElement = document.getElementById('total-items');
    const totalBillElement = document.getElementById('total-bill');

    // Function to clear cart
    function clearCart() {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartCount');
        if (cartContainer) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        }
        if (totalItemsElement) totalItemsElement.textContent = '0';
        if (totalBillElement) totalBillElement.textContent = '₹0.00';
        updateCartCount();
    }

    // Function to initialize the cart
    function initializeCart() {
        const isFirstVisit = localStorage.getItem('isFirstVisit');
        
        if (!isFirstVisit) {
            // First-time visit
            clearCart(); // Clear the cart for new users
            localStorage.setItem('isFirstVisit', 'true'); // Mark user as not new anymore
        } else {
            // Returning user
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            let totalPrice = 0;
            let itemCount = 0;

            if (cartItems.length === 0) {
                cartContainer.innerHTML = '<p>Your cart is empty.</p>';
                if (totalItemsElement) totalItemsElement.textContent = '0';
                if (totalBillElement) totalBillElement.textContent = '₹0.00';
                return;
            }

            cartItems.forEach(item => {
                if (item.image && item.name && item.price) {
                    totalPrice += parseFloat(item.price);
                    itemCount++;

                    const div = document.createElement('div');
                    div.className = 'col-12 col-md-6 col-lg-4 mb-4';

                    div.innerHTML = `
                        <div class="card">
                            <img src="${item.image}" class="card-img-top" alt="${item.name}">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">Price: ₹${item.price}</p>
                                <button class="btn btn-danger btn-sm remove-item" data-index="${itemCount - 1}">Remove</button>
                            </div>
                        </div>
                    `;

                    cartContainer.appendChild(div);
                } else {
                    console.warn('Item is missing some properties:', item);
                }
            });

            // Display total items and total bill
            if (totalItemsElement) totalItemsElement.textContent = itemCount;
            if (totalBillElement) totalBillElement.textContent = `₹${totalPrice.toFixed(2)}`;
        }
        
        updateCartCount();
    }

    // Function to update cart count in the navbar or other pages
    function updateCartCount() {
        const cartCountElement = document.getElementById('count');
        if (cartCountElement) {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartCountElement.textContent = cartItems.length;
        }
    }

    // Handle Clear Cart button click
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function() {
            clearCart(); // Clear the cart when the button is clicked
        });
    }

    // Handle Remove button clicks
    if (cartContainer) {
        cartContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-item')) {
                const index = event.target.getAttribute('data-index');
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                cartItems.splice(index, 1); // Remove the item from the array

                // Update localStorage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));

                // Refresh the page to update cart display
                window.location.reload();
            }
        });
    }
 
  // Handle Payments button click
  if (paymentButton) {
    paymentButton.addEventListener('click', function() {
         // Get the total bill from the cart
         const totalBill = totalBillElement.textContent.replace('₹', '').replace(',', '');
         // Open a new tab with the payment form
         window.open(`payment.html?totalBill=${encodeURIComponent(totalBill)}`, '_blank');

       // alert('Proceeding to payments.'); // Implement payment functionality here
    });
}
    // Initialize cart based on user visit status
    initializeCart();
});
