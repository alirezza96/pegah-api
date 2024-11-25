import { NextFunction, Request, Response } from "express";
import { updateBotStatus } from "../data/bot_users";
import { BotStatus } from "../types/bot";
export const findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.json(req.user)
    } catch (error) {
        next(error)
    }
}

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(1)
        const chatId: number = Number(req.query.chatId)
        const status: BotStatus = req.body.status
        await updateBotStatus(chatId, status)
        res.status(200).json({ message: "user updated" })
    } catch (error) {
        next(error)
    }
}