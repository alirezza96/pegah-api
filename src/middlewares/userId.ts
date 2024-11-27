import { NextFunction, Request, Response } from "express";
import { findById } from "../data/bot_users";
export default async function userId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        console.log("middleware userId fired")

        const id = Number(req.query.id)
        if (isNaN(id)) {
            res.status(400).json({ message: "id not valid" })
            return
        }
        const bot_user = await findById(id)
        if (!bot_user) {
            res.status(404).json({ message: "user not found" })
            return
        }
        console.log(1)
        if (!bot_user.is_logged_in) {
            res.status(400).json("user not logged in")
            return
        }
        console.log(2)
        if (!bot_user.auth_expired_date || bot_user.auth_expired_date <= new Date()) {
            res.status(400).json("user auth expired")
            return
        }
        console.log(3)
        // const user: IUser = await findByUserId(botUser.userId)
        // if (!user) {
        //     res.status(400).json({ message: "حساب کاربری یافت نشد." })
        // }
        // if (user.raked) {
        //     res.status(400).json({ message: "حساب کاربری شما غیر فعال است." })
        //     return
        // }
        req.user = bot_user
        next()
    } catch (error: unknown) {
        next(error)
    }
}