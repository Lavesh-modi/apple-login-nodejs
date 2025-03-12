# Apple Login Node.js 🍎

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

<div align="center">
  <img src="https://developer.apple.com/assets/elements/badges/sign-in-with-apple.svg" alt="Sign in with Apple" width="200"/>
  <p>A robust and secure implementation of Apple Sign-in authentication using Node.js and Passport.js.</p>
</div>

## ✨ Features

- 🔐 Secure Apple Sign-in authentication
- 🚀 Express.js server with modern setup
- 📝 Session management and persistence
- 🎯 JWT token handling for secure communications
- 🌐 CORS support for cross-origin requests
- ⚙️ Environment-based configuration
- 📱 Mobile-friendly authentication flow

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- npm or pnpm
- Apple Developer Account
- Apple Sign-in credentials (Client ID, Team ID, Key ID, and Private Key)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd apple-login-nodejs
```

2. Install dependencies:
```bash
npm install
# or using pnpm
pnpm install
```

3. Copy the environment variables file:
```bash
cp .env.sample .env
```

4. Update the `.env` file with your credentials (see Configuration section)

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
# or
pnpm dev
```

### Production Mode
```bash
npm start
# or
pnpm start
```

## 📁 Project Structure

```
apple-login-nodejs/
├── src/               # Source files
│   └── index.js      # Main application entry
├── .env              # Environment variables
├── .env.sample       # Environment variables template
├── .gitignore        # Git ignore rules
├── package.json      # Project dependencies
└── README.md         # Project documentation
```

## 🔧 Apple Developer Console Configuration

### 1. Create an Apple Developer Account
1. Visit [Apple Developer Program](https://developer.apple.com/programs/)
2. Sign up or sign in to your account
3. Enroll in the Apple Developer Program if not already enrolled

### 2. Configure Sign in with Apple
1. Go to [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources)
2. Navigate to "Identifiers" in the left sidebar
3. Click the "+" button to register a new identifier
4. Select "App IDs" and click "Continue"
5. Choose "App" as the type and click "Continue"
6. Fill in the following:
   - Description: Your app name
   - Bundle ID: e.g., `com.yourcompany.appname`
7. Scroll to "Capabilities" and enable "Sign In with Apple"
8. Click "Continue" and then "Register"

### 3. Create Service ID
1. Back in "Identifiers", click "+" again
2. Select "Services IDs" and click "Continue"
3. Fill in:
   - Description: Your service name
   - Identifier: e.g., `com.yourcompany.appname.service`
4. Click "Continue" and then "Register"
5. Click on the newly created Service ID
6. Enable "Sign In with Apple" and click "Configure"
7. Add your domain and return URLs:
   - Domains: Your app's domain
   - Return URLs: Your callback URL (e.g., `http://localhost:5000/auth/apple/callback`)

### 4. Generate Private Key
1. Go to "Keys" in the left sidebar
2. Click "+" to add a new key
3. Enter a name for your key
4. Enable "Sign In with Apple"
5. Click "Configure" and select your primary App ID
6. Click "Save" and then "Continue"
7. Click "Register" and then "Download"
8. Save the downloaded key (it can only be downloaded once)
9. Note the Key ID shown on the page

### 5. Collect Credentials
You'll need the following credentials for your `.env` file:
- `APPLE_CLIENT_ID`: Your Services ID (e.g., `com.yourcompany.appname.service`)
- `APPLE_TEAM_ID`: Found in the top-right corner of the developer console
- `APPLE_KEY_ID`: The ID of the key you generated
- `APPLE_PRIVATE_KEY_PATH`: Path to your downloaded private key file

## 🔐 Environment Variables

Create a `.env` file with the following variables:
```env
# Server Configuration
PORT=5000
NODE_ENV=development
SESSION_SECRET=your_session_secret_here
FRONTEND_URL=http://localhost:3000

# Apple Configuration
APPLE_CLIENT_ID=your_apple_client_id
APPLE_TEAM_ID=your_apple_team_id
APPLE_KEY_ID=your_apple_key_id
APPLE_PRIVATE_KEY_PATH=path_to_your_private_key.p8
APPLE_CALLBACK_URL=http://localhost:5000/auth/apple/callback
```

## 📚 Dependencies

### Core Dependencies
- `express` - Fast, unopinionated web framework
- `passport` - Authentication middleware
- `passport-apple` - Apple authentication strategy
- `jsonwebtoken` - JWT implementation
- `express-session` - Session middleware
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment management
- `body-parser` - Request parsing

### Development Dependencies
- `nodemon` - Development server with hot reload

## 🔒 Security Best Practices

- Never commit `.env` file or private keys
- Use HTTPS in production
- Implement proper session management
- Regularly rotate keys and secrets
- Follow [Apple's security guidelines](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api/authenticating_users_with_sign_in_with_apple)

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Apple Developer Documentation](https://developer.apple.com/documentation/sign_in_with_apple)
- [Passport.js](http://www.passportjs.org/)
- [Express.js](https://expressjs.com/) 