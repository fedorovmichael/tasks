import { TASK_EDIT, 
    TASK_NEW, 
    TASK_REQUEST_LIST,
    TASK_DELETE,
    TASK_UPDATE,   
    USER_SIGNIN,
    USER_SIGNUP,
    USER_REQUEST_LIST,
    USER_DELETE,
    USER_UPDATE,
    SHOW_ALERT,
    SHOW_DIALOG,
    TASK_LOADED,
    TASK_SEARCH,
    TASK_TYPE,
} from './types'

//task 
export function taskRequestList(){
    return {type: TASK_REQUEST_LIST}
}

export function taskAdd(task){
    return {type: TASK_NEW, payload: task}
}

export function taskEdit(task){
    return {type: TASK_EDIT, payload: task}
}

export function taskUpdate(task){
    return {type: TASK_UPDATE, payload: task}
}

export function taskDelete(taskId){
    return {type: TASK_DELETE, payload: taskId}
}

export function tasksLoaded(load){
    return {type: TASK_LOADED, payload: load}
}

export function taskSearch(text){
    return {type: TASK_SEARCH, payload: text}
}

export function taskType(text){
    return {type: TASK_TYPE, payload: text}
}


//user
export function userSignIn(user){
    return {type: USER_SIGNIN, payload: user}
}

export function userSignUp(user){
    return {type: USER_SIGNUP, payload: user}
}

export function usersRequestList(){
    return {type: USER_REQUEST_LIST}
}

export function userUpdate(user){
    return {type: USER_UPDATE, payload: user}
}

export function userDelete(userId){
    return {type: USER_DELETE, payload: userId}
}

//dialog
export function showDialog(dialogData){
    return {type: SHOW_DIALOG, dialog: dialogData};
}

//alert
export function showAlert(alertData){
    return {type: SHOW_ALERT, alert: alertData};
}
