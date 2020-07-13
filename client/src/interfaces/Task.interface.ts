export interface ITask {    
    name: string
    email: string
    telephone: string
    created: Date
    text: string 
    complete: boolean
    type: string
}

export interface ITaskEdit extends ITask{
    _id: string
}