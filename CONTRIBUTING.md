# Contribution / Codebase Comprehension Guide

## Requirements
- Node.js
- npm
- Cargo (if compiling Tauri)

---

## Develop or Build

### Frontend or Backend
1. Navigate to either `apps/web` (frontend) or `backend` (backend).
2. Install dependencies:

```bash
npm install
```
3. Depending on your use case, run either:
```bash
npm run build   # To build the project
npm run dev     # To run in development mode
```

### Tauri (Desktop)
1. Navigate to `apps/web`.
2. Install dependencies:
```bash
npm install
```

## Codebase reference

### Frontend
* Located at apps/web.
* Built entirely with TypeScript and SvelteKit.
* Desktop client support is available via Tauri at apps/desktop.

### Backend
* Located at backend.
* Built with Node.js and TypeScript.
* Supports dynamic routing and modular route registration.