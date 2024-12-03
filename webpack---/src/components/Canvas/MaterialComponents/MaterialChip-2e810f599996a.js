import React from 'react'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

export default function ChipDemo(props) {
    return ( < Chip color = "primary"
        label = "Chip component"
        avatar = { < Avatar > F < /Avatar>}  { ...props
            }
            />
        )
    }