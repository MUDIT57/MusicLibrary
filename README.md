## How to Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/MUDIT57/MusicLibrary.git
```

2. **Navigate to the Main App and install dependencies**

```bash
cd MusicLibrary/main-app
npm install
```
3. **Run the Main App**
   
 ```bash
  npm run dev
```
4. Open in browser
   Visit: http://localhost:5000
```bash

You will see two login options: Login as User or Login as Admin.

After logging in, you will be redirected to the Music Library Micro Frontend (loaded dynamically from its deployment on Vercel).
```

## How I Deployed It

Deployed both apps on Vercel:

- **Main App**: https://music-library-72nesq991-mudit57s-projects.vercel.app
- **Micro Frontend (Music Library)**: https://music-library-59si-rklg2mckw-mudit57s-projects.vercel.app

Used Module Federation to integrate the Micro Frontend into the Main App.

### Main App Vite Plugin Configuration

```javascript
plugins: [
  react(),
  federation({
    remotes: {
      musicLibrary: "https://music-library-59si.vercel.app/assets/remoteEntry.js",
    },
    shared: ['react', 'react-dom'],
  }),
],
```
When users open the Main App, it dynamically loads the Music Library from its deployment URL.

## Credentials for Demo

No credentials are needed.

Simply click on Login as User or Login as Admin.

Admin users have the option to add and delete songs, while User can only view and filter songs.

## How Micro Frontend and Role-Based Auth Work

### Micro Frontend

The Music Library is a separate React app deployed independently.

The Main App dynamically loads it using Module Federation.

This allows both apps to be updated or deployed separately without affecting each other.

### Role-Based Authentication

Users can log in as User or Admin using a mock in-memory system.

The role is stored in the app (localStorage).

Based on the role:

- **User**: Can view and filter songs.
- **Admin**: Can view, filter, add, and delete songs.

