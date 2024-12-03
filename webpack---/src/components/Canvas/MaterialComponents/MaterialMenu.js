import React, {
    useRef
} from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

export default (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const elm = useRef(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(false)
    }

    return ( < div >
        <
        Button ref = {
            elm
        }
        aria - controls = "simple-menu"
        aria - haspopup = "true"
        onClick = {
            handleClick
        } >
        Open Menu <
        /Button> <
        Menu id = "simple-menu" { ...props
        }
        style = {
            {
                zIndex: 11111111111
            }
        }
        anchorEl = {
            anchorEl
        }
        open = {
            Boolean(anchorEl)
        }
        onClose = {
            handleClose
        } >
        <
        MenuItem > Profile < /MenuItem> <
        MenuItem > My account < /MenuItem> <
        MenuItem > Logout < /MenuItem> <
        /Menu> <
        /div>
    )
}