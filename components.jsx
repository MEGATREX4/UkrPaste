function Header() {
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'dark');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [isFixed, setIsFixed] = React.useState(false);

  // Висота хедера (Tailwind: p-4 + text-2xl + кнопки ≈ 72px, можна підлаштувати)
  const headerHeight = 72;

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  React.useEffect(() => {
    const onScroll = () => {
      setIsFixed(window.scrollY > 120); // 120px можна змінити на бажане значення
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  const navButtons = (
    <>
      <a href="index" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
        <i className="fas fa-home"></i> Головна
      </a>
      <a href="about" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
        <i className="fas fa-info-circle"></i> Про
      </a>
      <a href="apply" className="bg-pink-800 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
        <i className="fas fa-paper-plane"></i> Додати
      </a>
      <a href="history" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
        <i className="fas fa-clock-rotate-left"></i> Історія
      </a>
      <a href="favorites" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
        <i className="fas fa-heart"></i> Улюблені
      </a>
      <a href="api" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
        <i className="fas fa-code"></i> API
      </a>
      <button
        onClick={toggleTheme}
        className="w-[35px] h-[35px] bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md text-sm"
        title="Перемкнути тему"
      >
        {theme === 'dark' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
      </button>
    </>
  );

  return (
    <>
      {/* Плейсхолдер для уникнення стрибка контенту */}
      {isFixed && (
        <div style={{ height: headerHeight, minHeight: headerHeight }} aria-hidden="true"></div>
      )}
      <header
        className={
          `w-full p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 text-black dark:text-white transition-all duration-300` +
          (isFixed ? ' fixed top-0 left-0 z-50 shadow-lg' : '')
        }
        style={isFixed ? { animation: 'fade-in 0.2s', height: headerHeight } : {}}
      >
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <h1 className="text-2xl font-bold mb-3 sm:mb-0 sm:pr-3 text-center sm:text-left w-full sm:w-auto">
              УкрПаста
            </h1>
            {/* Mobile menu button */}
            <button
              className="sm:hidden ml-2 p-2 rounded-md bg-gray-200 dark:bg-gray-700"
              onClick={() => setMobileMenu(m => !m)}
              aria-label="Меню"
            >
              <i className={`fas ${mobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
          {/* Desktop nav */}
          <div className="hidden sm:flex flex-wrap justify-center sm:justify-end gap-4 items-center w-full sm:w-auto">
            {navButtons}
          </div>
          {/* Mobile nav */}
          {mobileMenu && (
            <div className="sm:hidden flex flex-col gap-2 mt-3 animate-fade-in">
              {navButtons}
            </div>
          )}
        </div>
      </header>
    </>
  );
}

const Footer = () => (
  <footer className="bg-white dark:bg-gray-800 text-black dark:text-white text-center text-sm py-4 w-full border-t border-gray-300 dark:border-gray-700 mt-auto transition-all duration-300">
    <span>
      Розроблено&nbsp;
      <a className="underline decoration-wavy" href="https://megatrex4.netlify.app/">MEGATREX4</a>
      &nbsp;з&nbsp;<i className="fas fa-heart text-red-500"></i>
    </span>
    &nbsp;у&nbsp;2025&nbsp;році
  </footer>
);

// Додайте цей клас до tailwind.config.js або у глобальні стилі для fade-in анімації (або замініть на transition якщо потрібно)
/*
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px);}
  to { opacity: 1; transform: none;}
}
.animate-fade-in {
  animation: fade-in 0.2s;
}
*/
