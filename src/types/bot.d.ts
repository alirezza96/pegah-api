export interface IBot {
    id: number,
    userId: number,
    username: string | null
    first_name: string
    last_name: string | null
    status?: string,
    branch_no: number
}
