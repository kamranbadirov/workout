# Kinetic

A simple, personalized workout web app.

Born out of frustration with the choice paralysis of today's fitness apps — where signal-to-noise ratio is overwhelming and only getting worse. This app offers a minimalist yet aesthetically pleasing and intuitive experience, with no ads, no clutter, just your workout.

## Pages

| Page | File | What it does |
|------|------|--------------|
| Home | `index.html` | Links to the three sections below. |
| Library | `builder.html` | Search the exercise list, filter by muscle group, and build your own session. |
| Routines | `routines.html` | Daily routines and stretches. |
| Premade | `premade.html` | The weekly program, one tab for each day. Tick exercises off, add your own, remove or reorder them. |
| Plans | `plans.html` | Past plans, read-only. |

Each exercise can show a short form cue and links to a YouTube search for its form. A stopwatch keeps running while you move between pages.

## Run it

There is no build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then go to `http://localhost:8000`.

## Your data

Everything is saved in the browser's `localStorage`: the sessions you build, what you ticked off today, your changes to the program, the stopwatch and the theme. Nothing is sent to a server, except the contact form, which posts to Web3Forms. Clearing the site data resets the app.

## Themes

Three themes: Gentler (the default), Kinetic and Things. Pick one in the header. Click the logo to switch between light and dark.

## Files

| File | Contents |
|------|----------|
| `exercises.js` | The exercise list for the library. |
| `cues.js` | Form cues by exercise name. |
| `script.js` | The weekly program and the Premade page. |
| `builder.js` | The Library page. |
| `routines.js`, `stability.js` | The Routines page. |
| `plans.js` | Past plans. |
| `extras.js` | Cues and the stopwatch, shared by the pages. |
| `theme.js`, `style.css`, `theme-*.css` | Themes and styles. |
