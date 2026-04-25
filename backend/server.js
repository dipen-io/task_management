const app = require("./src/app");
const http = require("node:http");
const PORT = process.env.PORT | 8081;

const server = http.createServer(app);

const startServer = async () => {
    try {
        server.listen(PORT, () => {
            console.log(`Server is running ${PORT}`);
            return;
        })
    } catch (error) {
        console.error("Error in running server");
        process.exit(1);
    }
}

startServer();
