// src/routes/auth.js
const express = require("express");
const passport = require("passport");
const { generateAppleClientSecret } = require("../config/passport-strategies");
const router = express.Router();

// Initialize Apple Sign-in route
router.get(
  "/apple",
  passport.authenticate("apple", {
    scope: ["email", "name"],
  })
);

// Apple Sign-in callback route
router.post("/apple/callback", (req, res, next) => {
  console.log("📍 Apple callback received");

  // Generate new client secret for token exchange
  // const clientSecret = generateClientSecret();
  const clientSecret = generateAppleClientSecret();
  console.log("clientSecret", clientSecret);

  passport.authenticate(
    "apple",
    {
      clientSecret,
      session: false
    },
    async (err, user, info) => {
      console.log("📍 Authenticating with Apple...", err, user, info);
      try {
        if (err) {
          console.error("🔸 Authentication error:", err);
          return res.redirect(
            `${process.env.FRONTEND_URL}?error=${encodeURIComponent(
              err.message
            )}`
          );
        }

        if (!user) {
          console.error("🔸 No user returned from authentication");
          return res.redirect(
            `${process.env.FRONTEND_URL}?error=authentication_failed`
          );
        }

        const result = await authController.appleCallback({ user });

        if (!result || !result.token) {
          console.error("🔸 No token generated");
          return res.redirect(
            `${process.env.FRONTEND_URL}?error=token_generation_failed`
          );
        }

        const dashboardUrl = `${process.env.FRONTEND_URL}/dashboard?token=${result.token}`;
        console.log("📍 Redirecting to:", dashboardUrl);

        return res.redirect(dashboardUrl);
      } catch (error) {
        console.error("🔸 Error during Apple Callback:", error);
        return res.redirect(
          `${process.env.FRONTEND_URL}?error=callback_failed`
        );
      }
    }
  )(req, res, next);
});

// Success route
router.get("/success", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      success: true,
      user: req.user,
    });
  } else {
    res.redirect("/auth/apple");
  }
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect("/");
  });
});

module.exports = router;
