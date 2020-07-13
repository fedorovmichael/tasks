import {Request, Response} from 'express'
import {newTask, deleteTask, getTaskById, listTasks, updateTask} from '../db/task.db'
import {ITask, ITaskEdit, ITaskResponce} from '../interfaces/task.interface'
import { constants } from 'buffer'


const tasksList = async (req: Request , res: Response) => {   
    try {
      const liTasks = await listTasks()
      //console.log(`get task list: ${liTasks}`)
      const response: ITaskResponce = { success: true, text: '', data: liTasks }
      res.send(response)
   } catch (error) {
    const response: ITaskResponce = { success: false, text: `get list tasks error: ${error}`, data: null }
    res.send(response)
   }  
}

const taskNew = async (req: Request , res: Response) => {   
    try {
      console.log("taskNew input params: ", req.body)
      const result = await newTask(req.body)
      const response: ITaskResponce = { success: true, text: '', data: result }
      res.send(response)
   } catch (error) {
    const response: ITaskResponce = { success: false, text: `create task error: ${error}`, data: null }
    res.send(response)
   }  
}

const taskEdit = async (req: Request , res: Response) => {   
    try {
      const result = await getTaskById(req.body.taskId)
      const response: ITaskResponce = { success: true, text: '', data: result }
      res.send(response)
   } catch (error) {
    const response: ITaskResponce = { success: false, text: `get task by id error: ${error}`, data: null }
    res.send(response)
   }  
}

const taskUpdate = async (req: Request , res: Response) => {   
    try {
      console.log("taskUpdate input params: ", req.body)
      const result = await updateTask(req.body)
      const response: ITaskResponce = { success: true, text: '', data: result }
      res.send(response)
   } catch (error) {
    const response: ITaskResponce = { success: false, text: `update task error: ${error}`, data: null }
    res.send(response)
   }  
}

const taskDelete = async (req: Request , res: Response) => {   
    try {
      console.log("taskDelete input params: ", req.body.ids)
      const result = await deleteTask(req.body.ids)
      const response: ITaskResponce = { success: true, text: '', data: result }
      res.send(response)
   } catch (error) {
    const response: ITaskResponce = { success: false, text: `delete tasks error: ${error}`, data: null }
    res.send(response)
   }  
}

export {tasksList, taskNew, taskEdit, taskUpdate, taskDelete}