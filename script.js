document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            const image = this.getAttribute('data-image');

            // Save item data to localStorage
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push({ name, price, image });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

          
            

            // Optionally, update the cart count in the navbar
            updateCartCount();
        });
    });

    function updateCartCount() {
        const cartCountElement = document.getElementById('count');
        if (cartCountElement) {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartCountElement.textContent = cartItems.length;
        }
    }

    // Initial cart count update
    updateCartCount();
});
