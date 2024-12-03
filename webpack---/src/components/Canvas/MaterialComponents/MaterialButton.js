import React from 'react'
import Button from '@material-ui/core/Button';

export default (props) => {
    let style = props.variant === 'contained' ? {
        background: props.background,
        color: props.color
    } : null

    return ( <
        Button { ...props
        }
        style = {
            style
        } > {
            props.text
        } <
        /Button>
    )
}