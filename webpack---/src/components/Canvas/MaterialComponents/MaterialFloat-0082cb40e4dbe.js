import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default (props) => {
    let style = {
        background: props.color,
        color: 'white'
    }

    return ( <
        Fab { ...props
        }
        style = {
            style
        } >
        <
        AddIcon / >
        <
        /Fab>
    )
}