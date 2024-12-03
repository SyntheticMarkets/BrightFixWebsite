import React from "react";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import styles from "./ControlBarButton.module.scss";
import classNames from "classnames";

const ControlBarButton = (props) => {
    return ( <
        div id = {
            props.id
        }
        className = {
            classNames(styles.ControlBarButton, {
                [styles.remove_cursor]: props.children,
            })
        }
        onClick = {
            props.onClick
        } >
        <
        FontAwesomeIcon icon = {
            props.icon
        }
        className = {
            styles.icon
        }
        /> <
        span className = {
            styles.hover
        } > {
            props.children
        } < /span> <
        span className = {
            styles.text
        } > {
            props.iconText
        } < /span> <
        /div>
    );
};
export default ControlBarButton;