import React, {useState, ChangeEvent} from 'react'
import TasksList from '../components/TaskList'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {Search} from '@material-ui/icons'
import {IconButton} from '@material-ui/core'
import { Link } from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import {taskSearch} from '../redux/action'
import {ITask} from '../interfaces/Task.interface'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divTitle:{
        textAlign: 'right',
        marginTop: '45px',
    },  
    spanTitle: {
        fontSize: '26pt',
        fontWeight: 'bold',
        color: '#4dad79',
    },
    divSearch: {
        marginTop: 25,
        display: 'flex',
        border: 'solid 1px #ccc',
        borderRadius: '5px',
        alignItems: 'center',
        padding: '0 5px',
    },
    inputSearch: {
        width: '100%',
        height: '30px',
        border: 'unset',
        fontSize: '11pt',
        '&:focus':{
            border: 'unset',
            outline: 'none',
        }
    },
    newTaskBtn: {           
        backgroundColor: '#4dad79',
        color: '#fff',
        display: 'flex',
        padding: '10px 10px',
        borderRadius: 5,
        textDecoration: 'none',
        '&:hover':{
            color: '#000',  
        }
    },
    divTaskCountNewBtn:{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '40px',
        marginBottom: '15px',        
    },
    spanTaskCount: {
        marginRight: 5,
        alignSelf: 'flex-end',
        fontWeight: 'bold',
    },
    '@media (max-width: 420px)': {
        divTaskCountNewBtn:{
            padding: '0 10px',
        },
        divSearch:{
            margin: '10px 10px',
        },
        divTitle:{
            marginRight: 12,
            marginTop: 20,
        }
        
    }
  })
)

interface IPropsHome {
    tasks: ITask[]
}

const Home: React.FC<IPropsHome> = (props) => {
    const classes = useStyles()
    const [searchText, setSearchText] = useState<string>()
    const dispatch = useDispatch()

    const handleSerchText = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("search input: ", e.target.value)
        setSearchText(e.target.value)
        dispatch(taskSearch(e.target.value))
    }

    return(
        <div className={'container'}>
            <div className={classes.divTitle}>
                <span className={classes.spanTitle}>ניהול משימות</span>
            </div>            
            <div>
                <div className={classes.divSearch}>
                    <input type="text" className={classes.inputSearch} placeholder="חיפוש משימה..." value={searchText} onChange={(e) => {handleSerchText(e)}}/>
                    <IconButton color="inherit">
                        <Search/>
                    </IconButton>
                </div>                
            </div>
            <div>
                <div className={classes.divTaskCountNewBtn}>
                    <span className={classes.spanTaskCount}>רשימת המשימות שלך ({props.tasks.length})</span>
                    <Link to='/task_new' className={classes.newTaskBtn}>משימה חדשה</Link>                    
                </div>
                <TasksList/>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    //console.log('input state :', state)
    //console.log('input state taskList:', state.taskState.taskList)
    return {       
        tasks: state.taskState.taskList,
    }   
  }

export default connect(mapStateToProps)(Home);