document.addEventListener("DOMContentLoaded", function () {
    initAnimations();
    initMobileMenu();
    initBackToTop();
    initHeaderScroll();
    initFaq();
    initModals();
    initReviewsCarousel(); // Добавлен вызов инициализации карусели отзывов
    initInteractiveStepper();
});

// 1️⃣ Анимация главного экрана и секций
function initAnimations() {
    // 🚀 Анимация главного экрана (hero)
    document.querySelectorAll(".hero-item").forEach((item, index) => {
        // Настройка стилей перед анимацией
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
        
        // Применение анимации с меньшей задержкой
        setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, 100 + (index * 100)); // Уменьшил задержку между элементами до 100мс
    });
    
    // 🚀 Анимация секций, блоков и элементов
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                // Анимация всех блоков внутри секции
                const blocks = entry.target.querySelectorAll(".block");
                blocks.forEach((block, index) => {
                    setTimeout(() => {
                        block.classList.add("visible");
                    }, index * 150); // Уменьшил задержку с 200мс до 150мс
                });
                
                // Анимация всех элементов внутри блоков
                entry.target.querySelectorAll(".item").forEach((item, itemIndex) => {
                    setTimeout(() => {
                        item.classList.add("visible");
                    }, itemIndex * 75); // Уменьшил задержку со 100мс до 75мс
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: "-50px 0px" });
    
    document.querySelectorAll(".section-block").forEach(section => observer.observe(section));
}

// 2️⃣ Мобильное меню (плавное открытие/закрытие)
function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.addEventListener("click", function () {
        mobileMenu.classList.toggle("open");
        menuToggle.textContent = mobileMenu.classList.contains("open") ? "✕" : "☰";
    });
    
    // Закрытие при клике вне меню
    document.addEventListener("click", function (event) {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileMenu.classList.remove("open");
            menuToggle.textContent = "☰";
        }
    });
}

// 3️⃣ Кнопка "Наверх" с индикатором прокрутки
function initBackToTop() {
    const backToTopButton = document.getElementById("back-to-top");
    const circleFg = document.querySelector(".circle-fg");
    
    if (!backToTopButton || !circleFg) return;
    
    // Высчитываем длину окружности для stroke-dasharray
    const radius = 29; // Соответствует значению r в SVG
    const circumference = 2 * Math.PI * radius;
    circleFg.style.strokeDasharray = `${circumference}`;
    circleFg.style.strokeDashoffset = `${circumference}`;
    
    window.addEventListener("scroll", function () {
        // Показываем кнопку при прокрутке
        if (window.scrollY > 200) {
            backToTopButton.classList.add("visible");
        } else {
            backToTopButton.classList.remove("visible");
        }
        
        // Обновляем индикатор прокрутки
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = Math.min(scrollTop / scrollHeight, 1);
        
        const dashoffset = circumference - (scrollPercentage * circumference);
        circleFg.style.strokeDashoffset = dashoffset;
    });
    
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 4️⃣ Плавное скрытие шапки при скролле
function initHeaderScroll() {
    const header = document.querySelector('.fixed-header');
    
    if (!header) return;
    
    let prevScrollPos = window.scrollY;
    window.addEventListener('scroll', function () {
        const currentScrollPos = window.scrollY;
        if (prevScrollPos < currentScrollPos && currentScrollPos > 50) {
            header.classList.add("-translate-y-full");
        } else {
            header.classList.remove("-translate-y-full");
        }
        prevScrollPos = currentScrollPos;
    });
}

// 5️⃣ Инициализация секции FAQ
function initFaq() {
    const faqButtons = document.querySelectorAll('.faq-question');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Получаем элемент ответа
            const answer = this.nextElementSibling;
            
            // Переключаем видимость ответа напрямую
            if (answer.classList.contains('hidden')) {
                // Показываем ответ
                answer.classList.remove('hidden');
                // Вращаем иконку
                this.querySelector('.faq-icon').classList.add('rotate-180');
                // Округляем только верхние углы кнопки
                this.classList.add('rounded-b-none');
            } else {
                // Скрываем ответ
                answer.classList.add('hidden');
                // Возвращаем иконку в исходное положение
                this.querySelector('.faq-icon').classList.remove('rotate-180');
                // Восстанавливаем полное округление кнопки
                this.classList.remove('rounded-b-none');
            }
        });
    });
}



// Оптимизированная функция для модальных окон
function initModals() {
    // Общая функция для всех модальных окон
    function setupModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelector(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const closeBtn = modal?.querySelector(closeSelector);
        
        if (!trigger || !modal) return;
        
        trigger.addEventListener("click", function(e) {
            e.preventDefault();
            modal.classList.remove("hidden");
            
            // Если это модальное окно с каруселью сертификатов, инициализируем карусель
            if (modalSelector === "#certificatesModal") {
                initCarousel();
            }
        });
        
        // Закрытие по кнопке
        closeBtn?.addEventListener("click", function() {
            modal.classList.add("hidden");
        });
        
        // Закрытие при клике вне контента
        modal.addEventListener("click", function(e) {
            if (e.target === this) {
                modal.classList.add("hidden");
            }
        });
    }
    
    // Настраиваем все модальные окна
    setupModal("#certificatesBtn", "#certificatesModal", ".close");
    setupModal("#groupTopicsLink", "#groupTopicsModal", ".close-groupTopics");
}

