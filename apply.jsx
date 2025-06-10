const { useState, useEffect } = React;

function ApplyPage() {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('author');
    if (saved) setAuthor(saved);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    localStorage.setItem('author', author);
    const webhookBody = { authorInput: author, pasteInput: text };
    try {
      const res = await fetch('/.netlify/functions/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookBody)
      });
      const result = await res.json();
      if (res.ok) {
        window.location.href = 'accepted';
      } else {
        alert(result.message || 'Помилка, спробуй пізніше!');
      }
    } catch (err) {
      alert('Помилка при відправці заявки, спробуйте пізніше.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center p-6 max-w-xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-6 text-center">Додати свою пасту</h2>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-6 rounded-md w-full shadow-md flex flex-col gap-4">
          <div>
            <label htmlFor="author" className="block mb-2">Ваш нікнейм або ім'я:</label>
            <input id="author" value={author} onChange={e => setAuthor(e.target.value)} className="w-full p-3 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-600" />
          </div>
          <div>
            <label htmlFor="content" className="block mb-2">Текст пасти:</label>
            <textarea id="content" rows="6" required value={text} onChange={e => setText(e.target.value)} className="w-full p-3 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-600"></textarea>
          </div>
          <button type="submit" className="bg-pink-700 hover:bg-pink-600 text-white px-6 py-3 rounded-md flex items-center gap-2 justify-center">
            <i className="fas fa-paper-plane"></i> Надіслати пасту
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ApplyPage />);
