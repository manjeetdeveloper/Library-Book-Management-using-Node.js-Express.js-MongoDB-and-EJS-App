# Library Book Management App

A full-stack **CRUD** application to manage a library of books, built with **Node.js**, **Express.js**, **MongoDB**, and **EJS**. This app allows users to create, read, update, and delete book records in a streamlined and user-friendly interface.

---

## Project Overview

This application is designed to help manage a collection of books in a digital library. It features:

- Backend server built with **Node.js** and **Express.js**
- **MongoDB** as the database, with **Mongoose** as the ODM
- Frontend views rendered using **EJS (Embedded JavaScript)**
- Middleware support via **body-parser** and **method-override**

---

##  Technologies Used

| Technology       | Purpose                             |
|------------------|-------------------------------------|
| **Node.js**      | JavaScript runtime environment      |
| **Express.js**   | Web framework for Node.js           |
| **MongoDB**      | NoSQL database                      |
| **Mongoose**     | ODM for MongoDB                     |
| **EJS**          | Templating engine for views         |
| **Body-parser**  | Parses incoming request bodies      |
| **Method-override** | Allows use of PUT and DELETE in forms |

---

##  Core Features

- **View all books** (Index page)
- **Add a new book** (Create functionality)
- **View detailed book information** (Show page)
- **Edit book details** (Update functionality)
- **Delete a book** (Delete functionality)

---

PPT Of this App:- https://docs.google.com/presentation/d/1IqAThM_Qxd2JqELl1g1FkkCwKv_a9wnm/edit?usp=sharing&ouid=107538093348508842546&rtpof=true&sd=true

##  MongoDB Connection

The app uses `mongoose.connect()` to establish a connection with MongoDB.

- Connection URI is taken from a `.env` file or defaults to `mongodb://localhost:27017/libraryDB`
- `serverSelectionTimeoutMS` is added for better error handling on connection timeouts

Example:
```javascript
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/libraryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
});
```

![Screenshot 2025-04-23 085243](https://github.com/user-attachments/assets/41492d92-cda6-490b-9893-798e6d256242)
![Screenshot 2025-04-23 085257](https://github.com/user-attachments/assets/140b5907-1e69-411a-a379-a94b3e2a6536)
![Screenshot 2025-04-23 085228](https://github.com/user-attachments/assets/c50b1a9b-7a7d-4fe8-9d8b-08aa93b89d56)
![image](https://github.com/user-attachments/assets/4567df4f-4d31-449a-8b20-b1bbd40b2c14)





