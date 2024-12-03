import React from 'react'
import Link from '@material-ui/core/Link';

export default function LinkDemo(props) {
    return ( < Link { ...props
        }
        style = {
            {
                color: 'rgb(120,120,120)'
            }
        } > {
            props.text
        } <
        /Link>)
    }