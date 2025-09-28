// Основная функция инициализации
function initApp() {
  initSmoothScroll();
  initHeaderShadow();
  initSubscriptionForm();
}

// Инициализация плавной прокрутки
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToSection(this.getAttribute("href"));
    });
  });
}

// Функция прокрутки к секции
function scrollToSection(sectionId) {
  if (sectionId === "#") return;

  const targetElement = document.querySelector(sectionId);
  if (targetElement) {
    const headerHeight = document.querySelector(".header").offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

// Инициализация эффекта тени для шапки
function initHeaderShadow() {
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
      header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.8)";
    } else {
      header.style.boxShadow = "none";
    }
  });
}

// Инициализация формы подписки
function initSubscriptionForm() {
  const form = document.querySelector(".footer__form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
}

// Обработчик отправки формы
function handleFormSubmit(e) {
  e.preventDefault();

  const emailInput = this.querySelector(".footer__input");
  if (!emailInput) return;

  const email = emailInput.value.trim();

  if (validateEmail(email)) {
    showMessage("success", "Спасибо за подписку! Проверьте вашу почту.");
    emailInput.value = "";
    // Здесь можно добавить отправку данных на сервер
  } else {
    showMessage("error", "Пожалуйста, введите корректный email адрес");
    emailInput.focus();
  }
}

// Показ сообщений
function showMessage(type, text) {
  const message = document.createElement("div");
  message.className = `message message--${type}`;
  message.textContent = text;
  message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

  if (type === "success") {
    message.style.background = "#4CAF50";
  } else {
    message.style.background = "#f44336";
  }

  document.body.appendChild(message);

  // Удаляем сообщение через 3 секунды
  setTimeout(() => {
    message.remove();
  }, 3000);
}

// Валидация email
function validateEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Запуск приложения когда DOM загружен
document.addEventListener("DOMContentLoaded", initApp);
