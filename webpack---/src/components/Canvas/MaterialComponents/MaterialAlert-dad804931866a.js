import React from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

export default function(props) {
    return ( <
        Alert { ...props
        }
        action = { <
            Button color = "inherit"
            size = "small" >
            UNDO <
            /Button>
        } >
        This is a message <
        /Alert>
    );
}