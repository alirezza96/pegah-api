import { IBot } from "./bot";
import { Request } from "express";
import { IUser } from "./user";

declare global {
    namespace Express {
        interface Request {
            bot?: IBot,
            user: IUser,
            chatId: number
        }
    }
}