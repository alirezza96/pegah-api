import { executeQuery } from "../utils/db"
import sql from "mssql"
import { BotStatus } from "../types/bot"



export const create = async (chatId: number, userId: number, branchNo: number) => {
    try {
        const query = "insert into bot_users(chatId, userId, branch_no) values(@chatId, @userId, @branchNo)"
        const params = [
            { name: "chatId", value: chatId, type: sql.BigInt() },
            { name: "userId", value: userId, type: sql.SmallInt() },
            { name: "branchNo", value: branchNo, type: sql.SmallInt() }
        ]
        const result = await executeQuery(query, params)
        return result
    } catch (error) {
        console.error("error creating data =>", error)
        throw new Error("error creating data")
    }
}

export const findByChatId = async (chatId: number) => {
    try {
        const query = "select top 1 * from bot_users where chatId = @chatId"
        const params = [
            { name: "chatId", value: chatId, type: sql.BigInt() }
        ]
        const [user] = await executeQuery(query, params)
        return user
    } catch (error) {
        console.error("error getting data =>", error)
        throw new Error("error getting data")
    }
}
export const findByUserIdAndBranchNo = async (userId: number, branchNo: number) => {
    try {
        const query = "select top 1 * from bot_users where userId = @userId and branch_no = @branchNo"
        const params = [
            { name: "userId", value: userId, type: sql.SmallInt() },
            { name: "branchNo", value: branchNo, type: sql.SmallInt() }
        ]
        const [user] = await executeQuery(query, params)
        return user
    } catch (error) {
        console.error("error getting data =>", error)
        throw new Error("error getting data")
    }
}


export const updateBotStatus = async (chatId: number, status: BotStatus): Promise<void> => {
    try {
        const query = "update bot_users set status = @status where chatId = @chatId"
        const params = [
            { name: "chatId", value: chatId, type: sql.BigInt() },
            { name: "status", value: status, type: sql.VarChar() }
        ]
        const result = await executeQuery(query, params)
    } catch (error) {
        console.error("error getting data =>", error)
        throw new Error("error getting data")
    }
}


export const updateBotChatId = async (chatId: number, newChatId: number): Promise<void> => {
    try {
        const query = "update bot_users set chatId = @newChatId where chatId = @chatId"
        const params = [
            { name: "chatId", value: chatId, type: sql.BigInt() },
            { name: "newChatId", value: newChatId, type: sql.BigInt() }

        ]
        await executeQuery(query, params)
    } catch (error) {
        console.error("error getting data =>", error)
        throw new Error("error getting data")
    }
}
