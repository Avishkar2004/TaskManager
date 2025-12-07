# Task Manager Application

A full-stack, secure, and user-friendly CRUD application built with Next.js 16, TypeScript, and MongoDB. This application allows users to manage their tasks with complete authentication and authorization.

## Features

- ✅ **User Authentication**: Secure registration and login with JWT tokens
- ✅ **Task Management**: Create, Read, Update, and Delete tasks
- ✅ **User Interface**: Clean, responsive design using Tailwind CSS and shadcn/ui components
- ✅ **Data Validation**: Input validation using Zod schema validation
- ✅ **Security**: Password hashing with bcrypt, HTTP-only cookies for tokens
- ✅ **Type Safety**: Full TypeScript implementation
- ✅ **Error Handling**: Comprehensive error handling throughout the application

## Technology Stack

- **Frontend/Backend**: Next.js 16 with App Router
- **Language**: TypeScript
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Zod

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn
- MongoDB database (local or cloud like MongoDB Atlas)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Avishkar2004/TaskManager
cd task-manager-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_for_jwt_tokens
NODE_ENV=development
```

**Important Notes:**
- Replace `your_mongodb_connection_string` with your actual MongoDB connection string
- Replace `your_secret_key_for_jwt_tokens` with a strong, random secret key (at least 32 characters)
- For MongoDB Atlas, your connection string will look like: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
task-manager-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   └── tasks/        # Task CRUD endpoints
│   ├── dashboard/        # Dashboard page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page (login/register)
├── components/           # React components
│   ├── auth/            # Authentication components
│   ├── tasks/           # Task management components
│   └── ui/              # Reusable UI components
├── lib/                 # Utility functions
│   ├── models/         # TypeScript interfaces
│   ├── auth.ts         # Authentication utilities
│   ├── mongodb.ts      # MongoDB connection
│   └── utils.ts        # General utilities
└── public/             # Static files
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user information

### Tasks

- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/[id]` - Get a specific task
- `PUT /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt before storing in the database
2. **JWT Tokens**: Secure token-based authentication
3. **HTTP-Only Cookies**: Tokens stored in HTTP-only cookies to prevent XSS attacks
4. **Input Validation**: All inputs are validated using Zod schemas
5. **Authorization**: Users can only access their own tasks
6. **SQL Injection Prevention**: Using MongoDB's built-in protection and parameterized queries

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Deploy!

The application will be automatically deployed and available at a Vercel URL.

## Code Quality

- **TypeScript**: Full type safety throughout the application
- **Code Comments**: Well-documented code for easy understanding
- **Error Handling**: Comprehensive error handling in all API routes
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS
- **Accessibility**: Semantic HTML and ARIA labels where appropriate

## Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB connection string is correct
- Check if your IP address is whitelisted (for MongoDB Atlas)
- Verify your database credentials

### Authentication Issues
- Clear browser cookies and try again
- Check that JWT_SECRET is set in environment variables
- Verify token expiration settings
