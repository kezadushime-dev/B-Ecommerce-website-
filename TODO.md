# TODO: Connect Cart and Order to API

## Tasks

- [x] Update CartContext.tsx to make API call in addToCart function to POST to /cart endpoint
- [x] Update cart.tsx page to display cart items from context instead of static empty message
- [x] Fix API baseURL to use '/api' as baseURL to go through Vite proxy to localhost:3000
- [x] Add placeOrder function to CartContext to POST to /api/order
- [x] Update cart.tsx Checkout button to call placeOrder
- [x] Fetch cart from API on component mount
- [x] Update removeFromCart, updateQuantity, clearCart to interact with API
- [x] Test adding a product to cart and verify API call
- [x] Test placing an order and verify API call
- [x] Add toast notification when adding product to cart
