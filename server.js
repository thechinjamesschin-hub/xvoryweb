const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.removeHeader('X-Powered-By');
    next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve downloads directory
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));

// Main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Xvory server running on http://localhost:${PORT}`);
});
