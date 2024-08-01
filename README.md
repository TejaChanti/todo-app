# To-Do List Application

This project is a basic To-Do list application that allows users to register, login, and manage their to-do items. The backend is built using Node.js, Supabase, and MongoDB, and is deployed on Render. The frontend is built using React and is deployed on Vercel.

## Backend Deployment on Render

### Setup Render Account:
1. Sign up for an account at [Render](https://render.com/).

### Create a New Web Service:
1. Go to the Render dashboard.
2. Click on "New" and then "Web Service".
3. Connect your GitHub repository that contains the backend code.
4. Select the branch you want to deploy from.

### Configure the Service:
1. Set the **Name** for your service.
2. Choose **Environment**: Select the runtime environment (e.g., Node).
3. Set the **Build Command**: `npm install`
4. Set the **Start Command**: `npm start`

### Add Environment Variables:
1. In the "Environment" tab, add the necessary environment variables for your application (e.g., MongoDB connection string, Supabase credentials).

### Deploy:
1. Click "Create Web Service" and Render will automatically build and deploy your backend.

### Verify Deployment:
1. Once the deployment is complete, you will get a URL for your backend service. Make sure it’s accessible.

## Frontend Deployment on Vercel

### Setup Vercel Account:
1. Sign up for an account at [Vercel](https://vercel.com/).

### Create a New Project:
1. Go to the Vercel dashboard.
2. Click on "New Project".

### Connect GitHub Repository:
1. Connect your GitHub repository that contains the frontend code.
2. Select the branch you want to deploy from.

### Configure the Build Settings:
1. Vercel will automatically detect the build settings for React projects.
2. Confirm the **Build Command**: `npm run build`
3. Confirm the **Output Directory**: `build`

### Deploy:
1. Click "Deploy" and Vercel will automatically build and deploy your frontend.

### Verify Deployment:
1. Once the deployment is complete, you will get a URL for your frontend application. Make sure it’s accessible.

## Links to Deployed Applications

- **Backend (Render):**
  - URL: [https://todo-app-backend-j4xg.onrender.com](https://todo-app-backend-j4xg.onrender.com) (Replace with your actual URL)

- **Frontend (Vercel):**
  - URL: [https://todo-app-frontend-zeta.vercel.app](https://todo-app-frontend-zeta.vercel.app) (Replace with your actual URL)

## API Documentation

### User Registration
- **POST /register**
  - Request Body: `{ "email": "user@example.com", "password": "password" }`
  - Response: `{ "message": "User registered successfully" }`

### User Login
- **POST /login**
  - Request Body: `{ "email": "user@example.com", "password": "password" }`
  - Response: `{ "token": "jwt_token", "message": "Login successful" }`

### Create To-Do Item
- **POST /todos**
  - Headers: `Authorization: Bearer jwt_token`
  - Request Body: `{ "title": "New To-Do" }`
  - Response: `{ "userId": "user_id", "title": "New To-Do", "completed": false, "_id": "todo_id" }`

### Get All To-Do Items
- **GET /todos**
  - Headers: `Authorization: Bearer jwt_token`
  - Response: `[{ "userId": "user_id", "title": "New To-Do", "completed": false, "_id": "todo_id" }]`

### Update To-Do Item
- **PUT /todos/:id**
  - Headers: `Authorization: Bearer jwt_token`
  - Request Body: `{ "title": "Updated To-Do", "completed": true }`
  - Response: `{ "userId": "user_id", "title": "Updated To-Do", "completed": true, "_id": "todo_id" }`

### Delete To-Do Item
- **DELETE /todos/:id**
  - Headers: `Authorization: Bearer jwt_token`
  - Response: `{ "message": "To-Do item deleted" }`

### Get All User Sessions
- **GET /sessions**
  - Headers: `Authorization: Bearer jwt_token`
  - Response: `[{ "userId": "user_id", "loginTime": "time", "logoutTime": "time", "ipAddress": "ip" }]`

## Installation

### Backend

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/mern-app.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the backend server:
    ```bash
    npm start
    ```
### Frontend

1. Install dependencies:
    ```bash
    npm install
    ```

2. Start the React development server:
    ```bash
    npm start
    ```
