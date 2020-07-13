import {Request, Response} from 'express'
import {getUserByEmail, newUser} from '../db/user.db'
import {IUser, IRole} from '../interfaces/user.interface'
import {sign as jwtSign} from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { config as envConfig } from 'dotenv'
envConfig()

const getUser = async (req: Request , res: Response) => {   
    try {
      const us = await getUserByEmail(req.body.email)
      res.send(us)
   } catch (error) {
      res.send(`get user error: ${error}`)
   }  
}

const signUpUser = async (req: Request , res: Response) => {
    try {
        
        console.log(`signUpUser input params: ${req.body}`)
        const userRoles = req.body.roles as IRole[]
        const userObj = {
            username: req.body.username as string,
            email: req.body.email as string,
            password: bcrypt.hashSync(req.body.password) as string,
            roles: req.body.roles as IRole[]
        } as IUser

        console.log(`signUpUser user before save: ${JSON.stringify(userObj)}`)
        const us = await newUser(userObj)
        console.log(`signUpUser save user result: ${us}`)

        res.send({success: true, text: `Signup user success.`, data: us})
    } catch (error) {
        res.status(500).send({success: false, text: `Signup user error: ${error}`, data: null})
    }
}

const singInUser = async (req: Request , res: Response) => {
    try {
        console.log(`singInUser input params: ${req.body}`)
        const user = await getUserByEmail(req.body.email) as any

        console.log(`singInUser user from db: ${user}`)
        if(!user){
            res.status(400).send({success: false, text: `Cant find user by email: ${req.body.email}`, data: null})
            return
        }
        
        if(!bcrypt.compareSync(req.body.password, user.password)){
            res.status(400).send({success: false, text: `Invalid password.`, data: null})
            return
        }

        console.log(`jwt:  ${process.env.SECRET_JWT}`)
        const secret: string = process.env.SECRET_JWT ?  process.env.SECRET_JWT : ""
        const token = jwtSign({ id: user.id }, secret, { expiresIn: 86400 });

        const resUser = {
          _id: user._id,
          username: user.username,
          email: user.email,
          roles: user.roles,
          accessToken: token
        }

        res.send({success: true, text: '', data: resUser})

    } catch (error) {
        res.status(500).send({success: false, text: `Signin user error: ${error}`, data: null})
    }
}

export {getUser, signUpUser, singInUser}