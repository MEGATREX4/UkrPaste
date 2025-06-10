function AcceptedPage() {
  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto w-full">
        <i className="fas fa-check-circle text-green-500 text-6xl mb-6"></i>
        <h2 className="text-3xl font-bold mb-4">Паста прийнята!</h2>
        <p className="mb-6 text-lg">Ваша паста прийнята на обробку та незабаром зʼявиться на сайті.</p>
        <div className="flex gap-4">
          <a href="index" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md flex items-center gap-2 justify-center">
            <i className="fas fa-home"></i> Головна
          </a>
          <a href="apply" className="bg-pink-700 hover:bg-pink-600 text-white px-6 py-3 rounded-md flex items-center gap-2 justify-center">
            <i className="fas fa-plus-circle"></i> Додати ще пасту
          </a>
        </div>
        <br />
        <br />
        <p>Також можете надіслати пару гривень в благодійний фонд, якому ви довіряєте, адміністрація сайту надає декілька варіантів</p>
        <br />
        <div className="grid grid-cols-1 pb-6 sm:grid-cols-2 gap-3 max-w-6xl mx-auto">
          <a href="https://savelife.in.ua" className="bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-between transition duration-300 hover:scale-105 hover:bg-gray-700">
            <img src="https://savelife.in.ua/wp-content/themes/savelife/assets/images/new-logo-black-ua.svg" alt="Save Life" title="Save Life" className="cba-logo ua h-32 w-32 object-contain" />
            <p className="text-sm text-center mt-auto">Повернись живим</p>
          </a>
          <a href="https://prytulafoundation.org/" className="bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-between transition duration-300 hover:scale-105 hover:bg-gray-700">
            <img src="https://ds7zgdsyui79p.cloudfront.net/logonew_f2314490c6.svg" alt=" Сергій Притула фонд" title=" Сергій Притула фонд" className="h-32 w-32 object-contain" />
            <p className="text-sm text-center mt-auto">Фонд Сергія Притули</p>
          </a>
          <a href="https://www.sternenkofund.org/" className="bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-between transition duration-300 hover:scale-105 hover:bg-gray-700">
            <img src="https://cdn.prod.website-files.com/6797b46110ec22b94bac2ef8/6797f9d57664bf21b2f2b300_SSF%20Drone%20Icon%20White.svg" loading="lazy" alt="Drone Army" title="Drone Army" className="h-32 w-32 object-contain" />
            <p className="text-sm text-center mt-auto">Спільнота Стерненка</p>
          </a>
          <a href="https://united24.gov.ua" className="bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-between transition duration-300 hover:scale-105 hover:bg-gray-700">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/UNITED24_logo.svg" loading="lazy" alt="United24" title="United24" className="h-32 w-32 object-contain" style={{ filter: 'invert(100%)' }} />
            <p className="text-sm text-center mt-auto">United24</p>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AcceptedPage />);
