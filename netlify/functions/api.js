const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
  const filePath = path.join(__dirname, 'pastes.json');
  const pastes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const params = event.queryStringParameters || {};

  if (params.id !== undefined) {
    const index = parseInt(params.id, 10);
    if (!isNaN(index) && index >= 0 && index < pastes.length) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pastes[index]),
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
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(random),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(list),
  };
};
