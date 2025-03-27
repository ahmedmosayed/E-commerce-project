// بيانات المنتجات
const products = {
  all: [
    { id: 1, name: "Samsung Phone", price: 5000, color: "black", brand: "samsung", storage: "64", category: "phones", description: "High-end smartphone with great features.", image: "../../assets/images/samsung-phone.jpg", stock: 10 },
    { id: 2, name: "Apple Phone", price: 10000, color: "white", brand: "apple", storage: "128", category: "phones", description: "Premium smartphone from Apple.", image: "../../assets/images/apple-phone.jpg", stock: 5 },
    { id: 3, name: "Huawei Phone", price: 4000, color: "gold", brand: "huawei", storage: "256", category: "phones", description: "Excellent smartphone from Huawei.", image: "../../assets/images/huawei-phone.jpg", stock: 10 },
    { id: 4, name: "Samsung Headphones", price: 500, color: "black", brand: "samsung", category: "accessories", description: "Wireless headphones from Samsung.", image: "../../assets/images/samsung-headphones.jpg", stock: 8 },
    { id: 5, name: "Apple Charger", price: 300, color: "white", brand: "apple", category: "accessories", description: "Fast charger from Apple.", image: "../../assets/images/apple-charger.jpg", stock: 14 },
    { id: 6, name: "Samsung Watch", price: 2000, color: "black", brand: "samsung", category: "watches", description: "Smartwatch from Samsung.", image: "../../assets/images/samsung-watch.jpg", stock: 20 },
    { id: 7, name: "Apple Watch", price: 3000, color: "white", brand: "apple", category: "watches", description: "Smartwatch from Apple.", image: "../../assets/images/apple-watch.jpg", stock: 3 }
  ],
  phones: [
    { id: 1, name: "Samsung Phone", price: 5000, color: "black", brand: "samsung", storage: "64", description: "High-end smartphone with great features.", image: "../../assets/images/samsung-phone.jpg" },
    { id: 2, name: "Apple Phone", price: 10000, color: "white", brand: "apple", storage: "128", description: "Premium smartphone from Apple.", image: "../../assets/images/apple-phone.jpg" },
    { id: 3, name: "Huawei Phone", price: 4000, color: "gold", brand: "huawei", storage: "256", description: "Excellent smartphone from Huawei.", image: "../../assets/images/huawei-phone.jpg" }
  ],
  accessories: [
    { id: 4, name: "Samsung Headphones", price: 500, color: "black", brand: "samsung", description: "Wireless headphones from Samsung.", image: "../../assets/images/samsung-headphones.jpg" },
    { id: 5, name: "Apple Charger", price: 300, color: "white", brand: "apple", description: "Fast charger from Apple.", image: "../../assets/images/apple-charger.jpg" }
  ],
  watches: [
    { id: 6, name: "Samsung Watch", price: 2000, color: "black", brand: "samsung", description: "Smartwatch from Samsung.", image: "../../assets/images/samsung-watch.jpg" },
    { id: 7, name: "Apple Watch", price: 3000, color: "white", brand: "apple", description: "Smartwatch from Apple.", image: "../../assets/images/apple-watch.jpg" }
  ]
};

// عداد العربة
let cartCount = 0;
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// عداد قائمة الأمنيات
let wishlistCount = 0;
let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

// عرض المنتجات حسب الفئة
function showCategory(category) {
  const productsList = document.getElementById('products-list');
  if (!productsList) {
    console.error('Element products-list not found.');
    return;
  }

  productsList.innerHTML = '';
  const productsToShow = category === 'all' ? products.all : products[category];
  productsToShow.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onclick="openProductPage(${product.id})">
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <p class="description">${product.description}</p>
      <p>In Stock: ${product.stock}</p>
      <div class="actions">
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="openProductPage(${product.id})">Details</button>
        <button onclick="addToWishlist(${product.id})"><i class="fas fa-heart"></i></button>
      </div>
    `;
    productsList.appendChild(productCard);
  });

  const categoryTitle = document.getElementById('category-title');
  if (categoryTitle) {
    categoryTitle.textContent = category === 'all' ? 'All Products' : category === 'phones' ? 'Phones' : category === 'accessories' ? 'Accessories' : 'Watches';
  }
}

// إضافة منتج إلى العربة
function addToCart(productId) {
  const product = products.all.find(p => p.id === productId);
  const quantityInput = document.getElementById(`qty-${productId}`);
  const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

  if (!product) return;

  // التحقق من توفر الكمية في المخزون
  if (quantity > product.stock) {
    showToast(`Only ${product.stock} items available in stock`);
    return;
  }

  const existingItem = cartItems.find(item => item.id === productId);
  
  if (existingItem) {
    const newQty = existingItem.quantity + quantity;
    if (newQty > product.stock) {
      showToast(`Cannot add more than available stock (${product.stock})`);
      return;
    }
    existingItem.quantity = newQty;
  } else {
    cartItems.push({ ...product, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartCount();
  showToast(`Added ${product.name} to cart`);
}

// إضافة منتج إلى قائمة الأمنيات
function addToWishlist(productId) {
  const product = products.all.find(p => p.id === productId);
  if (product && !wishlistItems.some(item => item.id === productId)) {
    wishlistItems.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    wishlistCount++;
    document.getElementById('wishlist-count').textContent = wishlistCount;
    showToast(`Added ${product.name} to wishlist`);
  } else {
    showToast(`${product.name} is already in the wishlist`);
  }
}

// عرض المنتجات في قائمة الأمنيات
function displayWishlistItems() {
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistContainer = document.getElementById('wishlist-items');
  wishlistContainer.innerHTML = '';

  if (wishlistItems.length === 0) {
    wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
    return;
  }

  wishlistItems.forEach(item => {
    const wishlistItem = document.createElement('div');
    wishlistItem.className = 'wishlist-item';
    wishlistItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
      <button onclick="removeFromWishlist(${item.id})">Remove</button>
      <button onclick="moveToCart(${item.id})">Move to Cart</button>
    `;
    wishlistContainer.appendChild(wishlistItem);
  });
}

