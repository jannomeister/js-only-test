# Inventory Tracker

A small inventory page built with plain HTML, CSS, and JavaScript (no framework). It shows the current Pacific time, lets you add items with quantity and price, and keeps running totals at the top.

## Features

- Live **Pacific Time** clock
- **Total Leftover** — sum of all item quantities
- **Leftover Value** — total worth of remaining inventory (`quantity × price`)
- Add, delete, and **Use** items; totals update instantly without reloading

## How to Run

### Option 1: Open directly

Double-click `index.html` or open it in your browser:

```
file:///path/to/js-only-test-2/index.html
```

### Option 2: Local server (recommended)

From the project folder:

```bash
npx serve .
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

## Project Files

| File         | Purpose                          |
| ------------ | -------------------------------- |
| `index.html` | Page structure                   |
| `styles.css` | Layout and styling               |
| `app.js`     | Inventory logic and DOM updates  |

No install step or build step required.
