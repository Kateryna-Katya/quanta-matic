document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Mobile Menu Toggle
  const burger = document.getElementById('burger');
  const nav = document.getElementById('main-nav');

  burger.addEventListener('click', () => {
      // Простая реализация для структуры, в будущем можно усложнить через GSAP
      nav.classList.toggle('nav--active');
      burger.classList.toggle('burger--active');
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
          header.style.padding = '12px 0';
          header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
      } else {
          header.style.padding = '20px 0';
          header.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
      }
  });
});