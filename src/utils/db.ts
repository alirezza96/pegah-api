import sql from "mssql"
import { database } from "./configs"

export const pool = new sql.ConnectionPool(database)

// Initialize the connection pool
export const initializePool = async (): Promise<void> => {
    if (!pool.connected) {
        try {
            await pool.connect()
            console.log("database pool initialized")
        } catch (error) {
            console.error("Error initializing database pool:", error)
            throw new Error("Failed to initialize the database connection pool")
        }
    }
}

// Close the connection pool
export const closePool = async () => {
    if (pool.connected) {
        try {
            await pool.close()
            console.log("Database connection pool closed")
        } catch (error) {
            console.error("Error closing the database connection pool", error)
            throw new Error("Failed to close the database connection pool")
        }
    }
}
// Handle pool errors
pool.on("error", err => {
    console.error("Database connection pool error:", err)
})


// execute query
/**
 * اجرای کوئری SQL با پارامترها
 * @param {string} query - متن کوئری SQL
 * @param {Array<{ name: string; type: sql.ISqlType; value: string | number }>} params - پارامترها
 * @returns {Promise<any>} - نتیجه کوئری
 */

export const executeQuery = async (query: string, params: Array<{ name: string; type: sql.ISqlType; value: string | number | null }>) => {
    try {
        await initializePool()
        const request = pool.request()
        params.forEach(param => {
            const { name, type, value } = param
            request?.input(name, type, value)
        })
        const result = await request.query(query)
        return result.recordset

    } catch (err) {
        console.error("error executing query: ", err)
        throw new Error("error executing query")
    }
}


export const executeProcedure = async (procedure: string, params: Array<{ name: string; type: sql.ISqlType; value: any }>) => {
    try {
        await initializePool()
        const request = await pool.request()
        params.forEach(param => {
            const {name, type, value} = param
            request.input(name, type, value)
        })
        const result = await request.execute(procedure)
        return result.recordset

    } catch (error) {
        console.error("error executing procedure: ", error)
        throw new Error("error executing procedure")
    }
}