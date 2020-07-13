import {Router} from 'express'
const router = Router()
import {tasksList, taskNew, taskEdit, taskUpdate, taskDelete} from '../controllers/task.controller'

router.get('/', (req, res) =>{
    res.send('hello from task')
})

router.post('/tasks_list', tasksList)
router.post('/task_new', taskNew)
router.post('/task_edit', taskEdit)
router.post('/task_update', taskUpdate)
router.post('/task_delete', taskDelete)

export default router