export type MessageType = {
    _id: string
    senderId: string
    recieverId: string
    text: string
    createdAt: string
    updatedAt: string
    __v: 0
}

export type UserType = {
    id?: string
    _id?: string
    username: string
    email: string
    profilePic: string
    createdAt?: string
    updatedAt?: string
    lastLoggedIn?: string
    __v?: 0
}