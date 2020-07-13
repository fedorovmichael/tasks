const initialAlertState = {
    alert: {text: '', variant: 'success', show: false, event: '' }
  };
  
  export default function alert(state = initialAlertState, action){
      switch(action.type){
          case "SHOW_ALERT":
            return {...state, alert: action.alert};
          default:
            return state;
      }    
  }