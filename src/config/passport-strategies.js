const passport = require('passport');
const AppleStrategy = require('passport-apple');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

// Read the Apple private key from file
const privateKeyPath = path.join(__dirname, process.env.APPLE_PRIVATE_KEY_PATH);
// const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
console.log(path.join(__dirname, 'Auth.p8'),"in the str") 
passport.use(new AppleStrategy(
  {
    clientID: process.env.APPLE_CLIENT_ID,
    teamID: process.env.APPLE_TEAM_ID,
    keyID: process.env.APPLE_KEY_ID,
    privateKeyLocation: path.join(__dirname, 'Auth.p8'),
    callbackURL: process.env.APPLE_CALLBACK_URL,
    scope: ['name', 'email'],
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, idToken, profile, done) => {
    try {
console.log(accessToken,"accesstoken")
console.log(refreshToken,"refersh")
      // const decoded = jwt.decode(idToken);
      // console.log("Decoded Apple ID Token:", decoded);

      // // Extract name and email (if available)
      // const user = {
      //   id: decoded.sub,
      //   email: decoded.email || null,
      //   name: profile.name || decoded.name || "Unknown",
      // };

      // console.log("Apple User:", user);
      // console.log("Apple Profile:", profile);

      const decoded = jwt.decode(idToken);
      console.log("Decoded Apple ID Token:", decoded);

      let userName = "Unknown";
      if (profile && profile.name && profile.name.firstName) {
        userName = `${profile.name.firstName} ${profile.name.lastName}`;
      }

      const user = {
        id: decoded.sub,
        email: decoded.email || null,
        name: userName,
      };
console.log(user, "user")
      return done(null, profile);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
