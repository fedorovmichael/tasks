import {Router, Request, Response, NextFunction} from 'express'
const router = Router()
import {verifyEmail, verifyRole} from '../middleware/verifySignUp'
import {getUser, signUpUser, singInUser} from '../controllers/user.controller'

router.get('/', (req, res) =>{
    res.send('hello from user')
})

router.post('/user', verifyEmail, getUser)
router.post('/usersignup', [verifyEmail, verifyRole], signUpUser)
router.post('/usersignin', singInUser)

export default router