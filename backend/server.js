const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- Environment Variable Validation ---
const requiredEnv = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'JWT_SECRET', 'FRONTEND_URL', 'BACKEND_URL'];
const missingEnv = requiredEnv.filter(v => !process.env[v]);
if (missingEnv.length > 0) {
    console.error(`❌ FATAL ERROR: Missing required environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
}

// Trust proxy for production (Cloudflare + Nginx)
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 2); // Cloudflare + Nginx
}

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Disable caching for all API and auth routes
const noCache = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
};
app.use('/api', noCache);
app.use('/auth', noCache);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Passport & JWT Configuration ---
app.use(passport.initialize());

// Allowed family emails
const allowedEmails = process.env.ALLOWED_EMAILS ? 
    process.env.ALLOWED_EMAILS.split(',').map(email => email.trim().toLowerCase()) : 
    [];

// Google OAuth Strategy (for initial login)
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value.toLowerCase();
        if (!allowedEmails.includes(email)) {
            return done(null, false, { message: 'Email not authorized for family access' });
        }
        const user = {
            id: profile.id,
            email: email,
            name: profile.displayName,
            photo: profile.photos[0]?.value || null,
            provider: 'google'
        };
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

// JWT Strategy (for protecting API routes)
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    // We can trust the payload because it's been verified.
    // The payload contains the user object we signed earlier.
    return done(null, jwt_payload.user);
}));

// Middleware to protect routes using JWT
const ensureAuthenticated = passport.authenticate('jwt', { session: false });

// --- Routes ---

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Get current user info (replaces /auth/status)
app.get('/auth/me', ensureAuthenticated, (req, res) => {
    // If ensureAuthenticated passes, req.user is populated from the JWT
    res.json({
        authenticated: true,
        user: {
            name: req.user.name,
            email: req.user.email,
            photo: req.user.photo
        }
    });
});

// Google OAuth routes
// Step 1: Redirect user to Google to sign in
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false, // We are not using sessions
        prompt: 'select_account' // This forces the account chooser to appear every time
    })
);

// Step 2: Google redirects back to this callback
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure', session: false }),
    (req, res) => {
        // Successful authentication! Now, create a JWT.
        const payload = { user: req.user };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h' // Token expires in 24 hours
        });

        // Redirect to the frontend, passing the token in the URL
        res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
    }
);

// Authentication failure
app.get('/auth/failure', (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/login.html?error=unauthorized`);
});

// Protected API route example
app.get('/api/verify-access', ensureAuthenticated, (req, res) => {
    res.json({
        access: true,
        user: req.user,
        message: 'Access granted to family member'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 MADK Travel Blog Backend Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`👨‍👩‍👧‍👦 Allowed family emails: ${allowedEmails.length} configured`);
    
    if (process.env.NODE_ENV !== 'production') {
        console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
        console.log(`🔑 Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? '✅ Configured' : '❌ Not configured'}`);
    }
});

module.exports = app;
