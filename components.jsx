const Header = () => (
  <header className="w-full flex items-center p-4 bg-gray-800 border-b border-gray-700">
    <h1 className="text-2xl font-bold pr-3">УкрПаста</h1>
    <div className="flex gap-4">
      <a href="index" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
        <i className="fas fa-home"></i> Головна
      </a>
      <a href="about" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
        <i className="fas fa-info-circle"></i> Про
      </a>
      <a href="apply" className="bg-pink-800 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
        <i className="fas fa-paper-plane"></i> Додати
      </a>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-800 text-center text-sm py-4 w-full border-t border-gray-700 mt-auto">
    <span>
      Розроблено
      <a className="underline decoration-wavy" href="https://megatrex4.netlify.app/">MEGATREX4</a>
      з <i className="fas fa-heart text-red-500"></i>
    </span>
    у 2025 році
  </footer>
);
