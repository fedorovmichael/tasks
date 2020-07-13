import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles'
import {Close} from '@material-ui/icons'
import {IconButton, SwipeableDrawer, List, ListItem, ListItemText, Divider, Button} from '@material-ui/core'
import { withRouter, RouteComponentProps, } from 'react-router-dom'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => {
    return {
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: '0, 8',            
            justifyContent: 'flex-start',
        },
        mobileNavLeft: {
            width: '250px',
            '& a':{
                textAlign: 'center',
                borderBottom: 'solid 1px #ccc',
            }
        },
        hotDealsDiv:{
            display: 'flex',
            alignItems: 'center',
            margin: '0 auto',
            color: '#000',
            '& img':{
                marginLeft: 3,
            },           
        },
        rightButtonsDiv: {
            width: 150,
            padding: 3,
            border: 'solid 2px #ccc',
            borderRadius: 5,
            marginRight: 50,
            display: 'flex',
            justifyContent: 'space-around',
        },
        rightButton: {           
            backgroundColor: '#fff',
            color: '#000',
            '&:hover':{
                 backgroundColor:'#70c396'
            }
         },
         rightButtonActive: {           
             backgroundColor: '#4dad79',
             color: '#fff',
         },
    }
})

export interface SideMenuMobileProps{
    show: boolean
    onClose: Function      
}

type Props = SideMenuMobileProps & RouteComponentProps

const SideMenuMobile: React.FC<Props> = (props) => {
    const classes = useStyles(); 
    const [open, setOpen] = useState(props.show);
    const [redirect, setRedirect] = useState("");
    const [activeBtn, setActiveBtn] = useState('residence') 
    
    const onClickHandler = (path: string) =>{       
         props.history.push(path)
    }

    const closeDrawer = () =>{       
        setOpen(false)
        props.onClose()       
    }

    const buttonStyle = (btn: string) => {
        if(btn === activeBtn){
            return classes.rightButton +' '+ classes.rightButtonActive
        }else{
            return classes.rightButton
        }
      } 

    useEffect(()=>{
        if(redirect !== ""){
            window.location.href = redirect
        }         
        setOpen(props.show)        
    }, [redirect, props.show])
    
    return(
        <SwipeableDrawer anchor='left' open={open} onClose={()=> setOpen(false) } onOpen={()=> setOpen(true) }>
            <div className={classes.drawerHeader}>
                <IconButton onClick={closeDrawer}>
                    <Close />
                </IconButton>
            </div>
            <Divider />
            <List component="nav" className={classes.mobileNavLeft} aria-label="secondary mailbox folders">
                <ListItem button component="a" href="tel:077-9985041">
                    <ListItemText primary="077-9985041" />
                </ListItem>
                <ListItem button component="a" href="#" onClick={() => setRedirect("/")}>
                    <ListItemText primary="מועדפים" />
                </ListItem>
                <ListItem button component="a" href="#" onClick={() => setRedirect("/")}>
                    <ListItemText primary="מחשבון שטחים" />
                </ListItem>
                <ListItem button component="a" href="#" onClick={() => onClickHandler("/")}>
                    <ListItemText primary="הוספת נכס" />
                </ListItem> 
                <ListItem button component="a" href="#" onClick={() => onClickHandler("/")}>
                    <ListItemText primary="תגמול שותפים" />
                </ListItem>  
                <ListItem button component="a" href="#" onClick={() => onClickHandler("/")}>
                    <ListItemText primary="קבל הצעות אישיות" />
                </ListItem>
                <ListItem button component="a" href="#" onClick={() => onClickHandler("/")}>
                    <div className={classes.hotDealsDiv}>
                        <img src="/images/fire.jpg" alt="לדילים חמים"/>
                        לדילים חמים 
                    </div>
                </ListItem>
                <ListItem onClick={() => onClickHandler("/")}>
                    <div className={classes.rightButtonsDiv}>
                        <Button variant="contained" color="primary" className={buttonStyle('commercial')} onClick={()=>{setActiveBtn('commercial')}}>מסחרי</Button>
                        <Button variant="contained" color="primary" className={buttonStyle('residence')} onClick={()=>{setActiveBtn('residence')}}>מגורים</Button>
                    </div>  
                </ListItem>          
            </List>
        </SwipeableDrawer>
    )
}

const mapStateToProps = (state: any) => {    
    return {     
      
    }
}

export default withRouter(connect(mapStateToProps)(SideMenuMobile))