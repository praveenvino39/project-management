type User = {
    _id: string
    username: string
    firstName?: string
    lastName?: string
}

type NetworkResponse<T> = {
    message:string,
    data: T,
    status: number,
    error?: string
}

type Project = {
    _id: string,
    name: string,
    createdBy: User,
    collaborators: User[],
    createdAt: string,
    tickets: string[],
}
type Ticket = {
    _id: string,
    name: string,
    assignedTo: User,
    description: string,
    priority: 'low' | 'medium' | 'high',
    project: string,
    createdAt: string,

}