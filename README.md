# GIS Portfolio

A lightweight, no-build portfolio site for GitHub Pages.

## Publish on GitHub Pages
1. Create a repo named **`YOUR-USERNAME.github.io`** (or any name).
2. Upload `index.html`, `styles.css`, `script.js`, and the `images/` folder to the repo root.
3. Repo **Settings → Pages → Source: Deploy from a branch → `main` / root** → Save.
4. Your site goes live at `https://YOUR-USERNAME.github.io/` (or `/repo-name/`) in a minute or two.

## Customize
- **Text, links, projects:** all in `index.html` (search for `YOUR-USERNAME`, `you@example.com`, and the `href="#"` on each card).
- **30 Day Map Challenge link:** the first card's `href`.
- **Colors / fonts:** the variables at the top of `styles.css`.
- **Real project images:** drop an image in `images/`, then in that card replace
  `<div class="thumb" data-art="...">` contents with `<img src="images/my-map.jpg" alt="">`.
  The generated placeholder art is skipped automatically when an `<img>` is present.
- **Résumé:** add `resume.pdf` to the repo root (linked in the footer).
