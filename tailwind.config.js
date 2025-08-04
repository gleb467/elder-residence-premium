// tailwind.config.js
module.exports = {
content: [
  "./index.html", 
  "./src/**/*.{html,js,css}",
  "./**/*.html"
],
  
  safelist: [
    // Анимации и динамические классы
    'animate-base',
    'animate-visible', 
    'visible',
    'hero-section',
    'hero-item', 
    'section-block',
    'fixed-header',
    '-translate-y-full',
    // Добавим классы специфичные для пансионата
    'bg-dots',
    'bg-neutral-light'
  ],
  
  theme: {
    extend: {
      colors: {
        // === ОСНОВНЫЕ ЦВЕТА (используйте их в верстке) ===
        primary: {
          light: '#86bffc',    // light-sky-blue
          light2: '#80b4ec',    // НОВЫЙ ЦВЕТ для подтекста
          DEFAULT: '#2d91fc',  // dodger-blue
          dark: '#4f9df1',     // soft-option
        },
        accent: {
          light: '#dbb561',    // goldenrod
          DEFAULT: '#bb9a53',  // dark-goldenrod
          dark: '#a68845',     // темнее для контраста
        },
        neutral: {
          light: '#eaedf4',    // фон
          DEFAULT: '#6b7280',  // средний текст
          dark: '#2e2e2e',     // основой текст
        },
      },
      // Точечный паттерн для фона
      backgroundImage: {
        'dots': `
          radial-gradient(circle at 25% 30%, rgba(45, 145, 252, 0.08) 2px, transparent 2px),
          radial-gradient(circle at 75% 70%, rgba(45, 145, 252, 0.06) 1px, transparent 1px),
          radial-gradient(circle at 50% 85%, rgba(45, 145, 252, 0.10) 3px, transparent 3px)
        `,
      },
      backgroundSize: {
        'dots': '50px 50px, 30px 30px, 70px 70px',
      },
    },
  },
  plugins: [],
};

/* 
=== ПРОСТАЯ ЛОГИКА ===

PRIMARY (синий) - для основных действий:
- bg-primary (кнопки, ссылки, активные элементы)
- bg-primary-light (hover состояния, светлые акценты)
- bg-primary-dark (активные состояния, темные акценты)

ACCENT (золотой) - для выделения:
- bg-accent (специальные кнопки, значки, цены)
- bg-accent-light (мягкие выделения)
- bg-accent-dark (контрастные акценты)

NEUTRAL (серый) - для фона и текста:
- bg-neutral-light (основной фон страницы)
- text-neutral (обычный текст)
- text-neutral-dark (заголовки, важный текст)

=== ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ ===

<div class="bg-neutral-light">                    <!-- Фон страницы -->
  <h1 class="text-neutral-dark">Заголовок</h1>    <!-- Основной текст -->
  <p class="text-neutral">Описание</p>            <!-- Обычный текст -->
  
  <button class="bg-primary hover:bg-primary-dark text-white">
    Основная кнопка
  </button>
  
  <button class="bg-accent hover:bg-accent-dark text-white">
    Специальная кнопка
  </button>
  
  <div class="bg-primary-light p-4">             <!-- Светлый блок -->
    Информационный блок
  </div>
</div>

<!-- Фон с точками -->
<section class="bg-dots bg-neutral-light">
  Секция с паттерном
</section>
*/