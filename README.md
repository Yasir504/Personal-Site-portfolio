# Personal-Site-portfolio

A modern, responsive one-page portfolio for **BluePrintWebDeveloper**. Includes hero, services, portfolio highlights, testimonials, and a contact section with clickable phone, email, and Instagram links.

## Structure
- `index.html` — Main page markup.
- `assets/css/style.css` — Styling with gradients, animations, and responsive layout.
- `assets/js/main.js` — Interactivity for nav state, counters, form demo, and animations.

## Running
Open `index.html` directly in your browser or serve locally (e.g., `python -m http.server`).

## Pushing to GitHub
If you don’t see the new files or commits on GitHub yet, it usually means the local branch hasn’t been pushed to a remote. Verify your remote and push:

1. Check for an existing remote:
   ```bash
   git remote -v
   ```
   If nothing is listed, add your GitHub URL:
   ```bash
   git remote add origin <YOUR_REPO_URL>
   ```

2. Push the current branch (default here is `work`) to GitHub:
   ```bash
   git push -u origin work
   ```
   If you prefer `main`, push and set upstream to that instead:
   ```bash
   git push -u origin main
   ```

3. Refresh the branch view on GitHub to see the commits and files. If you pushed to `work`, select that branch in the GitHub UI to view the updates.
