import React, {
    useState,
    useEffect
} from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

export default (props) => {
    const [value, setValue] = useState( /*replaceme*/ props.value)

    useEffect(() => {
        if (props.value !== value) {
            setValue(Number(props.value))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value])

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    let selectedText = props.tabs && props.tabs.find((item, index) => {
        return index === value
    })

    return ( < div >
        <
        AppBar position = "static" >
        <
        Tabs onChange = {
            handleChange
        }
        aria - label = "simple tabs example" { ...props
        }
        value = {
            value
        } > {
            props.tabs && props.tabs.map(item => {
                return <Tab label = {
                    item.label
                }
                index = {
                    item.label
                }
                />
            })
        } <
        /Tabs> <
        /AppBar>  {
            selectedText ? selectedText.label : ''
        } <
        /div>)
    }