// نقل المنتج من قائمة الأمنيات إلى السلة
function moveToCart(productId) {
  const product = products.all.find(p => p.id === productId);
  if (product && !cartItems.some(item => item.id === productId)) {
    cartItems.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cartItems));
    removeFromWishlist(productId);
    showToast(`Moved ${product.name} to cart`);
  } else {
    showToast(`${product.name} is already in the cart`);
  }
}

// إزالة منتج من قائمة الأمنيات
function removeFromWishlist(productId) {
  let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlistItems = wishlistItems.filter(item => item.id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  displayWishlistItems();
  updateWishlistCount();
  showToast('Product removed from wishlist');
}

// تحديث عداد قائمة الأمنيات
function updateWishlistCount() {
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
  document.getElementById('wishlist-count').textContent = wishlistItems.length;
}

// البحث عن المنتجات
function searchProducts() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const filteredProducts = products.all.filter(product => 
    product.name.toLowerCase().includes(searchTerm)
  );
  const productsList = document.getElementById('products-list');
  if (!productsList) {
    console.error('Element products-list not found.');
    return;
  }

  productsList.innerHTML = '';
  if (filteredProducts.length === 0) {
    productsList.innerHTML = '<p>No products found matching your search.</p>';
    return;
  }

  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onclick="openProductPage(${product.id})">
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <p class="description">${product.description}</p>
      <div class="actions">
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="openProductPage(${product.id})">Details</button>
        <button onclick="addToWishlist(${product.id})"><i class="fas fa-heart"></i></button>
      </div>
    `;
    productsList.appendChild(productCard);
  });
}

// تفعيل البحث عند الضغط على Enter
document.getElementById('search-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchProducts();
  }
});

// تطبيق الفلاتر
function applyFilters() {
  const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
  const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
  const selectedColors = Array.from(document.querySelectorAll('input[type="checkbox"][id^="color-"]:checked')).map(cb => cb.value);
  const selectedBrands = Array.from(document.querySelectorAll('input[type="checkbox"][id^="brand-"]:checked')).map(cb => cb.value);
  const selectedStorages = Array.from(document.querySelectorAll('input[type="checkbox"][id^="storage-"]:checked')).map(cb => cb.value);

  const filteredProducts = products.all.filter(product => 
    product.price >= minPrice && product.price <= maxPrice &&
    (selectedColors.length === 0 || selectedColors.includes(product.color)) &&
    (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
    (selectedStorages.length === 0 || (product.storage && selectedStorages.includes(product.storage)))
  );

  const productsList = document.getElementById('products-list');
  if (!productsList) {
    console.error('Element products-list not found.');
    return;
  }

  productsList.innerHTML = '';

  if (filteredProducts.length === 0) {
    productsList.innerHTML = '<p>No products found matching your filters.</p>';
    return;
  }

  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onclick="openProductPage(${product.id})">
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <p class="description">${product.description}</p>
      <div class="actions">
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="openProductPage(${product.id})">Details</button>
        <button onclick="addToWishlist(${product.id})"><i class="fas fa-heart"></i></button>
      </div>
    `;
    productsList.appendChild(productCard);
  });
}

// إعادة تعيين الفلاتر
function resetFilters() {
  document.getElementById('min-price').value = '';
  document.getElementById('max-price').value = '';
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
  showCategory('all');
}

