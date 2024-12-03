import React, {
    useEffect,
    useState
} from 'react'
import Checkbox from '@material-ui/core/Checkbox';

export default (props) => {
    const [checked, setChecked] = useState(true)
    let style = {
        color: props.color,
        boxSizing: 'border-box'
    }

    useEffect(() => {
        if (props.checked !== checked) {
            setChecked(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.checked])

    const onChange = (e) => {
        setChecked(e.target.checked)
    }

    return ( <
        Checkbox { ...props
        }
        checked = {
            checked
        }
        style = {
            style
        }
        onChange = {
            onChange
        }
        />
    )
}