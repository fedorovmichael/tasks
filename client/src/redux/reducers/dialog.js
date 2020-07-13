const initialDialogtState = {
  dialog: {title: '', text: '', buttons: [], show: false } 
};

export default function shoppingCart(state = initialDialogtState, action){
    switch(action.type){
        case "SHOW_DIALOG":
          return {...state, dialog: action.dialog};
        default:
          return state;
    }    
    
}