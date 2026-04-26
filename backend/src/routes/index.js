const authRoutes = require("../modules/auth/auth.router");
const taskRoutes = require("../modules/task/task.router");

const routes = (app) => {
    app.use('/api/v1/auth', authRoutes );
    app.use('/api/v1/task', taskRoutes);
}

module.exports = routes;
