// netlify/functions/form.js

exports.handler = async function(event, context) {
    const webhookUrl = process.env.WEBHOOK_URL;
  
    if (event.httpMethod === 'POST') {
      const { authorInput, pasteInput } = JSON.parse(event.body);
  
      const webhookBody = {
        embeds: [{
          title: 'Нова паста додана!',
          color: 0xff69b4, // Рожевий
          fields: [
            { name: 'Автор пасти', value: authorInput || 'Анонім', inline: false },
            { name: 'Текст пасти', value: pasteInput || 'Порожньо...', inline: false },
          ],
          timestamp: new Date(),
          footer: {
            text: 'УкрПаста',
          },
        }],
      };
  
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookBody),
        });
  
        if (response.ok) {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Паста надіслана!' }),
          };
        } else {
          return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Помилка при відправці пасти' }),
          };
        }
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Сталася помилка', error: error.message }),
        };
      }
    } else {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Метод не підтримується' }),
      };
    }
  };
  