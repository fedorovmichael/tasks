import {all} from 'redux-saga/effects'
import {sWtUser} from './user.saga'
import {sWtTask} from './task.saga'

export default function* rootSaga(){
    yield all([       
        sWtUser(),
        sWtTask()
    ])
}