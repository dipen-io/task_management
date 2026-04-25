const authRoutes = require("../modules/auth/auth.router");

const routes = (app) => {
    app.use('/api/v1/auth', authRoutes );
}

module.exports = routes;
