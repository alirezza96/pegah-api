import { NextFunction, Request, Response } from "express";

export const findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.json(req.user)
    } catch (error) {
        next(error)
    }
}