# DataCave – Full Stack Contact Dashboard

## 1. What is this project ?

**DataCave** is a full-stack web application that combines a **secure DATA manager concept** with a **contact messaging system and admin dashboard**.

Users can:

* Create an account and log in securely.
* Send messages through a contact form (with or without login).
* View their own submitted messages after logging in.

Admins can:

* View all messages submitted by users.
* Manage and monitor user interactions through a dashboard.

---

## 2. Technologies Used :

###  Frontend

* React.js (Vite)
* React Router DOM
* React Hook Form (form handling & validation)
* Axios (API requests)
* Bootstrap (UI styling)

###  Authentication

* Firebase Authentication

  * Email & Password login/signup

###  Backend

* Node.js
* Express.js

###  Database

* MongoDB Atlas (Cloud Database)
* Mongoose (ODM)

###  Middleware & Tools

* CORS (Cross-Origin Resource Sharing)
* dotenv
* Express JSON middleware

---

## 3. Installation & Setup Guide :

Follow these steps to run the project locally:

---

###  Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/datacave.git
cd datacave
```

---

###  Step 2: Install Dependencies

####  Frontend

```bash
npm install
```

####  Backend

```bash
cd ../server
npm install
```

---

<!-- ### 🔑 Step 3: Setup Environment Variables

Create a `.env` file inside the **server** folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
ADMIN_EMAIL=your_admin_email@gmail.com
```

⚠️ Never share your real credentials publicly.

--- -->

<!-- ###  Step 4: Setup Firebase

1. Go to Firebase Console
2. Create a project
3. Enable Email/Password Authentication
4. Copy your Firebase config

Create a `firebase.js` file inside frontend:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

--- -->

### Step 3: Run the Project :

#### Start Backend Server

```bash
cd server
node server.js
```

#### Start Frontend

```bash
cd client
npm run dev
```

---

###  Step 6: Open in Browser

```
http://localhost:5173
```


####  NOTE

This project was great test for my Back-End skills. It was great learning experience for me as well, and as i have mentioned in the code also, i have used ``chatGPT`` for better understanding and enhencing the codes.

``
I am a Learner, and i believe in completing the task.
``