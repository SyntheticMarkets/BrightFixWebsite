import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {

    const handleClose = () => {
        props.onClose(props.selectedValue);
    };

    const handleListItemClick = (value) => {
        props.onClose(value);
    };

    return ( <
        Dialog style = {
            {
                zIndex: 10000000000
            }
        }
        onClose = {
            handleClose
        }
        aria - labelledby = "simple-dialog-title" { ...props
        } >
        <
        DialogTitle id = "simple-dialog-title" > Set backup account < /DialogTitle> <
        List > {
            emails.map((email) => ( <
                ListItem button onClick = {
                    () => handleListItemClick(email)
                }
                key = {
                    email
                } >
                <
                ListItemAvatar >
                <
                Avatar >
                <
                PersonIcon / >
                <
                /Avatar> <
                /ListItemAvatar> <
                ListItemText primary = {
                    email
                }
                /> <
                /ListItem>
            ))
        } <
        ListItem autoFocus button onClick = {
            () => handleListItemClick('addAccount')
        } >
        <
        ListItemAvatar >
        <
        Avatar >
        <
        AddIcon / >
        <
        /Avatar> <
        /ListItemAvatar> <
        ListItemText primary = "Add account" / >
        <
        /ListItem> <
        /List> <
        /Dialog>
    );
}

export default function SimpleDialogDemo(props) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        if (typeof value === 'string') {
            setSelectedValue(value);
        }
    };

    return ( <
        div >
        <
        Typography variant = "subtitle1" > Selected: {
            selectedValue
        } < /Typography> <
        br / >
        <
        Button variant = "outlined"
        color = "primary"
        onClick = {
            handleClickOpen
        } >
        Open simple dialog <
        /Button> <
        SimpleDialog { ...props
        }
        selectedValue = {
            selectedValue
        }
        open = {
            open
        }
        onClose = {
            handleClose
        }
        /> <
        /div>
    );
}