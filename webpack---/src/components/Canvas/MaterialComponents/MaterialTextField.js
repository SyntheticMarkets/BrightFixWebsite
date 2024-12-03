import React, {
    useState,
    useEffect
} from 'react'
import TextField from '@material-ui/core/TextField';

export default (props) => {
    const [value, setValue] = useState(props.value)
    const onChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (props.value !== value) {
            setValue(props.value)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value])

    return <TextField
    focused = {
        value ? true : false
    } { ...props
    }
    onChange = {
        onChange
    }
    value = {
        value
    }
    />
}