import { IBot } from "../types/bot"
import { executeQuery } from "../utils/db"
import sql from "mssql"



export const createUser = async (user: IBot) => {
    console.log("user =>", user)
    const { id, first_name, last_name, username, userId, branch_no } = user
    try {
        const query = "insert into bot_users(id,first_name, last_name, username, userId, branch_no) values(@id, @first_name, @last_name, @username, @userId, @branch_no)"
        const params = [
            { name: "id", value: id, type: sql.BigInt() },
            { name: "first_name", value: first_name, type: sql.VarChar(30) },
            { name: "last_name", value: last_name, type: sql.VarChar(30) },
            { name: "username", value: username, type: sql.VarChar(50) },
            { name: "userId", value: userId, type: sql.SmallInt() },
            { name: "branch_no", value: branch_no, type: sql.SmallInt() }
        ]
        const result = await executeQuery(query, params)
        return result
    } catch (error) {
        console.error("error creating data =>", error)
        throw new Error("error creating data")
    }
}

export const findById = async (id: number) => {
    try {
        const query = "select top 1 * from bot_users where id = @id"
        const params = [
            { name: "id", value: id, type: sql.BigInt() }
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


export const updateBotStatus = async (id: number, status: string): Promise<void> => {
    try {
        const query = "update bot_users set status = @status where id = @id"
        const params = [
            { name: "id", value: id, type: sql.BigInt() },
            { name: "status", value: status, type: sql.VarChar() }
        ]
        const result = await executeQuery(query, params)
    } catch (error) {
        console.error("error getting data =>", error)
        throw new Error("error getting data")
    }
}


export const updateBotid = async (id: number, newid: number): Promise<void> => {
    try {
        const query = "update bot_users set id = @newid where id = @id"
        const params = [
            { name: "id", value: id, type: sql.BigInt() },
            { name: "newid", value: newid, type: sql.BigInt() }

        ]
        await executeQuery(query, params)
    } catch (error) {
        console.error("error getting data =>", error)
        throw new Error("error getting data")
    }
}
