import React from "react";
import styles from "./Toggle.module.scss";
import {
    observer
} from "mobx-react-lite";
// import Jinno from "jinno";
import ReactDOM from "react-dom";

const Toggle = observer((props) => {
    const toggleButton = () => {
        if (!props.onChange) {
            return;
        }
        if (props.selected === props.leftValue) {
            props.onChange(props.rightValue);
        } else {
            props.onChange(props.leftValue);
        }
    };

    return ( <
        div className = {
            styles.wrapper
        }
        id = {
            props.id
        } >
        <
        div className = {
            styles.Toggle
        }
        onClick = {
            toggleButton
        } >
        <
        div className = {
            `${styles.text} ${
            props.selected === props.leftValue ? styles.textSelected : ""
          }`
        } >
        {
            props.leftValue
        } <
        /div> <
        div className = {
            `${styles.text} ${
            props.selected === props.rightValue ? styles.textSelected : ""
          }`
        } >
        {
            props.rightValue
        } <
        /div> <
        div className = {
            `${styles.button} ${
            props.selected === props.leftValue ? styles.buttonDesign : ""
          }`
        } >
        < /div> <
        /div> <
        /div>
    );
});

export default Toggle;