import sql from "mssql"
import { executeQuery } from "../utils/db"
export const findOneByPhoneNumber = async (phoneNumber: string) => {
    try {
        const query = "select code, raked, sharh from u_users where mobile = @phoneNumber"
        const params = [
            { name: "phoneNumber", value: phoneNumber, type: sql.VarChar() }
        ]
        const result = await executeQuery(query, params)
        return result
    } catch (error) {
        console.error("error getting data =>", error)
        throw new Error("error getting data")
    }
}

export const findOneByChatId = async (chatId: number) => {
    try {
        const query = "select code, raked, sharh from u_users left outer join bot_users as bot on u_users.code = bot.userId where bot.chatId = @chatId"
        const params = [
            { name: "chatId", value: chatId, type: sql.BigInt() }
        ]
        const result = await executeQuery(query, params)
        return result
    } catch (error) {
        console.error("error getting data =>", error)
        throw new Error("error getting data")
    }
}