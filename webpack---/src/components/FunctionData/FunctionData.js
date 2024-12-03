import React, {
    useContext
} from "react";
import styles from "./FunctionData.module.scss";
import InputLabel from "../InputLabel/InputLabel";
import {
    buildFunc
} from "../utils";
import classNames from "classnames";
import {
    observer
} from "mobx-react-lite";
import CanvasPropertiesStore from "../../stores/CanvasPropertiesStore";

export default observer((props) => {
    const CanvasPropertiesData = useContext(CanvasPropertiesStore);

    if (!props.data) {
        return < > < />;
    }
    let func = buildFunc(props.data && props.data.params);

    return ( <
        div className = {
            classNames(styles.wrapper, {
                [styles.inputDisable]: CanvasPropertiesData.editPropertyId &&
                    props.data &&
                    props.editable &&
                    CanvasPropertiesData.editPropertyId !== props.data.id,
            })
        } >
        <
        InputLabel label = {
            props.data.label
        }
        editable = {
            props.editable
        }
        data = {
            props.data
        }
        capitalize = {
            props.data.capitalize
        }
        /> <
        div className = {
            styles.value
        } > {
            props.data.id
        } {
            func
        } <
        /div> <
        /div>
    );
});