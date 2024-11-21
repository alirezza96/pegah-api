import { Request, Response, NextFunction } from "express";
import { findOneByChatId, findOneByPhoneNumber } from "../data/u_users";
import { create } from "../data/bot_users";

export default async function register(
    req: Request<{}, {}, { chatId: number; phoneNumber: string }>,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { chatId, phoneNumber } = req.body;
        if (!phoneNumber) {
            const [user] = await findOneByChatId(chatId)
            if (!user) {
                res.status(404).json({ message: "user not found" });
                return
            }
            if (user.raked) {
                res.status(400).json({ message: "access denied" });
                return
            }
            res.json({message: "logged in successfully", data: user})
            return
        }
        const [user] = await findOneByPhoneNumber(phoneNumber);
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        if (user.raked === true) {
            res.status(400).json({ message: "access denied" });
            return;
        }
        const createUser = await create(chatId, user.code);
        res.json({ message: "user created", data: createUser });
    } catch (error) {
        next(error);
    }
}
