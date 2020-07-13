import {USER_SIGNIN, USER_REQUEST_LIST} from '../types'

const initialUserState = {
  user: null,
  usersList: []
};

export default function users(state = initialUserState, action){
    switch(action.type){
        case USER_SIGNIN:
          return {...state, user: action.payload}; 
        case USER_REQUEST_LIST:
          return {...state, usersList: action.payload};        
        default:
          return state;
    }   
}