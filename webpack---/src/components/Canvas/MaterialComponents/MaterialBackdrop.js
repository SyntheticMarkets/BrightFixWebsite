import React, {
    useState,
    useEffect
} from 'react'
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default (props) => {
    const [open, setOpen] = useState(true)

    useEffect(() => {
        if (open !== props.open) {
            setOpen(props.open);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open]);

    const handleOpen = () => {
        setOpen(!open)
    }

    return ( <
        div >
        <
        Button variant = "outlined"
        color = "primary"
        onClick = {
            handleOpen
        } >
        Show backdrop <
        /Button> <
        Backdrop style = {
            {
                zIndex: 10000000000,
                background: 'rgba(0,0,0,.8)'
            }
        } { ...props
        }
        open = {
            open
        }
        onClick = {
            handleOpen
        } >
        <
        CircularProgress variant = "indeterminate"
        style = {
            {
                color: '#1976d2'
            }
        }
        /> <
        /Backdrop> <
        /div>
    )
}