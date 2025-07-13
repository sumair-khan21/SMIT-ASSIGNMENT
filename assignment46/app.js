// const toggle = document.getElementById('menu-toggle');
// const mobileMenu = document.getElementById('mobile-menu');

// toggle.onclick = () => {
//     mobileMenu.classList.toggle('active');
// };
// NAVBAR TOGGLE FUNCTIONALITY END






// SLIDER FUNCTIONALITY START

// document.addEventListener('DOMContentLoaded', () => {
//   const slides = document.querySelectorAll('.slide');
//   const indicators = document.querySelectorAll('.indicator');
//   const prevBtn = document.getElementById('prevBtn');
//   const nextBtn = document.getElementById('nextBtn');
//   let current = 0;
//   const total = slides.length;

//   slides.forEach(slide => {
//     const bg = slide.getAttribute('data-bg');
//     slide.style.backgroundImage = `url(${bg})`;
//     slide.style.backgroundSize = 'cover';
//     slide.style.backgroundPosition = 'center';
//   });

//   function showSlide(index) {
//     slides.forEach((s, i) => s.classList.toggle('active', i === index));
//     indicators.forEach((dot, i) => dot.classList.toggle('active', i === index));
//     current = index;
//   }

//   nextBtn.onclick = () => showSlide((current + 1) % total);
//   prevBtn.onclick = () => showSlide((current - 1 + total) % total);
//   indicators.forEach((dot, i) => dot.onclick = () => showSlide(i));

//   setInterval(() => {
//     showSlide((current + 1) % total);
//   }, 5000);
// });
// SLIDER FUNCTIONALITY END



// PRODUCT LIST FUNCTIONALITY START

fetch('https://dummyjson.com/products/category/womens-dresses')
  .then(res => res.json())
  .then(data => {
    const productsList = document.getElementById('products-list');
    data.products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.className = 'product-item';
      productItem.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <div class="product-details">
          <h3>${product.title}</h3>
          <p>${product.description.slice(0, 80)}...</p>
          <div class="price">$${product.price}</div>
          <button class="add-to-cart">Add to Cart</button>
        </div>
      `;
      productsList.appendChild(productItem);
    });
  });
