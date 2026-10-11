# The Last Lantern

A short browser adventure: explore a moonlit forest, collect clues, and recover your village's lost light. Includes branching paths, inventory, two endings, and a restart button.

## Run

No package installation, account, or API key is needed. Open `index.html` in a browser, or serve the project:

```sh
cd /workspace/Adventure-Game
python3 -m http.server 8000 --bind 0.0.0.0
```

## Develop

Edit `game.js` for the story, `style.css` for appearance, and `index.html` for the page structure. Reload the browser after changes.

## Validate

```sh
node --check game.js
node --test tests/game.test.cjs
```

The tests exercise the winning and losing paths, key-gated tower, missing-item behavior, and restart.
