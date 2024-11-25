import sql from "mssql"
import { executeQuery } from "../utils/db"
export const findOneByPhoneNumber = async (phoneNumber: string) => {
    try {
        const query = "select code, raked, sharh, 56 as branch_no from u_users where mobile = @phoneNumber"
        const params = [
            { name: "phoneNumber", value: phoneNumber, type: sql.VarChar() }
        ]
        const [result] = await executeQuery(query, params)
        return result
    } catch (error) {
        console.error("error getting data =>", error)
        throw new Error("error getting data")
    }
}

export const findById = async (userId: number) => {
    try {
        const query = "select code, raked, sharh, loginname from u_users where code = @userId"
        const params = [
            { name: "userId", value: userId, type: sql.Int() }
        ]
        const [result] = await executeQuery(query, params)
        return result
    } catch (error) {
        console.error("error getting data =>", error)
        throw new Error("error getting data")
    }
}