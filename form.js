window.addEventListener('load', function() {
  const savedAuthor = localStorage.getItem('author');
  if (savedAuthor) {
    document.getElementById('authorInput').value = savedAuthor;
  }
});

async function sendContact(ev) {
    ev.preventDefault();
  
    const authorInput = document.getElementById('authorInput').value;
    const pasteInput = document.getElementById('pasteInput').value;

    localStorage.setItem('author', authorInput);
  
    const webhookBody = {
      authorInput: authorInput,
      pasteInput: pasteInput,
    };
  
    try {
      // Відправка даних на функцію Netlify
      const response = await fetch('/.netlify/functions/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookBody),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        window.location.href = 'accepted';
      } else {
        alert(result.message || 'Помилка, спробуй пізніше!');
      }
    } catch (error) {
      alert('Помилка при відправці заявки, спробуйте пізніше.');
    }
  }