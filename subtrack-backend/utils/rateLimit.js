const rateLimiter = require('express-rate-limit');


const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many request from this IP.'
});

module.exports = limiter;