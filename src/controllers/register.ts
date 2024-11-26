import { NextFunction, Request, Response } from "express";
import { findOneByPhoneNumber } from "../data/u_users";
import { IUser } from "../types/user";
import { create as createBotUser, findByUserIdAndBranchNo, updateBotChatId } from "../data/bot_users";
import { IBot } from "../types/bot";
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
        const isUserExists: IBot = await findByUserIdAndBranchNo(user.code, user.branch_no)
        if (isUserExists) {
            if (isUserExists.chatId === chatId) {
                res.status(400).json({ message: "حساب کاربری شما همواره ایجاد شده است." })
                return
            }
            // update chatId
            const updatedUser = await updateBotChatId(isUserExists.chatId, chatId)
            res.json({ message: `سلام ${user.sharh}`, data: updatedUser })
            return
        }
        const newUser = await createBotUser(chatId, user.code, user.branch_no)
        res.json({ message: `سلام ${user.sharh}`, data: newUser })
    } catch (error) {
        next(error)
    }
}