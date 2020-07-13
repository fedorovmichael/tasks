import {Request, Response, NextFunction} from 'express'
import connection  from '../db/connection.db'
import {getUserByEmail, getRoles} from '../db/user.db'

connection()

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(`verifyEmail: ${JSON.stringify(req.body)}`)
        const user = await getUserByEmail(req.body.email);
        console.log(`verifyEmail user from db: ${JSON.stringify(user)}`)
        if(user !== null){
            console.log(`verifyEmail user from db 1: ${JSON.stringify(user)}`)
            res.status(400).send({success: false, text: `User with email exists: ${req.body.email}`, data: null})
            return;   
        }else{
            console.log(`verifyEmail user next step: ${JSON.stringify(user)}`)            
        }
        
    } catch (error) {
        res.status(500).send({success: false, text: `Find user by email error: ${error}`, data: null})
        return;        
    }
    
    next()
    
}

const verifyRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(`verifyRole: ${JSON.stringify(req.body)}`)
        const arrRolesObj = await getRoles()
        const arrRoles = arrRolesObj.map((r)=> r.name)
        const usRoles = []
        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
              if (!arrRoles.includes(req.body.roles[i])) {
                res.status(400).send({success: false, text: `Failed! Role ${req.body.roles[i]} does not exist!`, data: null})
                return
              }else{
                usRoles.push(arrRolesObj.filter(r=>r.name === req.body.roles[i])[0])
              }
            }

            req.body.roles = usRoles
        }
        
    } catch (error) {
        res.status(500).send({success: false, text: `Get roles error: ${error}`, data: null})
        return 
    } 
    
    next()
}

export {
    verifyEmail,
    verifyRole
}