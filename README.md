# MDB-frontend

The **React front-end scaffold for the MDB project**. It is a fresh [Create React App](https://create-react-app.dev/) setup (React 18, `react-scripts` 5) that is ready to build on — no application screens have been written yet, so running it shows the default CRA starter page.

Companion repository: [MDB-backend](https://github.com/SanaAkram/MDB-backend) — currently a placeholder as well (it only holds a README on the `stage` branch), so there is no API to connect to yet.

## Status

| Part | State |
|---|---|
| Build tooling (CRA, ESLint, Jest + Testing Library) | Ready |
| UI / routes / state | Not started — `src/App.js` is still the CRA template |
| API integration | Not started |

## Stack

React 18 · Create React App (`react-scripts` 5.0.1) · Jest + React Testing Library · web-vitals

## Project layout

```
public/            index.html, manifest.json, robots.txt
src/
├─ index.js        renders <App /> into #root
├─ App.js          starter component (replace with the real UI)
├─ App.css, index.css
├─ App.test.js     sample test
└─ setupTests.js   Testing Library / jest-dom setup
```

## Run it

Prerequisites: Node.js 16+ and npm.

```bash
git clone https://github.com/SanaAkram/MDB-frontend.git
cd MDB-frontend
npm install
npm start            # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm start` | Dev server with hot reload |
| `npm test` | Test runner in watch mode |
| `npm run build` | Production build into `build/` |

## Connecting to a backend (when it exists)

Create-React-App can proxy API calls in development. Once the backend is running, add its address to `package.json`:

```json
{ "proxy": "http://localhost:8000" }
```

and call it with relative URLs, e.g. `fetch("/api/<resource>")`. For production builds, put the API base URL in an environment variable (`REACT_APP_API_URL` in a `.env` file) and read it as `process.env.REACT_APP_API_URL`.