// ترتيب المنتجات
function sortProducts() {
  const sortBy = document.getElementById('sort-by').value;
  const productsList = document.getElementById('products-list');
  if (!productsList) {
    console.error('Element products-list not found.');
    return;
  }

  const productsToSort = Array.from(productsList.children);

  productsToSort.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('p').textContent.replace('Price: $', ''));
    const priceB = parseFloat(b.querySelector('p').textContent.replace('Price: $', ''));
    const nameA = a.querySelector('h3').textContent;
    const nameB = b.querySelector('h3').textContent;

    if (sortBy === 'price-high-to-low') {
      return priceB - priceA;
    } else if (sortBy === 'price-low-to-high') {
      return priceA - priceB;
    } else if (sortBy === 'name-a-to-z') {
      return nameA.localeCompare(nameB);
    } else {
      return 0;
    }
  });

  productsList.innerHTML = '';
  productsToSort.forEach(product => productsList.appendChild(product));
}

// طي أو فتح خيارات الفلتر
function toggleFilter(filterType) {
  const options = document.getElementById(`${filterType}-options`);
  const arrow = document.getElementById(`${filterType}-arrow`);
  if (options && arrow) {
    if (options.style.display === 'none' || options.style.display === '') {
      options.style.display = 'block';
      arrow.style.transform = 'rotate(180deg)';
    } else {
      options.style.display = 'none';
      arrow.style.transform = 'rotate(0deg)';
    }
  }
}

// فتح صفحة المنتج
function openProductPage(productId) {
  window.location.href = `product.html?id=${productId}`;
}

// عرض تفاصيل المنتج
function displayProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    console.error('Product ID not found in URL.');
    return;
  }

  const product = products.all.find(p => p.id === parseInt(productId));

  if (!product) {
    console.error('Product not found.');
    return;
  }

  const productDetails = document.getElementById('product-details');
  if (!productDetails) {
    console.error('Element product-details not found.');
    return;
  }

  productDetails.innerHTML = `
    <div class="product-detail-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <p class="description">${product.description}</p>
      <p>In Stock: ${product.stock}</p>
      <div class="actions">
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="addToWishlist(${product.id})"><i class="fas fa-heart"></i></button>
      </div>
    </div>
  `;
}

// عرض رسالة تأكيد
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// تحديث عداد العربة
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').textContent = cartItems.length;
  document.getElementById('nav-cart-count').textContent = cartItems.length;
}

// عرض المنتجات في السلة
function displayCartItems() {
  const cartContainer = document.getElementById('cart-items');
  if (!cartContainer) return;

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartContainer.innerHTML = '';

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
      <div class="quantity-controls">
        <button onclick="decreaseQuantity(${item.id})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${item.id})">+</button>
      </div>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartContainer.appendChild(cartItem);
  });
}

// زيادة كمية المنتج في السلة
function increaseQuantity(productId) {
  const product = cartItems.find(item => item.id === productId);
  if (product) {
    product.quantity++;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
  }
}

// تقليل كمية المنتج في السلة
function decreaseQuantity(productId) {
  const product = cartItems.find(item => item.id === productId);
  if (product && product.quantity > 1) {
    product.quantity--;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
  }
}

// إزالة منتج من السلة
function removeFromCart(productId) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems = cartItems.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  displayCartItems();
  updateCartCount();
  showToast('Product removed from cart');
}

// تفريغ السلة
function clearCart() {
  localStorage.removeItem('cart');
  displayCartItems();
  updateCartCount();
  showToast('Cart cleared');
}

// دالة التحقق من تسجيل الدخول
function isLoggedIn() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  return user !== null && user !== undefined;
}

// دالة التحقق من صحة رقم الهاتف
function isValidPhone(phone) {
  const regex = /^01[0-2|5]{1}[0-9]{8}$/;
  return regex.test(phone);
}

// إتمام طلب الشراء
function placeOrder(event) {
  event.preventDefault();

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  if (cartItems.length === 0) {
    showToast('Your cart is empty. Cannot place order');
    return;
  }

  // التحقق من تسجيل الدخول
  if (!isLoggedIn()) {
    showToast('Please login to complete your order');
    window.location.href = '../../pages/auth/login.html';
    return;
  }

  // جمع بيانات النموذج
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const payment = document.getElementById('payment').value;
  const notes = document.getElementById('notes')?.value.trim() || '';

  // التحقق من صحة البيانات
  if (!name || !phone || !address || !payment) {
    showToast('Please fill all required fields');
    return;
  }

  // التحقق من صحة رقم الهاتف
  if (!isValidPhone(phone)) {
    showToast('Invalid phone number. Must be 11 digits starting with 01');
    return;
  }

  // إنشاء كائن الطلب
  const order = {
    id: Date.now(),
    userId: JSON.parse(localStorage.getItem('loggedInUser')).id,
    customerName: name,
    phone,
    address,
    paymentMethod: payment,
    notes,
    items: JSON.parse(localStorage.getItem('cart')) || [],
    status: 'pending',
    date: new Date().toISOString(),
    total: calculateOrderTotal()
  };

  // حفظ الطلب
  saveOrder(order);
  
  // إفراغ السلة وتحديث العدادات
  localStorage.removeItem('cart');
  updateCartCount();
  
  // توجيه المستخدم إلى صفحة الطلبات
  showToast('Order placed successfully! It is now pending approval');
  setTimeout(() => {
    window.location.href = '../../pages/customer/orders.html';
  }, 1500);
}