// Оптимизированная функция для карусели
function initCarousel(carouselSelector = ".carousel", itemSelector = "img") {
    const carousel = document.querySelector(carouselSelector);
    if (!carousel) return;
    
    // Удаляем существующие кнопки навигации
    carousel.closest(".carousel-container")?.querySelectorAll(".carousel-nav-button").forEach(btn => btn.remove());
    
    // Общие настройки карусели
    carousel.style.scrollBehavior = "smooth";
    carousel.style.scrollSnapType = "x mandatory";
    carousel.style.cursor = "grab";
    
    // Функция для прокрутки к ближайшему элементу
    function snapToNearestItem() {
        const items = carousel.querySelectorAll(itemSelector);
        if (items.length === 0) return;
        
        const item = items[0];
        const itemWidth = item.offsetWidth + parseInt(getComputedStyle(item).marginRight || "0");
        const scrollPosition = carousel.scrollLeft;
        const itemIndex = Math.round(scrollPosition / itemWidth);
        
        carousel.scrollTo({
            left: itemIndex * itemWidth,
            behavior: 'smooth'
        });
    }
    
    // События для desktop
    let isDragging = false;
    let startX, scrollLeft;
    
    carousel.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = "grabbing";
        e.preventDefault();
    });
    
    carousel.addEventListener("mouseleave", () => {
        isDragging = false;
        carousel.style.cursor = "grab";
    });
    
    carousel.addEventListener("mouseup", () => {
        isDragging = false;
        carousel.style.cursor = "grab";
        snapToNearestItem();
    });
    
    carousel.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    // События для мобильных устройств
    let touchStartX;
    
    carousel.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener("touchmove", (e) => {
        if (!touchStartX) return;
        const touchX = e.touches[0].clientX;
        const walk = (touchX - touchStartX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
        e.preventDefault();
    });
    
    carousel.addEventListener("touchend", () => {
        touchStartX = null;
        snapToNearestItem();
    });
    
    // Добавляем кнопки навигации
    const carouselContainer = carousel.closest(".carousel-container");
    
    // Кнопка "Предыдущий"
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "&#10094;";
    prevButton.className = "carousel-nav-button bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center absolute left-2 top-1/2 transform -translate-y-1/2 z-10 focus:outline-none";
    prevButton.addEventListener("click", () => {
        const items = carousel.querySelectorAll(itemSelector);
        if (items.length === 0) return;
        
        const item = items[0];
        const itemWidth = item.offsetWidth + parseInt(getComputedStyle(item).marginRight || "0");
        carousel.scrollBy({
            left: -itemWidth,
            behavior: "smooth"
        });
    });
    
    // Кнопка "Следующий"
    const nextButton = document.createElement("button");
    nextButton.innerHTML = "&#10095;";
    nextButton.className = "carousel-nav-button bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center absolute right-2 top-1/2 transform -translate-y-1/2 z-10 focus:outline-none";
    nextButton.addEventListener("click", () => {
        const items = carousel.querySelectorAll(itemSelector);
        if (items.length === 0) return;
        
        const item = items[0];
        const itemWidth = item.offsetWidth + parseInt(getComputedStyle(item).marginRight || "0");
        carousel.scrollBy({
            left: itemWidth,
            behavior: "smooth"
        });
    });
    
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);
    
    // Начальная позиция
    setTimeout(snapToNearestItem, 100);
}

// Инициализация карусели отзывов - вызов обобщенной функции
function initReviewsCarousel() {
    initCarousel(".reviews-carousel", ".review-item");
}

// Для сохранения совместимости со старым кодом
// Инициализация стандартной карусели
function initCarouselOriginal() {
    initCarousel(".carousel", "img");
}

// Степпер
function initInteractiveStepper() {
    const stepperItems = document.querySelectorAll('.stepper-item');
    const progressLine = document.getElementById('progress-line');
    
    if (stepperItems.length === 0) {
        console.error('Stepper items not found!');
        return;
    }
    
    function updateProgress(activeStep) {
        // Обновляем прогресс-бар
        if (progressLine && activeStep >= 0) {
            const totalHeight = stepperItems[stepperItems.length - 1].offsetTop + 24;
            const currentHeight = stepperItems[activeStep].offsetTop + 24;
            const progressPercent = (currentHeight / totalHeight) * 100;
            progressLine.style.height = `${progressPercent}%`;
        } else if (progressLine) {
            progressLine.style.height = '0%';
        }
    }
    
    // Добавляем обработчики кликов
    stepperItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            
            // Закрываем все активные шаги
            stepperItems.forEach(step => {
                step.classList.remove('active', 'completed');
            });
            
            // Если кликнули на активный элемент, просто закрываем все
            if (wasActive) {
                updateProgress(-1);
                return;
            }
            
            // Иначе активируем новый шаг
            item.classList.add('active');
            
            // Помечаем предыдущие шаги как completed
            for (let i = 0; i < index; i++) {
                stepperItems[i].classList.add('completed');
            }
            
            updateProgress(index);
        });
    });
    
    // Инициализация - все шаги неактивны
    updateProgress(-1);
}