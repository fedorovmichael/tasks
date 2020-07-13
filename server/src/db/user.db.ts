import User from '../models/user.model'
import Role from '../models/role.model'
import {IUser} from '../interfaces/user.interface'


const getUserByEmail = (_emain:string) => {
    return User.findOne({email: _emain}).populate('roles')
}

const newUser = (_user: IUser)=>{
    return new User(_user).save()
}

const getRoles = ()=>{
    return Role.find();
}

export {
    getUserByEmail,
    newUser,
    getRoles
}
    
