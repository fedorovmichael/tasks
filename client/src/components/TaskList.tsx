import React, {useState, useEffect} from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TablePagination, 
    TableRow, 
    TableSortLabel,    
    Typography,
    Paper,
    Checkbox,
    Button,    
    Grid
} from '@material-ui/core'
import {connect, useDispatch} from 'react-redux'
import {ITaskEdit} from '../interfaces/Task.interface'
import {taskRequestList, taskDelete, showDialog} from '../redux/action'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import Dialog from '../components/Dialog'


interface Data {
    name: string
    telephone: string 
    email: string
    created: string
    actions: string
  }
  
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  type Order = 'asc' | 'desc';
  
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort<T>(array: T[], comparator: (a: any, b: any) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }
  
  const headCells: HeadCell[] = [
    { id: 'name', numeric: false, disablePadding: true, label: 'שם משתמש' },
    { id: 'telephone', numeric: true, disablePadding: false, label: 'טלפון' },
    { id: 'email', numeric: true, disablePadding: false, label: 'מייל' },
    { id: 'created', numeric: true, disablePadding: false, label: 'תאריך יצירת משימה' },
    { id: 'actions', numeric: true, disablePadding: false, label: 'פעולות' },
  ];
  
  interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }
  
  function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={'right'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
    
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
        '& div.MuiTablePagination-actions': {
          display: 'flex',   
          flexDirection: 'row-reverse',
        }
      },
      paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
      },
      table: {
        minWidth: 750,
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
      divDateComplete:{
        display: 'flex',
        '& span': {
          marginRight: 5
        }
      },
      desktopTDValue:{
        display: 'table-cell',
      },
      mobileTDValue:{
        display: 'none',
      },
      mobileTDTitle:{

      },
      '@media (max-width: 420px)': {
          table: {
            display: 'block',
            minWidth: 'unset',
            width: '96%',
            margin: '0 auto',
            '& thead': {
              display: 'none',
            },
            '& tbody': {
              display: 'block',
            },
            '& th': {
                display: 'block',
            },
            '& tr': {
                display: 'block',
                marginBottom: 30,
                border: "solid 1px #ccc",
                borderRadius: 5,
                padding: 5,
            },
            '& td': {
                display: 'block',
                
            },           
          },
          desktopTDValue:{
            display: 'none !important',
          },
          mobileTDValue:{
            display: 'flex',
          },
          root:{
            overflowX: 'hidden',
          }

      }
    }),
  );
  
  interface ITaskProps{   
    tasks: ITaskEdit[]
    dialog: any
    loaded: boolean
    searchTasks: ITaskEdit[]
  }

  type Props = ITaskProps & RouteComponentProps

  const TaskList:React.FC<Props> = (props) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState<ITaskEdit[]>(props.tasks)
    const [localLoad, setLocalLoad] = useState<boolean>(false)       

    const dispatch = useDispatch()  
        
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
    
    type tButton = 'view' | 'edit' | 'delete'

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: string[] = [];
  
      console.log("event row: ", event, name)

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleButton = (e: React.MouseEvent<unknown>, type: tButton, taskId: string)=>{
      if(e){
        //console.log("button on click", e.target, type)
        e.stopPropagation()
      }
      console.log("handleButton 111", type)
      switch(type){
        case "view":
            props.history.push('/task_edit/' + taskId)
          break;
        case "edit":
            props.history.push('/task_edit/' + taskId)
          break;
        case "delete":
            dispatch(taskDelete(taskId))
            dispatch(taskRequestList())
            handlCloseDialog()
            setLocalLoad(false)            
          break;
      }
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    const handlCloseDialog = () => {
      console.log('handlCloseDialog')
      let dialogData = { title: '', text: '', buttons: [], show: false }
      dispatch(showDialog(dialogData));
    }

    const removeTaskDialog = (e: React.MouseEvent<unknown>, taskId: string) => {      
      console.log('removeTaskDialog')
      const eventBtn = () => { return handleButton(e, 'delete', taskId) }
      e.stopPropagation()
      let dialogData = { 
          title: 'למחוק משימה', 
          text: 'למחוק משימה ?', 
          buttons: [{event: eventBtn, label: 'למחוק משימה'}], 
          show: true 
      }
      dispatch(showDialog(dialogData));
    }

    const formateData = (_date: Date)=>{
      let d = new Date(_date)
      return d.getDate() + '.'+ d.getMonth() + '.' + d.getFullYear()
    } 
    
    useEffect(()=>{
      //console.log('useEffect loaded: ', localLoad)
      if(!localLoad){
        dispatch(taskRequestList())
        setLocalLoad(true)
        //dispatch(tasksLoaded(true))
      }
      
      //console.log('useEffect tasks: ', props.tasks)
      //console.log('useEffect search text: ', props.searchTasks)
      
      if(props.searchTasks.length !== 0){         
         setRows(props.searchTasks)        
      }else{
        //console.log("search tasks 111: ", props.tasks)
        setRows(props.tasks)
      }
      
      // return function cleanup(){
      //   console.log("search tasks AAAA: ")
      //   if(props.searchTasks.length !== 0){
      //     dispatch(taskSearch(''))
      //   }        
      // }
    })
  
    return (
      <div className={classes.root}>
        <Dialog dialogData={ props.dialog } handlDialog={handlCloseDialog}/>       
        <Paper className={classes.paper}>          
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort<ITaskEdit>(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox" className={classes.desktopTDValue}>
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell id={labelId} align="right">
                          <Typography component="div" className={classes.desktopTDValue}>
                            {row.name}
                          </Typography>
                          <Grid container spacing={2} className={classes.mobileTDValue}>
                              <Grid item xs={5} className={classes.mobileTDTitle}>
                                  <span>שם משתמש</span>
                              </Grid>
                              <Grid item xs={7} className={''}>
                                  {row.name}
                              </Grid>                            
                          </Grid>
                        </TableCell>
                        <TableCell align="right">
                          <Typography component="div" className={classes.desktopTDValue}>
                            {row.telephone}
                          </Typography>
                          <Grid container spacing={2} className={classes.mobileTDValue}>
                              <Grid item xs={5} className={classes.mobileTDTitle}>
                                  <span>טלפון</span>
                              </Grid>
                              <Grid item xs={7} className={''}>
                                  {row.telephone}
                              </Grid>                            
                          </Grid>
                        </TableCell>
                        <TableCell align="right">
                          <Typography component="div" className={classes.desktopTDValue}>
                              {row.email}
                          </Typography>
                          <Grid container spacing={2} className={classes.mobileTDValue}>
                              <Grid item xs={5} className={classes.mobileTDTitle}>
                                  <span>אמייל</span>
                              </Grid>
                              <Grid item xs={7} className={''}>
                                  {row.email}
                              </Grid>                            
                          </Grid>                          
                        </TableCell>
                        <TableCell align="right">
                        <Typography component="div" className={classes.desktopTDValue}>
                            <div className={classes.divDateComplete}>
                              {row.complete ? <img src="/images/enable.png" alt="..."/> : ''}
                              <span>{formateData(row.created)}</span>                              
                            </div>    
                          </Typography>
                          <Grid container spacing={2} className={classes.mobileTDValue}>
                              <Grid item xs={5} className={classes.mobileTDTitle}>
                                  <span>תאריך יצירת משימה</span>
                              </Grid>
                              <Grid item xs={7} className={''}>
                                <div className={classes.divDateComplete}>
                                  {row.complete ? <img src="/images/enable.png" alt="..."/> : ''}
                                  <span>{formateData(row.created)}</span>                              
                                </div> 
                              </Grid>                            
                          </Grid>      
                         </TableCell>
                        <TableCell align="right">
                            <Button onClick={(e) => handleButton(e, "view", row._id)}>
                                <img src="/images/icon_view.png" alt="צפייה"/>
                            </Button>
                            <Button onClick={(e)=>handleButton(e, "edit", row._id)}>
                                <img src="/images/icon_edit.png" alt="עריכה"/>
                            </Button>
                            <Button onClick={(e)=> removeTaskDialog(e, row._id)}>
                                <img src="/images/icon_delete.png" alt="מחיקה"/>                              
                            </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>       
      </div>
    );
  }

  const mapStateToProps = (state: any) => {
    //console.log('input state :', state)
    //console.log('input state taskList:', state.taskState.taskList)
    return {        
        alert: state.alertState.alert,
        tasks: state.taskState.taskList,
        searchTasks: state.taskState.searchTasks,
        loaded: state.taskState.loaded,
        dialog: state.dialogState.dialog,
    }   
  }

  export default withRouter(connect(mapStateToProps)(TaskList))