
# Contact Management System

A simple contact management application built with React (frontend), Node.js (backend), and MongoDB (database). This app allows users to add, edit, view, and delete contact information.

## Setup Instructions

### Prerequisites
- Node.js 
- MongoDB (local or MongoDB Atlas for cloud)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/contact-management-app.git
cd contact-management-app
```

### 2. Set Up the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MongoDB URI in `.env`:
   ```
   MONGODB_URI=your-mongodb-uri
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### 3. Set Up the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

### 4. Access the App
- Frontend: `http://localhost:3000`

## Database Documentation

### MongoDB Schema
The database is a MongoDB instance storing contact data with the following schema:

```js
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
});
```

### MongoDB Choice
MongoDB is used because it provides flexibility and scalability with its document-based storage. It is well-suited for the dynamic nature of contact data, allowing for easy addition of new fields in the future.

## Project Structure

```
/contact-management-app
├── /backend
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   ├── server.js
│   └── .env
├── /frontend
│   ├── /src
│   │   ├── /components
│   │   ├── /App.js
│   │   ├── /App.css
│   │   └── /api.js
└── README.md
```

