import React, {
    useState,
    useEffect
} from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

export default (props) => {
    const [value, setValue] = useState(props.value)

    const onChange = (e, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {
        if (props.value !== value) {
            setValue(Number(props.value))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value])

    return ( < BottomNavigation { ...props
        }
        value = {
            value
        }
        onChange = {
            onChange
        } >
        <
        BottomNavigationAction label = "Recents"
        icon = { < RestoreIcon / >
        }
        /> <
        BottomNavigationAction label = "Favorites"
        icon = { < FavoriteIcon / >
        }
        /> <
        BottomNavigationAction label = "Nearby"
        icon = { < LocationOnIcon / >
        }
        /> <
        /BottomNavigation>)
    }