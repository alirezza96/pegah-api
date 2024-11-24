import { Request, Response, NextFunction } from "express";

export default async function start(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const user = req.user
        console.log("user =>", user)
        // check u_users
        res.status(200).json({ message: `${user.sharh} عزیز \n با موفقیت وارد شدید.`, data: user })
        return
    } catch (error) {
        next(error);
    }
}
