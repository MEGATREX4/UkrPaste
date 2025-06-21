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
          <li><code>/.netlify/functions/api?random=1&textonly=1</code> — тільки текст випадкової пасти</li>
        </ul>
        <h3 className="text-2xl font-semibold mb-2">Приклади</h3>
        <pre className="bg-gray-800 text-green-400 p-4 rounded mb-2 whitespace-pre-wrap">
curl https://ukrpaste.netlify.app/.netlify/functions/api?random=1
        </pre>
        <pre className="bg-gray-800 text-green-400 p-4 rounded mb-2 whitespace-pre-wrap">
curl https://ukrpaste.netlify.app/.netlify/functions/api?random=1&textonly=1
        </pre>
        <pre className="bg-gray-800 text-green-400 p-4 rounded mb-4 whitespace-pre-wrap">
curl "https://ukrpaste.netlify.app/.netlify/functions/api?tag=\u0412\u0438\u0431\u0430\u0447\u0435\u043d\u043d\u044f"
        </pre>

        <h3 className="text-2xl font-semibold mb-2">Приклад для StreamElements</h3>
        <pre className="bg-gray-800 text-green-400 p-4 rounded mb-4 whitespace-pre-wrap">
            !cmd add !паста $&#123;customapi.https://ukrpaste.netlify.app/.netlify/functions/api?random=1&textonly=1&#125;
        </pre>

        <p className="text-sm text-gray-500">Endpoint: https://ukrpaste.netlify.app/.netlify/functions/api</p>
        <p className="text-sm text-gray-500">Індекси відповідають порядку у <code>pastes.json</code>.</p>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<APIPage />);
