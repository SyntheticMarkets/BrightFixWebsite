import React from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default (props) => {
    let style = props.variant === 'contained' ? {
        background: props.background,
        color: props.color
    } : null

    return ( <
        ButtonGroup { ...props
        } >
        <
        Button style = {
            style
        } > One < /Button> <
        Button style = {
            style
        } > Two < /Button> <
        Button style = {
            style
        } > Three < /Button> <
        /ButtonGroup>
    )
}