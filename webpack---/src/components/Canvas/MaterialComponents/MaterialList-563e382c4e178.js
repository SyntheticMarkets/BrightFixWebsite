import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import PersonIcon from '@material-ui/icons/Person';

export default function SimpleList(props) {

    return ( <
        div >
        <
        List component = "nav"
        aria - label = "main mailbox folders" { ...props
        } >
        <
        ListItem button >
        <
        ListItemIcon >
        <
        InboxIcon / >
        <
        /ListItemIcon> <
        ListItemText primary = "Inbox" / >
        <
        /ListItem> <
        ListItem button >
        <
        ListItemIcon >
        <
        DraftsIcon / >
        <
        /ListItemIcon> <
        ListItemText primary = "Drafts" / >
        <
        /ListItem> <
        ListItem button >
        <
        ListItemIcon >
        <
        PersonIcon / >
        <
        /ListItemIcon> <
        ListItemText primary = "Profile" / >
        <
        /ListItem> <
        /List> <
        /div>
    );
}