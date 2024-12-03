import React from "react";
import styles from "./Task.module.scss";
import {
    faCircle
} from "@fortawesome/pro-light-svg-icons";
import {
    faCheckCircle
} from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

const Task = (props) => {
    return ( <
        div className = {
            styles.Task
        } >
        <
        FontAwesomeIcon icon = {
            props.done ? faCheckCircle : faCircle
        }
        className = {
            classNames(styles.icon, {
                [styles.icon_done]: props.done
            })
        }
        /> <
        div >
        <
        div className = {
            classNames(styles.text, {
                [styles.text_done]: props.done,
            })
        } >
        {
            props.title
        } <
        /div> {
            !props.done ? ( <
                span className = {
                    styles.explanation
                } > {
                    props.explanation
                } < /span>
            ) : null
        } {
            !props.done && (props.link || props.onLinkClick) ? ( <
                span className = {
                    styles.explanation
                } >
                <
                a href = {
                    props.link
                }
                onClick = {
                    props.onLinkClick ? props.onLinkClick : null
                }
                target = "_blank" >
                {
                    props.linkText
                } <
                /a> <
                /span>
            ) : null
        } <
        /div> <
        /div>
    );
};

export default Task;