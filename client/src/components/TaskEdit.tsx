import React, {useState, useEffect, ChangeEvent} from 'react'
import {connect, useDispatch} from 'react-redux'
import { Grid, FormControlLabel, Checkbox, TextField, Button} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import clsx from 'clsx'
import { ITask, ITaskEdit } from '../interfaces/Task.interface'
import { IAlert } from '../interfaces/Alert.interface'
import {taskUpdate, showAlert, taskRequestList} from '../redux/action'
import SnackbarsCustom from './SnackbarsCustom'
import {RouteComponentProps, withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    taskNewRoot:{
        
    },
    separatorGrid:{
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',       
        fontWeight: 'bold',
    },
    labelSpan:{ 
        marginTop: '13px',
        fontSize: '17px',
        width: '150px',
    },
    gridItem:{
        display: 'inline-flex' 
    },
    textfield: {    
        width: '100%',
        fontSize: '15px',
        '& label.MuiInputLabel-formControl': {
            right: 0,
            left: 'unset',
        }
    },
    margin: {
        margin: 8,
    },
    imageGrid:{
        marginTop: 20,
    },
    buttonSave: {
        margin: 8,
        minWidth: "140px",
        fontSize: "14px",
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#4dad79',
        '&:hover': {
            backgroundColor: '#4dad79',
            textDecoration: 'underline',
        }
    },
    icon: {
        borderRadius: 3,
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#fff',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
          outline: '2px auto rgba(19,124,189,.6)',
          outlineOffset: 2,
        },
        'input:hover ~ &': {
          backgroundColor: '#4dad79',
        },
        'input:disabled ~ &': {
          boxShadow: 'none',
          background: 'rgba(206,217,224,.5)',
        },
      },
      checkedIcon: {
        backgroundColor: '#4dad79',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
          display: 'block',
          width: 16,
          height: 16,
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
          content: '""',
        },
        'input:hover ~ &': {
          backgroundColor: '#4dad79',
        },
      },
      '@media (max-width: 420px)': {
        separatorGrid: {
            marginTop: 70
        }
      }
  })
)

interface ITaskProps{   
    alert: IAlert,
    tasks: ITaskEdit[],
    taskId: string    
}

type Props = ITaskProps & RouteComponentProps

const TaskNew: React.FC<Props> = (props) => {
    const classes = useStyles()
    const [nameTaskError, setNameTaskError] = useState(false)
    const [telephonTaskError, setTelephonTaskError] = useState(false)
    const [emailTaskError, setEmailTaskError] = useState(false)
    const [textTaskError, setTextTaskError] = useState(false)
    const [task, setTask] = useState<ITask>(props.tasks.filter(t => t._id === props.taskId)[0])
    const [localLoad, setLocalLoad] = useState<boolean>(false)

    const dispatch = useDispatch()

    const handleSaveTask = () => {       
        let isValid:boolean = true

        if(task.name.trim() === ''){
            setNameTaskError(true)
            isValid = false
        }
        if(!isValidEmail(task.email) || task.email.trim() === ''){
            setEmailTaskError(true)
            isValid = false
        }
        if(task.telephone.trim() === ''){
            setTelephonTaskError(true)
            isValid = false
        }
        if(task.text.trim() === ''){
            setTextTaskError(true)
            isValid = false
        }

        if(isValid){
            dispatch(taskUpdate(task))
            dispatch(taskRequestList())
            props.history.push('/')
        } 
    }

    const isValidEmail = (email:string) =>{
        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(email);
    }

    const onAlertClose = () => {
        let alert = {text: '', variant: 'success', show: false, event: ''};
        dispatch(showAlert(alert));
    }

    const handlOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        //console.log("handlOnChange: input ",  e.currentTarget.id, e.target.checked)
        //console.log('handle change cb: ', e.target.id, ', ', e.target.checked)
        const field:string = e.currentTarget.id === undefined ? e.currentTarget.name : e.currentTarget.id
        const value: string = e.currentTarget.value
        if(e.target !== null && e.currentTarget.value !== null){
            setTask(prev => ({ ...prev, [field]: value }));    
        }
    }
    
    const handlOnChangeCB = (e: ChangeEvent<HTMLInputElement>) => {        
        console.log('handle change cb: ', e.target.id, ', ', e.target.checked)
        const field: string = e.currentTarget.id === undefined ? e.currentTarget.name : e.currentTarget.id
        const value: boolean = e.currentTarget.checked       
        setTask(prev => ({ ...prev, [field]: value }));    
       
    }

    useEffect(()=>{
        if(!localLoad){            
            const editTask = props.tasks.filter(t => t._id === props.taskId)[0]
            setTask(editTask)
            setLocalLoad(true)
            console.log("useEffect task: ", task)
        }        
    }, [localLoad, props.tasks, props.taskId, task])

    if(props.alert.show){
       setTimeout(onAlertClose, 3000)
    }

    return(
        <div className="container">
            {props.alert.show ? 
                <SnackbarsCustom data={props.alert} />
                :''
            }
            <Grid container spacing={2}>
                <Grid item sm={12} xs={12} className={classes.separatorGrid}>
                    <span className={classes.labelSpan}>עריכה משימה</span>
                </Grid>
            </Grid> 
            <Grid container spacing={2}>                       
                <Grid item sm={12} className={classes.gridItem}>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={task?.complete}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handlOnChangeCB(e)}
                        id="complete"
                        color="primary"                        
                        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                        icon={<span className={classes.icon} />}
                    />
                    }
                    label="בוצע"
                />                
                </Grid>
                <Grid item sm={4} xs={12} className={classes.gridItem}>                            
                    <TextField
                        error={nameTaskError}
                        className={classes.margin+' '+classes.textfield}                        
                        label="שם משתמש"
                        value={task?.name}
                        id="name"
                        onChange={(e: ChangeEvent<HTMLInputElement>)  =>  handlOnChange(e)}
                    />           
                </Grid>  
                <Grid item sm={4} xs={12} className={classes.gridItem}>                            
                    <TextField
                        error={telephonTaskError}
                        className={classes.margin+' '+classes.textfield}                        
                        label="טלפון"                                                               
                        value={task?.telephone}
                        id="telephone"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handlOnChange(e)}
                    />           
                </Grid>
                <Grid item sm={4} xs={12} className={classes.gridItem}>                            
                    <TextField
                        error={emailTaskError}
                        className={classes.margin+' '+classes.textfield}                        
                        label="מייל"                                
                        value={task?.email}
                        id="email"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handlOnChange(e)}
                    />           
                </Grid>
                <Grid item sm={12} xs={12} className={classes.gridItem}>                            
                    <TextField
                        error={textTaskError}
                        className={classes.margin+' '+classes.textfield}                        
                        label="משימה"                                
                        value={task?.text}
                        id="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handlOnChange(e)}
                    />           
                </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.imageGrid}>                        
                <Grid item sm={12} xs={12} className={classes.gridItem}>
                    <Button variant="contained" color="primary" className={classes.buttonSave} onClick={handleSaveTask}>
                        לשמור משימה
                        <SaveIcon />
                    </Button>
                </Grid>
            </Grid>  
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {        
        alert: state.alertState.alert,
        tasks: state.taskState.taskList,         
    }   
 }

export default withRouter(connect(mapStateToProps)(TaskNew))