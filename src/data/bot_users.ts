import { executeQuery } from "../utils/db"
import sql from "mssql"



export const create = async (chatId: number, userId: number) => {
    try {
        const query = "insert into bot_users(chatId, userId) values(@chatId, @userId)"
        const params = [
            { name: "chatId", value: chatId, type: sql.BigInt() },
            { name: "userId", value: userId, type: sql.SmallInt() }
        ]
        const result = await executeQuery(query, params)
        return result
    } catch (error) {
        console.error("error creating data =>", error)
        throw new Error("error creating data")
    }
}