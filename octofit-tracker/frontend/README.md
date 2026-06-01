# OctoFit Tracker Frontend

This React 19 presentation tier uses react-router-dom and Bootstrap to render Users, Activities, Teams, Leaderboard, and Workouts views.

## Environment variable

Define VITE_CODESPACE_NAME in .env.local for Codespaces URL generation.

Example .env.local:

VITE_CODESPACE_NAME=your-codespace-name

When VITE_CODESPACE_NAME is set, the frontend calls:

https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/

When VITE_CODESPACE_NAME is not set, the frontend safely falls back to:

http://localhost:8000/api/[component]/

This avoids generating invalid URLs like https://undefined-8000.app.github.dev.
