import React from "react";
import styles from "./ComponentSelector.module.scss";
import classNames from "classnames";

export default (props) => {
    return ( <
        div style = {
            props.style
        }
        className = {
            classNames({
                [styles.borderBox]: true,
                [styles.borderBoxOpen]: !props.isHover,
            })
        } >
        <
        div className = {
            styles.dot + " " + styles.dot_TopLeft
        } > < /div> <
        div className = {
            styles.dot + " " + styles.dot_TopRight
        } > < /div> <
        div className = {
            styles.dot + " " + styles.dot_BottomRight
        } > < /div> <
        div className = {
            styles.dot + " " + styles.dot_BottomLeft
        } > < /div> <
        /div>
    );
};