import mongoose, {Schema} from "mongoose"
import {IUser} from '../interfaces/user.interface'

const UserSchema:Schema = new Schema({
    username: {type: String, require: true},
    email:  {type: String, require: true, unique: true },
    password:  {type: String, require: true},
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'role'
        }
    ]
})

export default mongoose.model<IUser>('user', UserSchema)