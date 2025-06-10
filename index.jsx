const { useState, useEffect } = React;

function IndexPage() {
  const [pastes, setPastes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    fetch('pastes.json')
      .then(res => res.json())
      .then(data => setPastes(data));
  }, []);

  const uniqueTags = Array.from(new Set(pastes.flatMap(p => p.tags || [])));

  const handleTagToggle = tag => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filtered = pastes.filter(paste => {
    const matchesSearch =
      paste.text.toLowerCase().includes(search.toLowerCase()) ||
      paste.author.toLowerCase().includes(search.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 || selectedTags.every(t => (paste.tags || []).includes(t));
    return matchesSearch && matchesTags;
  });

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col items-center p-6">
        <h2 className="text-4xl font-bold mb-8">Збірник паст</h2>
        <div className="mb-4 flex flex-col md:flex-row gap-4 w-full max-w-6xl">
          <input
            className="flex-1 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
            placeholder="Пошук..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {filtered.map((paste, idx) => (
            <div key={idx} className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg flex flex-col">
              <div className="flex justify-between items-center bg-gray-700 p-3 rounded-t-lg">
                <span className="font-semibold">{paste.author}</span>
                <button
                  className="flex items-center text-sm text-gray-300 hover:text-white"
                  onClick={() => navigator.clipboard.writeText(paste.text)}
                >
                  <i className="p-1 fa-solid fa-clone"></i> Копіювати
                </button>
              </div>
              <div className="p-4 text-left text-gray-200 whitespace-pre-wrap" style={{ wordBreak: 'break-word' }}>
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
