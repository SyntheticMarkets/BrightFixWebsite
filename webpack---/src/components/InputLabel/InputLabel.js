import React, {
    useRef,
    useContext
} from "react";
import styles from "./InputLabel.module.scss";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faMarker
} from "@fortawesome/pro-solid-svg-icons";
import {
    CanvasPropertiesStoreClass
} from "../../stores/CanvasPropertiesStore";
import classNames from "classnames";
import {
    observer
} from "mobx-react-lite";
import EditPropertyStore from "../../stores/EditPropertyStore";

export default observer((props) => {
    const EditPropertyData = useContext(EditPropertyStore);

    const elm = useRef();
    if (!props.label) {
        return < > < />;
    }

    const editProperty = () => {
        if (props.data) {
            CanvasPropertiesStoreClass.setEditPropertyData(
                props.data,
                elm && elm.current
            );
        }
    };

    let allowToEdit =
        props.editable &&
        EditPropertyData.allowToEdit &&
        props.data.id !== CanvasPropertiesStoreClass.editPropertyId;

    return ( <
        div className = {
            classNames(styles.label, {
                [styles.labelBottom]: props.position === "bottom",
                [styles.allowToEdit]: allowToEdit,
                [props.labelClassName]: props.labelClassName,
            })
        }
        ref = {
            elm
        } >
        {
            allowToEdit || true ? ( <
                span className = {
                    styles.iconWrapper
                }
                onClick = {
                    editProperty
                } >
                <
                FontAwesomeIcon icon = {
                    faMarker
                }
                className = {
                    styles.ControlBar_icon
                }
                /> <
                /span>
            ) : null
        } <
        div className = {
            styles.label_text
        } > {
            props.label
        } {
            props.position !== "bottom" && props.label !== " " ? ":" : ""
        } <
        /div> <
        /div>
    );
});