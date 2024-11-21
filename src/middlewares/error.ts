import { NextFunction, Request, Response } from "express";

export default function error(error: Error, req: Request, res: Response, next: NextFunction) {
    try {
        res.status(500).json({ message: error.message })
    } catch (error) {
        console.log("server error =>", error)
    }

}