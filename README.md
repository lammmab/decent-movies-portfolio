# Decentralized Movies
The final portfolio project version of my decentralized movies repository

## Description
Decentralized movies is a full-stack, decentralized movie platform written entirely by me.
My choice of stack is Node.JS, with SvelteKit for the frontend, and an Electron/Capacitor wrapper for cross-platform support.

Features:
- Centralized login / AUTH / saves server for persistent progress across backends
- Decentralized backend server with easy plugin support for providing content from sources
- Partly centralized frontend that can be spun up to connect to the login and backend servers.

## Dev Roadmap:

SvelteKit frontend:
Create prefabs and templates for:
- settings page, title cards, title details page,
- season / episode cards,
- row with title + cards + a scroll button for overflow
- video player page with server switching, captions? etc

NodeJS decentralized backend:
- Easy to use plugin service
- Endpoint for authenticating with specific backend
- Endpoints for searching, getting servers, subtitles, whatever
- Admin users by email

Authentication / storage backend:
- Stores usernames, unique ID, passwords, avatar urls, and watch data
