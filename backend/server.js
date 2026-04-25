const app = require("./src/app");
const http = require("node:http");
const connectDb = require("./src/config/db");

const PORT = process.env.PORT || 8081; 

const server = http.createServer(app);

const startServer = async () => {
    try {
        await connectDb();
        
        server.listen(PORT, () => {
            console.log(`✅ Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Error starting the server:", error.message);
        process.exit(1);
    }
}

startServer();
