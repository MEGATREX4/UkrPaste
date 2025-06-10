function HistoryPage() {
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('copyHistory') || '[]');
    setHistory(saved);
  }, []);

  const copyAgain = text => {
    navigator.clipboard.writeText(text);
    const updated = [text, ...history.filter(t => t !== text)];
    if (updated.length > 10) updated.pop();
    setHistory(updated);
    localStorage.setItem('copyHistory', JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center p-6 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Історія копіювань</h2>
        {history.length === 0 ? (
          <p>Історія порожня.</p>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {history.map((text, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 flex justify-between items-start">
                <pre className="whitespace-pre-wrap break-words mr-2 flex-1">{text}</pre>
                <button
                  className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-black dark:text-white px-3 py-2 rounded-md text-sm flex-shrink-0"
                  onClick={() => copyAgain(text)}
                >
                  <i className="fa-solid fa-copy"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<HistoryPage />);
