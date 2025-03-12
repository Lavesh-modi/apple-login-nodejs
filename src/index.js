// src/index.js
const express = require("express");
const passport = require("./config/passport-strategies");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

console.log("in the route")
// Routes
app.get('/auth/apple', passport.authenticate('apple', { scope: ['email', 'name'] }));

// Apple Callback Route
app.post('/auth/apple/callback', passport.authenticate('apple', { failureRedirect: '/' }), (req, res) => {
  res.json({ message: 'Logged in with Apple', user: req.user });
});

// Basic route
app.get("/", (req, res) => {
  res.send('<a href="/auth/apple">Sign in with Apple</a>');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
