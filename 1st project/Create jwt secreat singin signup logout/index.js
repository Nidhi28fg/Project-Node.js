const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const users = [];
const JWT_SECRET = "ilove100xdevsliveclasses";

function logger(req, res, next) {
    console.log(`${req.method} request came`);
    next();
}

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", logger, function (req, res) {
    const { username, password } = req.body;

    if (users.find((user) => user.username === username)) {
        return res.status(400).json({ message: "Username already exists!" }); // 400 Bad Request
    }

    if (username.length < 5) {
        return res.status(400).json({ message: "Username must be at least 5 characters long." });
    }

    users.push({ username, password });
    res.status(201).json({ message: "Signup successful!" }); // 201 Created
});

app.post("/signin", logger, function (req, res) {
    const { username, password } = req.body;
    const foundUser = users.find((user) => user.username === username && user.password === password);

    if (foundUser) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ message: "Signin successful!", token });
    } else {
        res.status(401).json({ message: "Invalid username or password!" }); // 401 Unauthorized
    }
});

function auth(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: "Token is missing!" });
    }

    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        req.username = decodedData.username;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token!" });
    }
}

app.get("/me", logger, auth, function (req, res) {
    const foundUser = users.find((user) => user.username === req.username);

    if (foundUser) {
        res.json({ username: foundUser.username }); // Don't send the password back!
    } else {
        res.status(404).json({ message: "User not found!" }); // 404 Not Found
    }
});

app.listen(3000, () => console.log("Server listening on port 3000"));