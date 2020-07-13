import {Document} from "mongoose"
import {IResResult} from './resResult.interface'

export interface ITask extends Document {    
    name: string
    email: string
    telephone: string
    created: Date
    text: string
    complete: boolean 
}

export interface ITaskEdit extends ITask{
    _id: string
}

export interface ITaskResponce extends IResResult{
    data: any | null
}