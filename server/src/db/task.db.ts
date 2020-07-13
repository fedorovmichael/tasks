import Task from '../models/task.model'
import {ITask, ITaskEdit} from '../interfaces/task.interface'
import mongoose from "mongoose"


const getTaskById = (_id:string) => {
    return Task.findOne({_id: _id})
}

const newTask = (_task: ITask)=>{
    return new Task(_task).save()
}

const listTasks = () => {
    return  Task.find()
}

const updateTask = (_task: ITaskEdit) => {
    return Task.updateOne({_id: mongoose.Types.ObjectId(_task._id)}, {$set: _task});
}

const deleteTask = (_ids: string[]) =>{
    return Task.deleteMany({_id : {$in: _ids}})
}


export {
    getTaskById,
    newTask,
    listTasks,
    updateTask,
    deleteTask,
}
    
