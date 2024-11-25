import { NextFunction, Request, Response } from "express";
import { findByChatId } from "../data/bot_users";
import { findById as findByUserId } from "../data/u_users";
import { IUser } from "../types/user";
export default async function userId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const chatId = Number(req.query.chatId)
        if (isNaN(chatId)) {
            res.status(400).json({ message: "chatId not valid" })
            return
        }
        if (req.originalUrl.startsWith("/register")) {
            req.chatId = chatId
            return next()
        }
        const botUser = await findByChatId(chatId)
        if (!botUser) {
            res.status(404).json({ message: "کاربری یافت نشد" })
            return
        }
        const user: IUser = await findByUserId(botUser.userId)
        if (!user) {
            res.status(400).json({ message: "حساب کاربری یافت نشد." })
        }
        if (user.raked) {
            res.status(400).json({ message: "حساب کاربری شما غیر فعال است." })
            return
        }
        req.user = user
        next()
    } catch (error: unknown) {
        next(error)
    }
}