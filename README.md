# Omar Real Estate — website

A fast, single-page static website for a real estate agent. No build step and no dependencies: just HTML, CSS and JavaScript.

## Preview locally

Open `index.html` in a browser, or run a small server:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customize

| What | Where |
|------|-------|
| Name, headline, about text, services | `index.html` |
| Phone, email, office address | `index.html` (contact section) and `CONTACT_EMAIL` in `script.js` |
| Property listings | `LISTINGS` array at the top of `script.js` |
| Colors and fonts | CSS variables at the top of `styles.css` |
| Testimonials | `index.html` — replace placeholder quotes with real client quotes |

To use real property photos, replace the `houseArt(...)` call in `renderListings` with an `<img>` tag pointing at your image.

## Publish (free)

**GitHub Pages:** in the repository go to *Settings → Pages*, choose *Deploy from a branch*, pick your branch and the `/ (root)` folder, then save. The site will be live at `https://<username>.github.io/<repo>/` in a minute or two.
