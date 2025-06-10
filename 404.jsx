function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Сторінку не знайдено</h2>
        <p className="mb-6">Нажаль, такої сторінки не існує.</p>
        <a href="index" className="bg-pink-700 hover:bg-pink-600 text-white px-6 py-3 rounded-md flex items-center gap-2">
          <i className="fas fa-home"></i> На головну
        </a>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<NotFoundPage />);
