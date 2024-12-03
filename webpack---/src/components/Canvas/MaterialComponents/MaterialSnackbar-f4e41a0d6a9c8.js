import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function SimpleSnackbar(props) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return ( <
        div >
        <
        Button onClick = {
            handleClick
        } > Open simple snackbar < /Button> <
        Snackbar transitionDuration = {
            {
                enter: props.enteringScreen,
                exit: props.leavingScreen
            }
        }
        open = {
            open
        }
        onClose = {
            handleClose
        }
        message = "Note archived" { ...props
        }
        anchorOrigin = {
            {
                vertical: props.vertical,
                horizontal: props.horizontal
            }
        } >
        <
        MuiAlert onClose = {
            handleClose
        }
        elevation = {
            6
        }
        variant = "filled"
        severity = {
            props.severity
        } >
        This is a snackbar <
        /MuiAlert> <
        /Snackbar> <
        /div>
    );
}