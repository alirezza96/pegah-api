import { NextFunction, Request, Response } from "express";
import { findOneByPhoneNumber } from "../data/u_users";
import { createUser } from "../data/bot_users";
export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("registered fired")
        const { id, first_name, last_name, username, phoneNumber } = req.body
        // const user: IBot = await findById(body.id)
        const user = await findOneByPhoneNumber(phoneNumber)
        // find user on u_users
        if (!user) {
            res.status(404).json({ message: "user not found on table u_users" })
            return
        }
        if (user.raked) {
            res.status(400).json({ message: "user disabled on table u_users" })
            return
        }
        await createUser({ id, first_name, last_name, username, userId: user.code, branch_no: user.branch_no })
        res.json({ message: `verification code sms to ${phoneNumber}` })
    } catch (error) {
        next(error)
    }
}