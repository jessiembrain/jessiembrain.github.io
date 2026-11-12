# GIS Portfolio

A lightweight, no-build portfolio site for GitHub Pages.

## Publish on GitHub Pages
1. Create a repo named **`YOUR-USERNAME.github.io`** (or any name).
2. Upload `index.html`, `styles.css`, `script.js`, and the `images/` folder to the repo root.
3. Repo **Settings → Pages → Source: Deploy from a branch → `main` / root** → Save.
4. Your site goes live at `https://YOUR-USERNAME.github.io/` (or `/repo-name/`) in a minute or two.

## Site structure
```
index.html                      ← home page (6 project cards)
projects/
  30-day-map-challenge.html     ← day-by-day viewer
  challenge-data.js             ← ✏️ YOUR 30 MAPS GO HERE
  heat-vulnerability.html       ← project pages (edit the write-up text)
  transit-access.html
  wissahickon-relief.html
  foot-traffic.html
  vacant-lots.html
images/challenge/               ← put day-01.png … day-30.png here
```

## Adding a 30 Day Map Challenge map
1. Save the map as `images/challenge/day-01.png` (any name works).
2. In `projects/challenge-data.js`, fill in that day's `title`, `description`, `tools`, and set
   `image: "../images/challenge/day-01.png"`.
3. Days without an image show a "coming soon" placeholder. Days with a map get a teal outline in the day bar.

Visitors start on Day 1 and can use the arrows, the dropdown, the numbered day buttons, or the ← → keys.
Each day has its own link (e.g. `.../30-day-map-challenge.html#day-12`) that you can share.

## Customize
- **Text, links, projects:** all in `index.html` (search for `YOUR-USERNAME`, `you@example.com`, and the `href="#"` on each card).
- **Colors / fonts:** the variables at the top of `styles.css`.
- **Real project images:** drop an image in `images/`, then in that card replace
  `<div class="thumb" data-art="...">` contents with `<img src="images/my-map.jpg" alt="">`.
  The generated placeholder art is skipped automatically when an `<img>` is present.
- **Résumé:** add `resume.pdf` to the repo root (linked in the footer).
