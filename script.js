document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav__link");

  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("nav--active");
    burger.classList.toggle("burger--active");
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove("nav--active");
      burger.classList.remove("burger--active");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav--active");
      burger.classList.remove("burger--active");
    });
  });
});





document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  if (slider && prevButton && nextButton) {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Определяем количество видимых слайдов в зависимости от ширины экрана
    function getVisibleSlides() {
      return window.innerWidth <= 768 ? 1 : 2;
    }

    // Функция для показа слайда
    function showSlide(index) {
      const visibleSlides = getVisibleSlides(); // Количество видимых слайдов
      const offset = -index * (100 / visibleSlides); // Расчёт смещения
      slider.style.transform = `translateX(${offset}%)`;
    }

    // Функция для перехода к следующему слайду
    function nextSlide() {
      const visibleSlides = getVisibleSlides();
      const maxIndex = Math.ceil(totalSlides / visibleSlides) - 1;
      currentIndex = (currentIndex + 1) % (maxIndex + 1);
      showSlide(currentIndex);
    }

    // Функция для перехода к предыдущему слайду
    function prevSlide() {
      const visibleSlides = getVisibleSlides();
      const maxIndex = Math.ceil(totalSlides / visibleSlides) - 1;
      currentIndex = (currentIndex - 1 + (maxIndex + 1)) % (maxIndex + 1);
      showSlide(currentIndex);
    }

    // Автоматическое перелистывание
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000); // Перелистывание каждые 5 секунд
    }

    // Остановка автоматического перелистывания
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Запуск автоматического перелистывания
    startAutoSlide();

    // Остановка автоматического перелистывания при наведении на слайдер
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Назначение обработчиков на кнопки
    prevButton.addEventListener('click', () => {
      prevSlide();
      stopAutoSlide(); // Останавливаем автослайд при ручном переключении
      startAutoSlide(); // Перезапускаем автослайд через 5 секунд
    });

    nextButton.addEventListener('click', () => {
      nextSlide();
      stopAutoSlide(); // Останавливаем автослайд при ручном переключении
      startAutoSlide(); // Перезапускаем автослайд через 5 секунд
    });

    // Обновляем слайдер при изменении размера экрана
    window.addEventListener('resize', () => {
      showSlide(currentIndex);
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // Открытие модального окна
  const buttons = document.querySelectorAll(".blog-post__button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
      }
    });
  });

  // Закрытие модального окна
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    const closeButton = modal.querySelector(".modal__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }

    // Закрытие при клике вне модального окна
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", function () {
      // Закрываем все открытые вопросы
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Открываем/закрываем текущий вопрос
      item.classList.toggle("active");
    });
  });
});

// Age Verification Modal
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page
    const isIndexPage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.endsWith('/') ||
                       window.location.pathname.split('/').pop() === '';

    console.log('Current path:', window.location.pathname);
    console.log('Is index page:', isIndexPage);

    if (!isIndexPage) {
        console.log('Not on index page, skipping age verification');
        return;
    }

    const ageModal = document.getElementById('ageModal');
    const confirmButton = document.getElementById('ageConfirm');
    const denyButton = document.getElementById('ageDeny');
    
    console.log('Age Modal found:', !!ageModal);
    console.log('Confirm button found:', !!confirmButton);
    console.log('Deny button found:', !!denyButton);
    
    // Check if user has already verified age
    const isAgeVerified = localStorage.getItem('ageVerified');
    console.log('Age already verified:', isAgeVerified);
    
    if (!isAgeVerified) {
        console.log('Showing age verification modal');
        ageModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
    
    if (confirmButton) {
        confirmButton.addEventListener('click', function() {
            console.log('Age confirmed');
            localStorage.setItem('ageVerified', 'true');
            ageModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    if (denyButton) {
        denyButton.addEventListener('click', function() {
            console.log('Age denied, redirecting');
            window.location.href = 'https://www.google.com'; // Redirect to Google if under 18
        });
    }
});

// Prevent closing modal by clicking outside
document.addEventListener('click', function(event) {
    const ageModal = document.getElementById('ageModal');
    if (!ageModal) return;
    
    const modalContent = ageModal.querySelector('.age-modal__content');
    
    if (event.target === ageModal && ageModal.classList.contains('active')) {
        event.preventDefault(); // Prevent closing by clicking outside
    }
});