// Fetch the JSON and populate the cards
fetch('pastes.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('pastes-container');

    data.forEach(paste => {
      const card = document.createElement('div');
      card.className = 'bg-gray-800 rounded-lg border border-gray-700 shadow-lg flex flex-col';

      card.innerHTML = `
        <div class="flex justify-between items-center bg-gray-700 p-3 rounded-t-lg">
          <span class="font-semibold">${paste.author}</span>
          <button class="flex items-center text-sm copy-btn text-gray-300 hover:text-white" data-text="${paste.text}">
            <i class="p-1 fa-solid fa-clone"></i> Копіювати
          </button>
        </div>
        <div class="p-4 text-left text-gray-200 whitespace-pre-wrap">${paste.text}</div>
      `;

      container.appendChild(card);
    });

    // Add copy functionality
    document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('click', () => {
        navigator.clipboard.writeText(button.getAttribute('data-text')).then(() => {
          button.innerHTML = `<i class="fas fa-check mr-1"></i> Скопійовано!`;
          setTimeout(() => {
            button.innerHTML = `<i class="p-1 fa-solid fa-clone"></i> Копіювати`;
          }, 1500);
        });
      });
    });
  });
