function PastePage() {
  const [paste, setPaste] = React.useState(null);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    fetch('pastes.json')
      .then(res => res.json())
      .then(data => {
        const id = window.location.hash.slice(1);
        const idx = parseInt(id, 10);
        if (!isNaN(idx) && data[idx]) {
          setPaste({ ...data[idx], idx });
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true));
  }, []);

  const copyPaste = text => {
    navigator.clipboard.writeText(text);
  };

  if (notFound) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center p-6">
          <p className="text-xl">Пасту не знайдено.</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!paste) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center p-6">
        <h2 className="text-3xl font-bold mb-4">Паста #{paste.idx + 1}</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-6 max-w-2xl w-full">
          <p className="mb-4 whitespace-pre-wrap break-words">{paste.text}</p>
          <p className="text-right text-sm text-gray-500 mb-4">— {paste.author}</p>
          <button
            className="bg-pink-700 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
            onClick={() => copyPaste(paste.text)}
          >
            <i className="fa-solid fa-copy mr-1"></i> Копіювати
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PastePage />);