// دالة حساب المجموع الكلي للطلب
function calculateOrderTotal() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// دالة حفظ الطلب في localStorage
function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
}

// عرض الطلبات السابقة
function displayOrders() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) return;

  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const userOrders = orders.filter(order => order.userId === user.id);
  const ordersContainer = document.getElementById('orders-list');
  
  if (!ordersContainer) return;
  
  ordersContainer.innerHTML = '';

  if (userOrders.length === 0) {
    ordersContainer.innerHTML = '<p>You have no previous orders.</p>';
    return;
  }

  userOrders.forEach(order => {
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    orderItem.innerHTML = `
      <div class="order-header">
        <h3>Order #${order.id}</h3>
        <span class="status-badge ${order.status}">${order.status}</span>
      </div>
      <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      <button onclick="viewOrderDetails(${order.id})">View Details</button>
    `;
    ordersContainer.appendChild(orderItem);
  });
}

// التحقق من تسجيل الدخول عند زيارة صفحة الطلبات
function checkAuthForOrders() {
  if (window.location.pathname.includes('orders.html')) {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const authMessage = document.getElementById('auth-message');
    const ordersContent = document.getElementById('orders-content');
    
    if (!user) {
      authMessage.style.display = 'block';
      ordersContent.style.display = 'none';
      return false;
    } else {
      authMessage.style.display = 'none';
      ordersContent.style.display = 'block';
      return true;
    }
  }
  return true;
}

// تحديث حالة زر Login/Logout
function updateAuthButton() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const authButton = document.getElementById('login-nav-link');
  
  if (authButton) {
    if (user) {
      authButton.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
      authButton.onclick = logoutUser;
    } else {
      authButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
      authButton.onclick = function() {
        window.location.href = '../../pages/auth/login.html';
      };
    }
  }
}

// دالة تسجيل الخروج
function logoutUser() {
  localStorage.removeItem('loggedInUser');
  showToast('Logged out successfully');
  updateAuthButton();
  updateNavCounters();
  
  // إذا كانت الصفحة الحالية تحتاج تسجيل دخول، نوجه إلى صفحة Login
  const protectedPages = ['orders.html', 'checkout.html', 'account.html'];
  const currentPage = window.location.pathname.split('/').pop();
  
  if (protectedPages.includes(currentPage)) {
    window.location.href = '../../pages/auth/login.html';
  }
}

// تحديث العدادات في شريط التنقل
function updateNavCounters() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  document.getElementById('nav-cart-count').textContent = cartItems.length;
  document.getElementById('nav-wishlist-count').textContent = wishlistItems.length;
}

// عرض تفاصيل الطلب
function viewOrderDetails(orderId) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    showToast('Order not found');
    return;
  }

  // يمكنك تنفيذ عرض تفاصيل الطلب في modal أو صفحة منفصلة
  alert(`Order Details:\nID: ${order.id}\nStatus: ${order.status}\nTotal: $${order.total}\nItems: ${order.items.length}`);
}

// تحميل الأكواد عند بدء التشغيل
document.addEventListener('DOMContentLoaded', () => {
  // تحميل المحتوى حسب الصفحة الحالية
  if (window.location.pathname.includes('index.html')) {
    showCategory('all');
  }
  if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
  }
  if (window.location.pathname.includes('wishlist.html')) {
    displayWishlistItems();
  }
  if (window.location.pathname.includes('product.html')) {
    displayProductDetails();
  }
  if (window.location.pathname.includes('orders.html')) {
    checkAuthForOrders();
    displayOrders();
  }
  if (window.location.pathname.includes('checkout.html')) {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', placeOrder);
    }
  }

  // تحديث العناصر المشتركة
  updateCartCount();
  updateWishlistCount();
  updateAuthButton();
  updateNavCounters();
});

function proceedToCheckout() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cartItems.length === 0) {
    showToast('Your cart is empty. Add products before checkout');
    return;
  }
  
  if (isLoggedIn()) {
    window.location.href = '../../pages/customer/checkout.html';
  } else {
    showToast('Please login first to complete your purchase');
    window.location.href = '../../pages/auth/login.html?redirect=checkout';
  }
}

// إضافة Event Listener لزر Checkout
document.addEventListener('DOMContentLoaded', () => {
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      proceedToCheckout();
    });
  }
});
