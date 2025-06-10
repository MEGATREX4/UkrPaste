const { useState, useEffect } = React;

function IndexPage() {
  const [pastes, setPastes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    fetch('pastes.json')
      .then(res => res.json())
      .then(data => setPastes(data));
  }, []);

  const uniqueTags = Array.from(new Set(pastes.flatMap(p => p.tags || [])));
  const uniqueAuthors = Array.from(new Set(pastes.map(p => p.author)));

  const handleTagToggle = tag => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleAuthorToggle = author => {
    setSelectedAuthors(prev =>
      prev.includes(author)
        ? prev.filter(a => a !== author)
        : [...prev, author]
    );
  };

  const filtered = pastes.filter(paste => {
    const matchesSearch =
      paste.text.toLowerCase().includes(search.toLowerCase()) ||
      paste.author.toLowerCase().includes(search.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 || selectedTags.every(t => (paste.tags || []).includes(t));
    const matchesAuthors =
      selectedAuthors.length === 0 || selectedAuthors.includes(paste.author);
    return matchesSearch && matchesTags && matchesAuthors;
  });

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col items-center p-6">
        <h2 className="text-4xl font-bold mb-8">Збірник паст</h2>
        <div className="mb-4 w-full max-w-6xl flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              className="flex-1 p-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none"
              placeholder="Пошук..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-md text-sm"
              onClick={() => setFiltersOpen(o => !o)}
            >
              Фільтри
            </button>
          </div>
          {filtersOpen && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-300 dark:border-gray-700 flex flex-col gap-4">
              <div>
                <p className="font-semibold mb-2">Теги:</p>
                <div className="flex flex-wrap gap-2">
                  {uniqueTags.map(tag => (
                    <label key={tag} className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        className="accent-pink-600"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">Автори:</p>
                <div className="flex flex-wrap gap-2">
                  {uniqueAuthors.map(author => (
                    <label key={author} className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        className="accent-pink-600"
                        checked={selectedAuthors.includes(author)}
                        onChange={() => handleAuthorToggle(author)}
                      />
                      {author}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {filtered.map((paste, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg flex flex-col">
              <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-3 rounded-t-lg">
                <span className="font-semibold">{paste.author}</span>
                <button
                  className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  onClick={() => navigator.clipboard.writeText(paste.text)}
                >
                  <i className="p-1 fa-solid fa-clone"></i> Копіювати
                </button>
              </div>
              <div className="p-4 text-left text-gray-900 dark:text-gray-200 whitespace-pre-wrap" style={{ wordBreak: 'break-word' }}>
                {paste.text}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<IndexPage />);
