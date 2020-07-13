import {takeEvery, put, call} from 'redux-saga/effects'
import {SHOW_ALERT, TASK_REQUEST_LIST, TASK_NEW, TASK_SET_LIST, TASK_DELETE, TASK_UPDATE} from './../types'
import config from '../../config'

export function* sWtTask(){
    //console.log('saga start login')
    yield takeEvery(TASK_REQUEST_LIST, sWTaskList)
    yield takeEvery(TASK_NEW, sWTaskAdd)
    yield takeEvery(TASK_DELETE, sWTaskDelete)
    yield takeEvery(TASK_UPDATE, sWTaskUpdate)
}

function* sWTaskList(){
    //yield put() //dispatch to store 
    //console.log(`sWTaskList saga`)  
    const url = config.params.server_path + '/tasks_list'
    const payload = yield call(fetchDataPost, url, null)
    if(payload.success){
        yield put({type: TASK_SET_LIST, payload: payload.data})
    }else{
        const alertData = {text: payload.text, variant: 'error', show: true, event: '' };
        yield put({type: SHOW_ALERT, alert: alertData})
    }
}

function* sWTaskAdd(action){
    //console.log(`sWTaskAdd saga`, action.payload)  
    const url = config.params.server_path + '/task_new'
    //const payload = {success: false, text: 'save task succes'};//yield call(fetchDataPost, url, null)
    const payload = yield call(fetchDataPost, url, action.payload)
    if(payload.success){
        //console.log("success sWTaskAdd saga: ", payload)
        const alertData = {text: payload.text, variant: 'success', show: true, event: '' };       
        yield put({type: SHOW_ALERT, alert: alertData})
    }else{
        const alertData = {text: payload.text, variant: 'error', show: true, event: '' };
        yield put({type: SHOW_ALERT, alert: alertData})
    }
}

function* sWTaskDelete(action){
    //console.log(`sWTaskDelete saga`, action.payload)  
    const url = config.params.server_path + '/task_delete'
    //const payload = {success: false, text: 'save task succes'};//yield call(fetchDataPost, url, null)
    const payload = yield call(fetchDataPost, url, {ids: [action.payload]})
    if(payload.success){
        //console.log("success sWTaskDelete saga: ", payload)
        const alertData = {text: payload.text, variant: 'success', show: true, event: '' };       
        yield put({type: SHOW_ALERT, alert: alertData})
    }else{
        const alertData = {text: payload.text, variant: 'error', show: true, event: '' };
        yield put({type: SHOW_ALERT, alert: alertData})
    }
}

function* sWTaskUpdate(action){
    console.log(`sWTaskUpdate saga`, action.payload)
    const url = config.params.server_path + '/task_update'
    const payload = yield call(fetchDataPost, url, action.payload)
    if(payload.success){
        console.log("success sWTaskUpdate saga: ", payload)
        const alertData = {text: payload.text, variant: 'success', show: true, event: '' };       
        yield put({type: SHOW_ALERT, alert: alertData})
    }else{
        const alertData = {text: payload.text, variant: 'error', show: true, event: '' };
        yield put({type: SHOW_ALERT, alert: alertData})
    }
}

async function fetchDataPost(url, data){
    //console.log('fetch data input params: ', url, ' data: ',  data)
    let reqObj
    if(data !== null){       
        reqObj = { method: 'post', body: JSON.stringify(data), headers: {'Content-Type':'application/json'} }
    }else{
        reqObj = { method: 'post' }
    }    
    const response = await fetch(url, reqObj)
    return await response.json()
}