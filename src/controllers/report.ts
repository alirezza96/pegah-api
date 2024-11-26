import { Request, Response, NextFunction } from "express";
import sql from "mssql"
import { executeProcedure } from "../utils/db";
export async function findByName(req: Request<{ reportName: string }>, res: Response, next: NextFunction) {
    try {
        const reportName = req.params.reportName
        const userId = req.user.code
        const { startDate, endDate } = req.query
        console.log("report_name =>", reportName)
        const params = [
            { name: "startDate", value: startDate, type: sql.Char(10) },
            { name: "endDate", value: endDate, type: sql.Char(10) },
            { name: "userId", value: userId, type: sql.SmallInt() },
        ]
        const [data] = await executeProcedure(reportName, params)
        res.json({ message: "success", data })
    } catch (error) {
        next(error)
    }
}