import dotenv from "dotenv"
import { config } from "mssql"

dotenv.config()

export const server = {
    port: process.env.SERVER_PORT
}

export const database: config = {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER!,
    port: +process.env.DB_PORT!,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}
