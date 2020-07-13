import express, {Application} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { config as envConfig } from 'dotenv'
import userRoutes from './routes/user.routes'
import taskRoutes from './routes/task.routes'

const app: Application = express()

app.use(cors({origin: '*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
envConfig()

//user
app.use('/', userRoutes)
app.use('/user', userRoutes)
app.use('/usersignup', userRoutes)
app.use('/usersignin', userRoutes)

//task
app.use('/', taskRoutes)
app.use('/tasks_list', taskRoutes)
app.use('/task_new', taskRoutes)
app.use('/task_edit', taskRoutes)
app.use('/task_update', taskRoutes)
app.use('/task_delete', taskRoutes)

app.listen(4100, ()=> console.log('Server is runnig on port: 4100'))