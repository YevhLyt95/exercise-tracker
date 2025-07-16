# Exercise Tracker

This is the boilerplate for the Exercise Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker
# Exercise Tracker Microservice 🏋️

Full-stack JavaScript API for tracking user exercises.  
Built as part of the freeCodeCamp Back-End Certification.

## 🔧 Technologies

- Node.js
- Express
- MongoDB Atlas (via Mongoose)
- dotenv

## 📦 API Endpoints

### Create User

`POST /api/users`  
**Body:** `username=John`  
**Response:**
```json
{ "username": "John", "_id": "..." }