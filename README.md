# Captain's Voyage — Sailing Portfolio

A MERN-stack interactive portfolio: your visitor sails a ship through a
side-scrolling ocean, docking at islands for About, each Project, Skills,
and Socials. You edit everything (projects, socials, about text) from a
hidden admin panel — **Captain's Quarters** — no redeploy needed.

## Stack
- **Frontend:** React + Vite, plain CSS (no framework), axios
- **Backend:** Node + Express, JWT auth
- **Database:** MongoDB (Atlas free tier works fine)

## Project structure
```
sailing-portfolio/
  backend/     Express API + MongoDB models
  frontend/    React app (the sailing scene + admin panel)
```

## 1. Set up MongoDB
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user + password
3. Allow network access from anywhere (0.0.0.0/0) for now, or your deploy host's IP
4. Copy the connection string — you'll need it for `MONGO_URI`

## 2. Run the backend locally
```bash
cd backend
npm install
cp .env.example .env
# edit .env: paste your MONGO_URI, set a JWT_SECRET, set ADMIN_USERNAME/PASSWORD
npm run seed    # creates your admin login + a couple of sample entries
npm run dev     # starts on http://localhost:5000
```

## 3. Run the frontend locally
```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:5000/api
npm run dev             # starts on http://localhost:5173
```

Open http://localhost:5173 — you should see the ship sailing. Click the
**⚓ Captain's Quarters** button bottom-right, log in with the
`ADMIN_USERNAME` / `ADMIN_PASSWORD` you set, and add/edit/delete your real
projects and socials. Everything updates live — no code changes needed.

## 4. Deploy

**Backend → Render (or Railway/Fly.io)**
1. Push `backend/` to a GitHub repo (or a `backend` subfolder of one repo)
2. New Web Service on Render, root directory `backend`
3. Build command: `npm install` — Start command: `npm start`
4. Add the same env vars from `.env` in Render's dashboard
5. After first deploy, run `npm run seed` once (Render's shell tab, or run
   locally pointed at the production `MONGO_URI`) to create your admin login

**Frontend → Vercel**
1. Import the repo, root directory `frontend`
2. Framework preset: Vite
3. Add env var `VITE_API_URL` = your Render backend URL + `/api`
   (e.g. `https://your-backend.onrender.com/api`)
4. Deploy

**Don't forget:** update `CLIENT_ORIGIN` in the backend's env vars to your
deployed Vercel URL, so CORS allows it.

## Customizing the theme
Colors, fonts, and spacing all live in `frontend/src/styles/global.css`
under `:root`. Change the six color variables at the top to reskin the
whole voyage without touching components.

## Adding more islands
Each section (About, Skills, Socials) is its own component in
`frontend/src/components/`. Projects are generated automatically — one
island per project in your database, ordered by the `order` field you set
in the admin panel.
