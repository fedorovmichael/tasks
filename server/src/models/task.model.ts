import mongoose, {Schema} from "mongoose"
import {ITask} from '../interfaces/task.interface'

const TaskSchema:Schema = new Schema({
    name: {type: String, require: true},
    email:  {type: String, require: true, unique: true },
    telephone:  {type: String, require: true},
    created: {type: Date, require: true},
    text:  {type: String, require: true},
    complete:  {type: Boolean, require: true},
})

export default mongoose.model<ITask>('task', TaskSchema)