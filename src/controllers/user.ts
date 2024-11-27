import { NextFunction, Request, Response } from "express";
import { updateBotStatus, findById } from "../data/bot_users";
export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.json({message: "get user"})
        //  const result = await findById()
    } catch (error) {
        next(error)
    }
}

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(1)
        const id: number = Number(req.query.id)
        const status = req.body.status
        await updateBotStatus(id, status)
        res.status(200).json({ message: "user updated" })
    } catch (error) {
        next(error)
    }
}