function FavoritesPage() {
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(saved);
  }, []);

  const copyPaste = text => {
    navigator.clipboard.writeText(text);
    const history = JSON.parse(localStorage.getItem('copyHistory') || '[]');
    history.unshift(text);
    if (history.length > 10) history.pop();
    localStorage.setItem('copyHistory', JSON.stringify(history));
  };

  const removeFavorite = paste => {
    const updated = favorites.filter(
      p => !(p.text === paste.text && p.author === paste.author)
    );
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center p-6">
        <h2 className="text-3xl font-bold mb-6">Улюблені пасти</h2>
        {favorites.length === 0 ? (
          <p>Немає улюблених паст.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {favorites.map((paste, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg flex flex-col">
                <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-3 rounded-t-lg">
                  <span className="font-semibold">{paste.author}</span>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                      onClick={() => copyPaste(paste.text)}
                    >
                      <i className="p-1 fa-solid fa-clone"></i> Копіювати
                    </button>
                    <button
                      className="flex items-center text-sm text-pink-600 hover:text-pink-700"
                      title="Видалити з улюблених"
                      onClick={() => removeFavorite(paste)}
                    >
                      <i className="fas fa-heart-broken"></i>
                    </button>
                  </div>
                </div>
                <div className="p-4 text-left text-gray-900 dark:text-gray-200 whitespace-pre-wrap" style={{ wordBreak: 'break-word' }}>
                  {paste.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<FavoritesPage />);
