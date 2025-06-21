# UkrPaste

UkrPaste is a collection of funny Ukrainian Twitch pastes hosted as a static site on Netlify.

The site itself is completely static and all dynamic logic runs in the browser. Netlify Functions are used only to forward submissions to a Discord webhook.

## Local development

1. Install dependencies (only used for the development server):
   ```bash
   npm install
   ```
2. Start a local server:
   ```bash
   npm start
   ```
   This serves the project on `http://localhost:3000` using the `serve` package.

### Python helpers

`app.py` and `handler.py` are small scripts used locally to maintain `pastes.json`:

- **handler.py** parses `input_pastes.txt` and saves cleaned pastes to `new_pastes.json`.
- **app.py** provides a tiny Flask interface for previewing `pastes.json` and adding new entries.

These utilities are not used on Netlify but can speed up manual updates of the JSON files.

## Sharing pastes

Every paste has its own link accessible via the new Share button. It opens `paste.html` with the paste index in the hash (e.g. `paste.html#5`). You can copy or share this link directly.

## Environment variables

The Netlify function in `netlify/functions/form.js` expects a `WEBHOOK_URL` environment variable with a Discord webhook address.

## API

The site exposes a small API powered by Netlify Functions. You can fetch pastes in JSON format using the following endpoints:

- `/.netlify/functions/api` – return all pastes.
- `/.netlify/functions/api?id=0` – return a paste by index.
- `/.netlify/functions/api?random=1` – return a random paste.
- `/.netlify/functions/api?tag=Вибачення` – return all pastes with a tag.
- `/.netlify/functions/api?tag=Вибачення&random=1` – random paste from that tag.
- `/.netlify/functions/api?random=1&textonly=1` – just the text of a random paste.
- `/.netlify/functions/api?random=1&textonly=1&plain=1` – plain text without JSON.
- `/.netlify/functions/api?random=1&max=500` – limit text to 500 characters.
- `/.netlify/functions/api?random=1&nonl=1` – replace newlines with spaces.

Add `textonly=1` to return only the text in JSON. Use `plain=1` together with `textonly=1` to get raw text without the `{"text":...}` wrapper. You can also pass `max=<number>` to truncate the returned text to a specific length. Set `nonl=1` to strip line breaks and replace them with spaces (useful for Twitch chats).

### Використання зі StreamElements

Щоб показати випадкову пасту у чаті через StreamElements, можна створити команду:

```text
!cmd add !randpaste ${customapi.https://ukrpaste.netlify.app/.netlify/functions/api?random=1&textonly=1&plain=1&max=500}
```

Запит поверне текст на зразок:

```text
...
```

StreamElements вставить отриманий текст у повідомлення.
