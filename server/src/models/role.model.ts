import mongoose, {Schema} from "mongoose"
import {IRole} from '../interfaces/user.interface'

const RoleSchema: Schema = new Schema({
    name: {type: String, require: true}
})

export default mongoose.model<IRole>('role', RoleSchema)