export enum BotStatus {
    Member = "member",
    Kick = "kicked"
}


export interface IBot {
    chatId: number,
    userId: number,
    status: BotStatus,
    branchNo: number
}