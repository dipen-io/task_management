const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const erroHandler = require("./middleware/errorHandler");
const AppError = require("./middleware/AppError");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded ({extended: true}))

app.use((req, _, next) => {
    console.log(`INCOMING REQUEST: ${req.method} ${req.url}`);
    next();
});

// healthcheck
app.get('/health', (_, res) => {
    res.json({
        success: true,
        message: "API Is WORKING..",
    });
});


app.use((req, _, next) => {
    console.log(`HIT 404 CATCH-ALL for ${req.url}`);
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(erroHandler);

module.exports = app;
