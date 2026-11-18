# Agniraksha Fireguard

A responsive software dashboard for the **Community Gas Leakage & Fire Hazard Early Warning Guard** project. The attached abstract's Raspberry Pi, MQ-2, DS18B20, buzzer, exhaust fan and 12V solenoid valve inform the UI. Current readings and controller status are demonstration data; no physical equipment is connected by this prototype.

## Run locally

Requires Node.js 18 or newer (built-in `fetch`; no package installation needed).

```powershell
cd fireguard
node server.js
```

Open http://localhost:4173. The server reads `GROQ_API_KEY` from the ignored local `.env.local` file (or from the process environment). Never add credentials to client-side files or commit `.env.local`.

## Deploy on Vercel

The site is static HTML/CSS/JavaScript with a serverless chat endpoint at `api/chat.js`. Import this folder as the Vercel project root, leave the framework preset as **Other**, and add `GROQ_API_KEY` under **Project Settings → Environment Variables** for Production (and Preview if needed). Add `GROQ_MODEL` as `llama-3.3-70b-versatile` if you want to pin the model. Redeploy after adding variables. The key must only exist as a Vercel environment variable and in the ignored local `.env.local` file.

## Features

1. Live-style combustible gas (MQ-2) reading with ppm scale and alert threshold.
2. Ambient temperature (DS18B20) reading with normal range and alert threshold.
3. Smoke index reading with clean-air and alert ranges.
4. Raspberry Pi controller status, uptime, signal quality and firmware display.
5. Overall system posture and online indicator.
6. Manual refresh for simulated sensor readings.
7. Armed local buzzer status and control.
8. Armed exhaust fan status and control.
9. Gas shutoff solenoid valve status and control.
10. Recent system self-check, arming, calibration and connectivity timeline.
11. Firewise assistant chat with LPG and fire safety fallback responses.
12. Optional Groq chat completions through a server-side API proxy.
13. Light and dark themes, with dark mode as the default.
14. Responsive desktop, tablet and mobile layouts.
15. Safety notes that distinguish the software demo from connected hardware and emergency response.
16. Incident-scale fire guidance with separate during-fire and troubleshooting checklists for home, apartment, workplace, and industrial sites.
17. Gelato-inspired pastel theme with rounded Fredoka display typography.
18. Separate dashboard, sensor, fire response, activity, and assistant pages.

## Hardware integration boundary

The dashboard is presently a front-end prototype. To connect the Raspberry Pi, replace the sample values in `app.js` with readings from an authenticated device endpoint and implement server-side routes for telemetry and actuator commands. Add a physical emergency design review, sensor calibration, threshold validation, fault handling, and fail-safe testing before connecting any real gas equipment. Browser switches in this version only demonstrate controls; they do not operate a valve, fan, or buzzer.

## Structure

- `index.html` — dashboard markup
- `monitor.html`, `response.html`, `activity.html`, `assistant.html` — dedicated navigation pages
- `style.css` — glass / soft-relief visual system and responsive themes
- `app.js` — demo interactions and chat client
- `server.js` — static server and optional Groq proxy
- `api/chat.js` — Vercel serverless Groq proxy
