import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };


const styles = theme => ({
    rootSnackbar:{
      '& div.MuiSnackbarContent-action': {
        marginRight: 'auto',
        marginLeft: 'unset',
      },
      '& div.MuiSnackbarContent-message span':{
        display: 'flex',
      }
    },
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginLeft: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
    close:{
      marginRight: 'auto'
    }
  });

class SnackbarsCustom extends Component {
    state = {
      open: true,
      vertical: 'top',
      horizontal: 'center',
    };
  
    handleClose = () => {
      this.setState({ open: false });      
      if (typeof this.props.data.event === "function"){
        this.props.data.event();
      }      
    };

    render(){
        const { vertical, horizontal, open } = this.state;
        const { data, classes } = this.props;
        const Icon = variantIcon[data.variant];        

        return(
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={this.handleClose}
                autoHideDuration={4000}
                className={classes.rootSnackbar}

                ContentProps={{
                    'aria-describedby': 'message-id',
                     className: classes[data.variant],
                }}
                message={
                    <span id="message-id">
                        <Icon className={classes.icon+ ' ' +classes.iconVariant} />
                        {data.text}
                    </span>
                }
                action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      className={classes.close}
                      onClick={this.handleClose}
                    >
                      <CloseIcon className={classes.icon} />
                    </IconButton>,
                 ]}
            />
        );
    }
}

export default withStyles(styles)(SnackbarsCustom);