import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  render() {
    let {dialogData, handlDialog} = this.props;
    return (
      <div>
        <Dialog
          open={dialogData.show}
          onClose={handlDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogData.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogData.text }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {dialogData.buttons.length !== 0 ?
              dialogData.buttons.map((btn, index) => 
                <Button onClick={btn.event}>
                  {btn.label}
                </Button>
              ) : ''
            }
            <Button onClick={handlDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;