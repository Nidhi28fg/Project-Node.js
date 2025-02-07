// Import the express library
const express = require("express");
// Import the jsonwebtoken library
const jwt = require("jsonwebtoken");
// Create an instance of express application
const app = express();
// Use the express.json() middleware to parse the request body
app.use(express.json());
// Create an array to store the users username and password
const users = [];
// Create a secret key for the jwt token
const JWT_SECRET = "ilove100xdevsliveclasses";


// Create a middleware function to log the request method
function logger(req, res, next) {
    // Log the request method to the console
    console.log(`${req.method} request came`);
    // Call the next middleware function
    next();
}

// Create a get request for the root route
app.get("/", function (req, res) {
    // Send the index.html file to the client using the res.sendFile() function
    res.sendFile(__dirname + "/public/index.html");
});

// Create a post request for the signup route
app.post("/signup", logger, function (req, res) {
      // Get the username and password from the request body
    const { username, password } = req.body;
 // Check if the user is already exists in the users array or not
    if (users.find((user) => user.username === username)) {
        // Send a response to the client that the user is already signed up
        return res.status(400).json({ message: "Username already exists!" }); // 400 Bad Request
    }
// Check if the username has at least 5 characters or not
    if (username.length < 5) {
        // Send a response to the client that the username should have at least 5 characters
        return res.status(400).json({ message: "Username must be at least 5 characters long." });
    }
// Push the username and password to the users array
    users.push({ username, password });
    // Send a response to the client that the user has signed up successfully
    res.status(201).json({ message: "Signup successful!" }); // 201 Created
});


// Create a post request for the signin route
app.post("/signin", logger, function (req, res) {
     // Get the username and password from the request body
    const { username, password } = req.body;
    // Find the user in the users array with the given username and password
    const foundUser = users.find((user) => user.username === username && user.password === password);
// Check if the user is found or not
    if (foundUser) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ message: "Signin successful!", token });
    } else {
        res.status(401).json({ message: "Invalid username or password!" }); // 401 Unauthorized
    }
});


// Create a middleware function to authenticate the user
function auth(req, res, next) {
    // Get the token from the request headers
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header
// Check if the token is present or not
    if (!token) {
        return res.status(401).json({ message: "Token is missing!" });
    }
// Use a try-catch block to handle the error
    try {
        // Verify the token using the jwt.verify() function
        const decodedData = jwt.verify(token, JWT_SECRET);
        // Set the username in the request object
        req.username = decodedData.username;
        // Call the next middleware function
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token!" });
    }
}


// Create a get request for the me route
app.get("/me", logger, auth, function (req, res) {
     // Get the current user from the request object
     const currentUser = req.username;
     // Find the user in the users array with the given username
    const foundUser = users.find((user) => user.username === currentUser);

    // Check if the user is found or not
    if (foundUser) {
        // Send a response to the client with the username and password of the user
        res.json({ username: foundUser.username,
            password: foundUser.password,
         }); // Don't send the password back!
    } else {
        res.status(404).json({ message: "User not found!" }); // 404 Not Found
    }
});
// Start the server on port 3000
app.listen(3000, () => console.log("Server listening on port 3000"));