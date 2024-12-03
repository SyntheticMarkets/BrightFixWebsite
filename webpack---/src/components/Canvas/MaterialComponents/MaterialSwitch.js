import React, {
    useEffect,
    useState
} from 'react'
import Switch from '@material-ui/core/Switch';
import styles from './MaterialSwitch.module.scss'

export default (props) => {
    const [checked, setChecked] = useState(props.checked)
    const onChange = (e) => {
        setChecked(!checked)
    }

    useEffect(() => {
        if (props.checked !== checked) {
            setChecked(props.checked)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.checked])

    return <Switch { ...props
    }
    color = "primary"
    classes = {
        {
            root: styles.boxSizing
        }
    }
    onChange = {
        onChange
    }
    checked = {
        checked
    }
    />
}