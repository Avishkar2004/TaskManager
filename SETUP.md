# Quick Setup Guide

This guide will help you get the Task Manager application up and running quickly.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up MongoDB

You have two options:

### Option A: MongoDB Atlas (Cloud - Recommended for beginners)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier is fine)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `taskmanager`

### Option B: Local MongoDB

1. Install MongoDB on your computer
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/taskmanager`

## Step 3: Create Environment File

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and fill in:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Generate a random string (you can use: `openssl rand -base64 32`)

## Step 4: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Create Your First Account

1. Click "Register" on the home page
2. Fill in your name, email, and password
3. You'll be automatically logged in and redirected to the dashboard

## That's It!

You can now:
- Create tasks
- Edit tasks
- Mark tasks as complete
- Delete tasks
- Logout and login again

## Troubleshooting

**MongoDB Connection Error:**
- Check your connection string is correct
- For Atlas: Make sure your IP is whitelisted (use 0.0.0.0/0 for testing)
- For local: Make sure MongoDB service is running

**Port Already in Use:**
- Change the port: `npm run dev -- -p 3001`

**Build Errors:**
- Delete `node_modules` and `.next` folder
- Run `npm install` again

## Need Help?

Check the main README.md for more detailed information.

