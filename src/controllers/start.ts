import { Request, Response, NextFunction } from "express";

export default async function start(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const user = req.user
        // check u_users
        res.status(200).json({ message: `سلام ${user.sharh}`, data: user })
        return
    } catch (error) {
        next(error);
    }
}
