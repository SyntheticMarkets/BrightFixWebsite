import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default function SimpleTooltips(props) {
    return ( <
        div >
        <
        Tooltip { ...props
        }
        classes = {
            {
                popper: "codeMe_maxIndex"
            }
        } >
        <
        IconButton aria - label = "delete" >
        <
        DeleteIcon / >
        <
        /IconButton> <
        /Tooltip> <
        /div>
    );
}