const { useState, useEffect } = React;

function App() {
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
    React.createElement('div', {className: ''},
      React.createElement('div', {className: 'mb-4 flex flex-col md:flex-row gap-4'},
        React.createElement('input', {
          className: 'flex-1 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none',
          placeholder: 'Пошук...',
          value: search,
          onChange: e => setSearch(e.target.value)
        }),
        React.createElement('div', {className: 'flex flex-wrap gap-2'},
          uniqueTags.map(tag =>
            React.createElement('button', {
              key: tag,
              onClick: () => handleTagToggle(tag),
              className: `px-3 py-1 rounded-md border text-sm transition cursor-pointer select-none focus:outline-none ${selectedTags.includes(tag) ? 'bg-pink-600 text-white border-pink-700' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600'}`
            }, tag)
          )
        )
      ),
      React.createElement('div', {className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'},
        filtered.map((paste, idx) =>
          React.createElement('div', {key: idx, className: 'bg-gray-800 rounded-lg border border-gray-700 shadow-lg flex flex-col'},
            React.createElement('div', {className: 'flex justify-between items-center bg-gray-700 p-3 rounded-t-lg'},
              React.createElement('span', {className: 'font-semibold'}, paste.author),
              React.createElement('button', {
                className: 'flex items-center text-sm text-gray-300 hover:text-white',
                onClick: () => {
                  navigator.clipboard.writeText(paste.text).then(() => {});
                }
              },
                React.createElement('i', {className: 'p-1 fa-solid fa-clone'}),
                ' Копіювати'
              )
            ),
            React.createElement('div', {className: 'p-4 text-left text-gray-200 whitespace-pre-wrap', style: {wordBreak: 'break-word'}}, paste.text)
          )
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
