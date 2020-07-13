import React, {useState} from 'react'
import { makeStyles } from '@material-ui/styles'
import {IconButton, Theme, Button} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import { connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import SideMenuMobile from '../components/SideMenuMobile'

const useStyles = makeStyles((theme: Theme) => {
    return {
        navRoot:{           
            display:'flex',
            direction: 'ltr',          
        },
        menuUl:{
            listStyle: 'none',
            marginLeft: 'auto',
            padding: 0,
            display: 'flex',
            direction: 'rtl',           
            alignItems: 'center',
        },
        menuItem: {
            margin: 'auto 10px',
            fontWeight: 700,
            fontSize: '11pt',
        },
        menuUlMobile:{
            listStyle: 'none',
            display: 'none',
        },
        logoContainer: {           
            marginLeft: 25,
            display: 'flex',
            alignItems: 'center',           
        },
        logoTitleContainer: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '-24px',
        },
        logo: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'red',         
        },
        logoImg: {            
            width: '170px',
            marginRight: 10,
        },
        telImg: {            
            width: '155px',            
        },
        hide: {
            display: 'none',
        },
        mobileMenuIcon: {
            width: 42,
            height: 42,
            color: '#4dad79',
        },
        mobileMenuIconContainer:{
            position: 'absolute',
            top: 10,
            left: 10,
            display: 'none',
        },
        mobileTelDiv: {
            fontSize: '2rem',
            marginTop: '13px',
            marginLeft: '20px',
            fontWeight: 500
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: '0, 8',            
            justifyContent: 'flex-start',
        },
        link: {
            textDecoration: 'none', 
            cursor: 'pointer'
        },
        linkTopBar: {
            cursor: 'pointer',
            color: '#797979',
            textDecoration: 'unset',
            '&:hover':{
              textDecoration: 'underline',
            }
        },
        mobileNavLeft: {
            width: '250px',
            '& a':{
                textAlign: 'center',
                borderBottom: 'solid 1px #ccc',
            }
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
        hotDealsDiv:{
            display: 'flex',
            alignItems: 'center',
            '& img':{
                marginLeft: 3,
            }
        },
        '@media (max-width: 1700px)':{
            logoContainer:{
               
            },
            
        },
        '@media (max-width: 1360px)':{
            menuUl:{
                display: 'none',
            },
            mobileMenuIconContainer:{
                display: 'flex',
            },
            logoContainer: {
                
            },
            menuUlMobile:{                
                display: 'block',
            },
        },
        '@media (max-width: 420px)':{
            navRoot:{
                justifyContent: 'space-between',

            },
            logoContainer: {
                marginLeft: 'unset',
            },
            logoImg:{
                width: 120,
            },
            telImg:{
                width: 140,
                height: 45,
            },
            mobileMenuIconContainer:{
                top: 65,
                left:0,
            }           
        },
    }
})


const NavBar: React.FC =() => {
    const classes = useStyles(); 
    const [open, setOpen] = useState(false);    
    const [activeBtn, setActiveBtn] = useState('residence')     

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose =()=>{
        setOpen(false);
    }
    
    const buttonStyle = (btn: string) => {
        if(btn === activeBtn){
            return classes.rightButton +' '+ classes.rightButtonActive
        }else{
            return classes.rightButton
        }
    } 
  
    return(
        <div>
            <div className={classes.mobileMenuIconContainer}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerOpen}
                    className={clsx(open && classes.hide)}                    
                >
                    <MenuIcon className={classes.mobileMenuIcon}/>
                </IconButton>                
            </div>
            
            <div className={classes.navRoot}>
                <div className={classes.logoContainer}>
                    <Link to='/' className={classes.link}>
                        <img src="/images/clients_logo.jpg" alt="" className={classes.logoImg}/>
                    </Link>                    
                </div> 
                <div className={classes.logoContainer}>
                    <Link to='/' className={classes.link}>
                        <img src="/images/client_tel.jpg" alt="" className={classes.telImg}/>
                    </Link>                    
                </div> 
                
                <ul className={classes.menuUl}>
                    <li className={classes.menuItem}>
                        <div className={classes.rightButtonsDiv}>
                            <Button variant="contained" color="primary" className={buttonStyle('commercial')} onClick={()=>{setActiveBtn('commercial')}}>מסחרי</Button>
                            <Button variant="contained" color="primary" className={buttonStyle('residence')} onClick={()=>{setActiveBtn('residence')}}>מגורים</Button>
                        </div>                       
                    </li>                   
                    <li className={classes.menuItem}>
                        <Link to="/" className={classes.linkTopBar}>
                            מועדפים
                        </Link>                       
                    </li>
                    <li className={classes.menuItem}>
                        <Link to="/" className={classes.linkTopBar}>
                            מחשבון שטחים   
                        </Link>
                    </li>
                    <li className={classes.menuItem}>
                        <Link to="/" className={classes.linkTopBar}>
                            הוספת נכס  
                        </Link>
                    </li>
                    <li className={classes.menuItem}>
                        <Link to="/" className={classes.linkTopBar}>
                            תגמול שותפים 
                        </Link>
                    </li>
                    <li className={classes.menuItem}>
                        <Link to="/" className={classes.linkTopBar}>
                            קבל הצעות אישיות 
                        </Link>
                    </li>
                    <li className={classes.menuItem}>
                        <Link to="/" className={classes.linkTopBar}>
                            <div className={classes.hotDealsDiv}>
                                <img src="/images/fire.jpg" alt="לדילים חמים"/>
                                לדילים חמים 
                            </div>
                        </Link>
                    </li>                                        
                </ul>
            </div>
            <SideMenuMobile show={open} onClose={handleDrawerClose} />          
        </div>
    );
}

const mapStateToProps = (state: any) => {    
    return {
      user: state.userState.user,     
    }}

export default withRouter(connect(mapStateToProps)(NavBar))