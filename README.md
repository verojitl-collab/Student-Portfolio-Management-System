# CampusFolio — Student Portfolio Management System

A mini-project built with HTML, CSS, browser JavaScript, Node.js, Express and MongoDB.

## Features
- Student registration and login (bcrypt password hashing)
- MongoDB-backed login sessions
- Student profile editing
- Education, skills, projects, certificates and achievements
- Admin student search and account management
- Frontend and backend validation
- Responsive dashboard UI

## Requirements
- Node.js 18 or newer
- MongoDB Community Server running locally
- npm

## Setup (Windows / VS Code)
1. Extract the ZIP and open the `student-portfolio-management` folder in VS Code.
2. Open a terminal in this folder and run `npm install`.
3. Copy `.env.example` to `.env`.
   - PowerShell: `Copy-Item .env.example .env`
   - Command Prompt: `copy .env.example .env`
4. Edit `.env`. Keep the local MongoDB URI as:
   `MONGO_URI=mongodb://127.0.0.1:27017/studentPortfolioDB`
5. Change `SESSION_SECRET` to a long random string.
6. Make sure MongoDB Community Server is running.
7. Start the app:
   - Development: `npm run dev`
   - Normal: `npm start`
8. Visit http://localhost:3000

MongoDB creates `studentPortfolioDB` and its collections after the first records are inserted.

## Create an administrator
1. Set `ADMIN_NAME`, `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`.
2. Use a strong admin password of at least 12 characters.
3. Run `npm run create-admin`.
4. Log in at http://localhost:3000/login.html using those credentials.
5. The admin shortcut appears on the dashboard.

Do not publish or share your `.env` file. Never commit real credentials to Git.

## Main routes
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a student |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/me` | Current account |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/portfolio` | Read current portfolio |
| PUT | `/api/portfolio` | Save portfolio |
| GET | `/api/admin/students?q=` | Admin search |
| DELETE | `/api/admin/students/:id` | Admin delete |

## Project structure
- `server.js` — Express app and MongoDB connection
- `models/Student.js` — Mongoose schema
- `routes/` — Authentication, portfolio and admin API routes
- `middleware/auth.js` — Authentication and admin authorization
- `scripts/create-admin.js` — Creates an administrator account
- `public/` — HTML, CSS and browser JavaScript

## Notes
This is an educational local-development project. Before public deployment, configure HTTPS, secure production cookies, CSRF protection, rate limiting, backups, and a production-grade hosting environment. The Google Fonts import is optional; the site uses fallback fonts if offline.
