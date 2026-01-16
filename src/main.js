/**
 * Quanta-Matic | Core JavaScript 2026
 * Стек: GSAP, ScrollTrigger, SplitType, Swiper, Lucide
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ФИКС: Устранение ошибки "No checkout popup config found" ---
  // Создаем заглушку для внешних скриптов, чтобы избежать ошибок в консоли
  window.checkoutConfig = window.checkoutConfig || {};
  window.checkoutPopup = window.checkoutPopup || { config: {} };

  // --- 2. ИНИЦИАЛИЗАЦИЯ ИКОНОК ---
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // --- 3. РЕГИСТРАЦИЯ GSAP ПЛАГИНОВ ---
  gsap.registerPlugin(ScrollTrigger);

  // --- 4. МОБИЛЬНОЕ МЕНЮ (OVERLAY) ---
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-menu__link');

  const toggleMenu = () => {
      if (!burger || !mobileMenu) return;
      burger.classList.toggle('burger--active');
      mobileMenu.classList.toggle('mobile-menu--active');
      // Блокируем скролл основной страницы при открытом меню
      document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--active') ? 'hidden' : '';
  };

  if (burger) burger.addEventListener('click', toggleMenu);

  menuLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (mobileMenu && mobileMenu.classList.contains('mobile-menu--active')) toggleMenu();
      });
  });

  // --- 5. АНИМАЦИЯ HERO (SplitType + GSAP) ---
  const heroTitle = document.querySelector('.js-hero-title');
  if (heroTitle) {
      const split = new SplitType(heroTitle, { types: 'lines, words' });
      gsap.set(heroTitle, { visibility: 'visible' });

      const tlHero = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tlHero
          .to('.js-hero-badge', { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
          .from(split.words, {
              opacity: 0,
              y: 50,
              rotateX: -20,
              stagger: 0.05,
              duration: 0.8
          }, '-=0.4')
          .to('.js-hero-subtitle', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
          .to('.js-hero-actions', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6');

      // Параллакс эффект для цифровой сетки в фоне
      gsap.to('.hero__abstract', {
          scrollTrigger: {
              trigger: '#hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true
          },
          y: 200,
          rotateX: 75
      });
  }

  // --- 6. АДАПТИВНЫЙ SWIPER (ИННОВАЦИИ) ---
  // На мобильных слайдер уничтожается, чтобы карточки шли столбиком (CSS control)
  let innovationSwiper;

  function handleSwiper() {
      const sliderContainer = document.querySelector('.innovationSwiper');
      if (!sliderContainer) return;

      if (window.innerWidth >= 768) {
          // Инициализация для десктопа
          if (!innovationSwiper) {
              innovationSwiper = new Swiper('.innovationSwiper', {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  loop: true,
                  navigation: {
                      nextEl: '.next',
                      prevEl: '.prev',
                  },
              });
          }
      } else {
          // Полное уничтожение для мобильных (очистка инлайновых стилей Swiper)
          if (innovationSwiper) {
              innovationSwiper.destroy(true, true);
              innovationSwiper = undefined;
          }
      }
  }

  handleSwiper();
  window.addEventListener('resize', handleSwiper);

  // --- 7. УНИВЕРСАЛЬНАЯ АНИМАЦИЯ ПРИ СКРОЛЛЕ (REVEAL) ---
  const revealElements = document.querySelectorAll('.js-reveal');
  revealElements.forEach((el) => {
      gsap.from(el, {
          scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out'
      });
  });

  // --- 8. ФОРМА КОНТАКТОВ + КАПЧА ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      const phoneInput = document.getElementById('phone');
      const captchaLabel = document.getElementById('captcha-question');
      const captchaInput = document.getElementById('captcha-answer');

      // Генерация математического примера
      let n1 = Math.floor(Math.random() * 10) + 1;
      let n2 = Math.floor(Math.random() * 10) + 1;
      let sum = n1 + n2;
      if (captchaLabel) captchaLabel.innerText = `${n1} + ${n2}`;

      // Валидация телефона (удаляем всё кроме цифр)
      if (phoneInput) {
          phoneInput.addEventListener('input', (e) => {
              e.target.value = e.target.value.replace(/\D/g, '');
          });
      }

      // Сабмит формы
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();

          if (parseInt(captchaInput.value) !== sum) {
              alert('Неверный ответ капчи! Пожалуйста, решите пример.');
              return;
          }

          const btn = contactForm.querySelector('.form__submit');
          btn.innerHTML = 'Отправка данных...';
          btn.disabled = true;

          // Симуляция AJAX запроса
          setTimeout(() => {
              gsap.to(contactForm, {
                  opacity: 0,
                  y: -20,
                  duration: 0.5,
                  onComplete: () => {
                      contactForm.style.display = 'none';
                      const success = document.getElementById('success-message');
                      if (success) {
                          success.style.display = 'flex';
                          gsap.from(success, { opacity: 0, y: 20, duration: 0.5 });
                      }
                  }
              });
          }, 1500);
      });
  }

  // --- 9. COOKIE POPUP ---
  const cookiePopup = document.getElementById('cookie-popup');
  const cookieBtn = document.getElementById('cookie-accept');

  if (cookiePopup && !localStorage.getItem('quanta_cookies_accepted')) {
      setTimeout(() => {
          cookiePopup.classList.add('cookie-popup--active');
      }, 3000); // Показываем через 3 секунды
  }

  if (cookieBtn) {
      cookieBtn.addEventListener('click', () => {
          localStorage.setItem('quanta_cookies_accepted', 'true');
          cookiePopup.classList.remove('cookie-popup--active');
      });
  }

  // --- 10. ЭФФЕКТ СКРОЛЛА ДЛЯ ХЕДЕРА ---
  window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (!header) return;

      if (window.scrollY > 60) {
          header.style.padding = '12px 0';
          header.style.background = 'rgba(10, 10, 10, 0.98)';
          header.style.borderBottom = '1px solid rgba(255, 77, 0, 0.4)';
      } else {
          header.style.padding = '20px 0';
          header.style.background = 'rgba(10, 10, 10, 0.8)';
          header.style.borderBottom = '1px solid rgba(255, 77, 0, 0.1)';
      }
  });
});