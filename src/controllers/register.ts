import { NextFunction, Request, Response } from "express";
import { findOneByPhoneNumber } from "../data/u_users";
import { IUser } from "../types/user";
import { create as createBotUser, findById } from "../data/bot_users";
export const create = async (req: Request<{}, {}, { phoneNumber: string }>, res: Response, next: NextFunction) => {
    try {
        const { phoneNumber } = req.body
        const chatId = req.chatId

        const user: IUser = await findOneByPhoneNumber(phoneNumber)
        console.log(phoneNumber)
        if (!user) {
            res.status(404).json({ message: "کاربری یافت نشد 1" })
            return
        }
        if (user.raked) {
            res.status(400).json({ message: "حساب کاربری شما غیر فعال است." })
            return
        }
        const isUserExists = await findById(chatId)
        if (isUserExists) {
            res.status(400).json({ message: "حساب کاربری شما همواره ایجاد شده است." })
            return
        }
        const newUser = await createBotUser(chatId, user.code)
        res.json({ message: `${user.sharh} عزیز \n با موفقیت وارد شدید.`, data: newUser })
    } catch (error) {
        next(error)
    }
}