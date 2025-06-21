function APIPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center p-6 max-w-4xl mx-auto text-left">
        <h2 className="text-4xl font-bold mb-6">API</h2>
        <p className="mb-4">Невеликий API дозволяє отримувати пасти у форматі JSON.</p>
        <ul className="list-disc pl-6 mb-4">
          <li><code>/.netlify/functions/api</code> — усі пасти</li>
          <li><code>/.netlify/functions/api?random=1</code> — випадкова паста</li>
          <li><code>/.netlify/functions/api?id=0</code> — паста за індексом</li>
          <li><code>/.netlify/functions/api?tag=Вибачення</code> — усі пасти з тегом</li>
          <li><code>/.netlify/functions/api?tag=Вибачення&random=1</code> — випадкова паста з цього тегу</li>
        </ul>
        <p className="text-sm text-gray-500">Індекси відповідають порядку у <code>pastes.json</code>.</p>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<APIPage />);
