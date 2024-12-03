import React, {
    useContext
} from 'react'
import {
    observer
} from 'mobx-react-lite'
import styles from './EditJson.module.scss'
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    Tree
} from "../../Tree/Tree";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import CanvasPropertiesStore from "../../../stores/CanvasPropertiesStore";

export default observer(() => {
    const CanvasPropertiesData = useContext(CanvasPropertiesStore)
    const data = CanvasPropertiesData.editJson

    const addRow = () => {
        CanvasPropertiesData.addRow()
    }

    const close = () => {
        CanvasPropertiesData.closeEditJson()
    }

    if (!data) {
        return < > < />
    }

    return ( <
        div className = {
            styles.wrapper
        }
        style = {
            {
                top: CanvasPropertiesData.fromTop,
                width: CanvasPropertiesData.width
            }
        } >
        <
        FontAwesomeIcon className = {
            styles.close
        }
        onClick = {
            close
        }
        icon = {
            faTimes
        }
        />

        <
        Tree data = {
            data
        }
        fromEditJson = {
            true
        }
        /> <
        div className = {
            styles.addRow
        }
        onClick = {
            addRow
        } > Add row < /div> { /* <Fields data={data}  updateCanvasStore={true} fromCanvas={true}/> */ } <
        /div>
    )
})