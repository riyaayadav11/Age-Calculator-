# Age Calculator

A simple, responsive web app that calculates your exact age from your date of birth, built with plain HTML, CSS and JavaScript (no frameworks, no dependencies).

## Features

- Exact age in years, months and days
- Total months, weeks and days lived
- Days remaining until your next birthday
- Optional "calculate age on" date (e.g. age on a future or past date)
- Validation for empty and future dates
- Responsive layout that works on phone and desktop

## Project Structure

```
age-calculator/
├── index.html   # page structure
├── style.css    # styling
├── script.js    # age calculation logic
└── README.md
```

## Run Locally

Just open `index.html` in any browser. No build step needed.

## Deploy on GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then save.
4. Your site will be live at `https://<your-username>.github.io/age-calculator/`.

## How the Age Is Calculated

The app subtracts the birth date from the target date field by field (year, month, day). If the day difference is negative, it borrows the number of days from the previous month; if the month difference is negative, it borrows 12 months from the years.

## Ideas to Extend

- Add a dark mode toggle
- Show the day of the week you were born
- Add zodiac sign or a birthday countdown timer
- Write unit tests for `calculateAge`

## License

MIT
