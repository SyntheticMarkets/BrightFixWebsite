import React from 'react'
import Input from '../Input/Input'
import {
    CanvasPropertiesStoreClass
} from '../../stores/CanvasPropertiesStore'

export default function JsonInput(props) {
    const onClick = (e) => {
        CanvasPropertiesStoreClass.openEditJson(props.data, e.currentTarget)
    }

    return ( <
        Input onInputClicked = {
            onClick
        }
        data = {
            props.data
        }
        updateCanvasStore = {
            true
        }
        disabled = {
            true
        }
        />
    )
}