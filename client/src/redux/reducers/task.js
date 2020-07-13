import {TASK_EDIT, TASK_SET_LIST, TASK_LOADED, TASK_SEARCH, TASK_TYPE} from '../types'

const initialTaskState = {
  task: null,
  taskList: [],
  loaded: false,
  searchTasks: [],
  taskType: '',
};

export default function users(state = initialTaskState, action){
    switch(action.type){
        case TASK_EDIT:
          return {...state, task: action.payload}; 
        case TASK_SET_LIST:
          //const dd = {...state, taskList: action.payload, loaded: true};
          //console.log(`task list state ${ JSON.stringify(state)}`)
          return {...state, taskList: action.payload, loaded: true};
        case TASK_LOADED:
            return {...state, loaded: action.payload}; 
        case TASK_SEARCH:
          if(action.payload !== ''){
            return {...state, searchTasks: state.taskList.filter(t => t.name.includes(action.payload))};
          }else{
            return {...state, searchTasks: []};
          } 
        case TASK_TYPE:
            return {...state, taskType: action.payload};  
        default:
          return state;
    }   
}