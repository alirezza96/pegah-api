import app from "./app"
import { server } from "./utils/configs";
import { closePool} from "./utils/db";
const runServer = async () => {
    try {
        app.listen(server.port, () => console.log(`server is running on port ${server.port}`))
    } catch (err) {
        console.log("error =>", err)
    }
}



// Graceful shutdown
const GracefulShutdown = async (signal: string) => {
    console.log(`${signal} received: shutdown gracefully`)
    try {
        await closePool()
        console.info("Resource closed successfully")
        process.exit(0)
    } catch (error) {
        console.error("Error during shutdown")
        process.exit(1)
    }
}

process.on("SIGINT", () => GracefulShutdown("SIGINT"))


runServer()