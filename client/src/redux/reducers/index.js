import { combineReducers } from 'redux'
import dialog from './dialog'
import alert from './alert'
import user from './user'
import task from './task'

export default combineReducers({
    dialogState: dialog,
    alertState: alert,
    userState: user,
    taskState: task,
})