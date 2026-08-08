# Happy Birthday — Kaniz Fatema Mowmita 🎂

A premium, cinematic single-page birthday website. Pure HTML5 + CSS3 + vanilla JavaScript — no frameworks, no build step. Works directly in a browser or from Termux.

## How it flows

1. **Verification page** loads first (unchanged from your original). Tap **✅ Verify**, wait for the check, and it succeeds.
2. A **cinematic golden loader** (rotating rings, glowing core, sparkles) plays automatically.
3. It fades into the **birthday website** for Kaniz Fatema Mowmita's 18th birthday.

## Files

```
index.html    → all markup (verification + loader + birthday site)
style.css     → all styling / animations
script.js     → all behaviour (verification hook, loader, site logic)
assets/images → drop real photos here for the gallery
assets/music  → drop happy-birthday.mp3 here for the music button
README.md     → this file
```

## Running it

Just open `index.html` in any modern browser. No server, no build tools, no dependencies beyond two Google Fonts loaded over the network (Playfair Display, Cormorant Garamond, Poppins).

In Termux:
```bash
cd birthday-site
python -m http.server 8080
# then open http://localhost:8080 in a browser
```

## Customizing

**Photos** — put images in `assets/images/`, then in `script.js` find `buildGallery()` and swap:
```js
card.innerHTML = `<span class="gallery-placeholder">${icon}</span>`;
```
for:
```js
card.innerHTML = '<img src="assets/images/your-photo.jpg" alt="Memory photo">';
```

**Music** — put an MP3 at `assets/music/happy-birthday.mp3` (the `<audio>` tag in `index.html` already points there). The floating button in the top-right corner toggles playback; music also starts automatically once the candles are blown out.

**Text** — the welcome letter, envelope message, and footer text live directly in `index.html` / `script.js`, in plain readable strings.

**Colors** — all colors are CSS custom properties at the top of `style.css` under `:root` (`--accent`, `--accent-2`, `--bg-1`, etc.) so the whole palette can be restyled from one place.

## Notes

- Fully responsive: tested down to small phone widths, no horizontal overflow.
- Respects `prefers-reduced-motion` for accessibility.
- The verification page's original markup, IDs, classes, and 4-second check logic are untouched — only a follow-up transition was added after it succeeds.
