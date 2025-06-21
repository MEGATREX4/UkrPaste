const pastes = require('../../pastes.json');

exports.handler = async function(event) {
  const params = event.queryStringParameters || {};
  const textOnly = params.textonly !== undefined;

  if (params.id !== undefined) {
    const index = parseInt(params.id, 10);
    if (!isNaN(index) && index >= 0 && index < pastes.length) {
      const paste = pastes[index];
      const body = textOnly ? { text: paste.text } : paste;
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };
    }
    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Paste not found' }),
    };
  }

  // filter by tag if provided
  let list = pastes;
  if (params.tag !== undefined) {
    list = pastes.filter((p) => Array.isArray(p.tags) && p.tags.includes(params.tag));
  }

  // return random paste (optionally within tag subset)
  if (params.random !== undefined) {
    if (list.length === 0) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Paste not found' }),
      };
    }
    const random = list[Math.floor(Math.random() * list.length)];
    const body = textOnly ? { text: random.text } : random;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
  }

  const result = textOnly ? list.map((p) => p.text) : list;
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  };
};
