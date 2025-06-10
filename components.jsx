function Header() {
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'dark');

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <header className="w-full p-4 bg-gray-800 border-b border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold mb-3 sm:mb-0 sm:pr-3 text-center sm:text-left w-full sm:w-auto">
          УкрПаста
        </h1>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 items-center w-full sm:w-auto">
          <a href="index" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
            <i className="fas fa-home"></i> Головна
          </a>
          <a href="about" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
            <i className="fas fa-info-circle"></i> Про
          </a>
          <a href="apply" className="bg-pink-800 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
            <i className="fas fa-paper-plane"></i> Додати
          </a>
          <button
            onClick={toggleTheme}
            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md text-sm"
            title="Перемкнути тему"
          >
            {theme === 'dark' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </button>
        </div>
      </div>
    </header>
  );
}

const Footer = () => (
  <footer className="bg-gray-800 text-center text-sm py-4 w-full border-t border-gray-700 mt-auto">
    <span>
      Розроблено&nbsp;
      <a className="underline decoration-wavy" href="https://megatrex4.netlify.app/">MEGATREX4</a>
      &nbsp;з&nbsp;<i className="fas fa-heart text-red-500"></i>
    </span>
    &nbsp;у&nbsp;2025&nbsp;році
  </footer>
);
