import { NextFunction, Request, Response } from "express";

export default function notFound(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(404).json({ message: "not found" })
    } catch (error) {
        next(error)
    }
}