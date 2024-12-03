import React, {
    useState,
    useEffect
} from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'

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

    return ( <
        Select { ...props
        }
        value = {
            props.multiple ? [value] : value
        }
        onChange = {
            onChange
        } >
        {
            props.data && props.data.map((item) => {
                return <MenuItem value = {
                    item.id
                } > {
                    item.value
                } < /MenuItem>;
            })
        } <
        /Select>
    );
}