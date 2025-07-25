const pastes = require('../../pastes.json');

exports.handler = async function(event) {
  const params = event.queryStringParameters || {};
  const textOnly = params.textonly !== undefined;
  const plain = params.plain !== undefined;
  const max = params.max !== undefined ? parseInt(params.max, 10) : null;
  const removeNewlines = params.nonl !== undefined;

  const limitText = (text) => {
    if (max !== null && !isNaN(max) && max > 0) {
      return text.slice(0, max);
    }
    return text;
  };

  const formatText = (text) => {
    let result = limitText(text);
    if (removeNewlines) {
      result = result.replace(/\n/g, ' ');
    }
    return result;
  };

  if (params.id !== undefined) {
    const index = parseInt(params.id, 10);
    if (!isNaN(index) && index >= 0 && index < pastes.length) {
      const paste = pastes[index];
      const text = formatText(paste.text);
      const body = textOnly
        ? plain
          ? text
          : { text }
        : { ...paste, text };
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
    const text = formatText(random.text);
    const body = textOnly
      ? plain
        ? text
        : { text }
      : { ...random, text };
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
  }

  const result = textOnly
    ? plain
      ? list.map((p) => formatText(p.text))
      : list.map((p) => ({ text: formatText(p.text) }))
    : list.map((p) => ({ ...p, text: formatText(p.text) }));
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  };
};
