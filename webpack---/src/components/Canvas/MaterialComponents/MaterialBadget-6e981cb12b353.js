import React from 'react';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import styles from './MaterialBadget.module.scss'

export default function SimpleBadge(props) {
    return ( <
        div >
        <
        Badge color = "primary"
        classes = {
            {
                badge: styles.badge
            }
        } { ...props
        }
        anchorOrigin = {
            {
                vertical: props.vertical,
                horizontal: props.horizontal
            }
        } >
        <
        MailIcon / >
        <
        /Badge> <
        /div>
    );
}