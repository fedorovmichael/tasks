import {takeEvery, put, call} from 'redux-saga/effects'
import {USER_SIGNIN, SHOW_ALERT} from './../types'
import config from '../../config'

export function* sWtUser(){
    //console.log('saga start login')
    yield takeEvery(USER_SIGNIN, sWLoginUser)
}

function* sWLoginUser(action){
    //console.log('saga input params: ', action)    
    const url = config.params.server_path + "/login_user"    
    const payload = yield call(fetchDataPost, url, action.login)
    //console.log('response login user from server: ', payload)
    if(payload.success){
        yield put({type: USER_SIGNIN, user: payload.data})
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