##Full Stack Shopping Cart Application
#This project is a full-stack shopping cart application designed to provide a seamless shopping experience. Built with a modern tech stack, it combines a fast, responsive frontend with a robust backend to handle data efficiently.

##Table of Contents
#Motivation
#Features
#Tech Stack
#Schema
#Setup and Installation
#API Design
#Endpoints
#Usage
#Motivation
#The primary motivation for this project was to gain hands-on experience with a full-stack development workflow and to create a practical e-commerce solution that could be customized or expanded. This project explores the integration of MongoDB, Node.js, Express.js, and React with Vite, emphasizing RESTful API design and modern front-end development.

##Features
#User Registration & Authentication: Users can create accounts, log in, and manage their profiles.
#Product Listings: Display a catalog of products with sorting and filtering options.
#Shopping Cart: Add, remove, and update products in the cart.
#Order Management: Place orders and view order history.
#Responsive UI: Mobile-friendly and optimized for performance.

##Tech Stack
#Frontend: React with Vite for rapid, optimized development.
#Backend: Node.js and Express.js to build REST APIs.
#Database: MongoDB for efficient data storage and retrieval.


##Schema
#User Schema
#The User schema is designed to store essential information about each user in the application, including their name, email, and password.

{
  "name": "string", // The full name of the user. Required for signup.
  "email": {
    "type": "string",
    "unique": true,
    "required": true
  },
  "password": "string" // Stores the hashed password of the user. Required for secure authentication.
}
#Collection: ShoppingCartAuthentication
#Fields:
#name: Required field for the user's full name.
#email: Unique and required field used for authentication and identification.
#password: Required field storing a securely hashed password using bcrypt.
