import React from "react";
import styles from "./AddNpm.module.scss";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {
    CanvasStoreClass
} from "../../../stores/CanvasStore";

export default () => {
    const close = () => {
        CanvasStoreClass.setShowInstallSdk(false);
    };

    return ( <
        div className = {
            styles.addNpm
        } >
        <
        div className = {
            styles.wrapper
        } >
        <
        FontAwesomeIcon icon = {
            faTimes
        }
        className = {
            styles.close
        }
        onClick = {
            close
        }
        /> <
        div className = {
            styles.title
        } > Install Jinno npm < /div> <
        div className = {
            styles.text
        } >
        1. In order to save you have to add Jinno SDK:
        <
        /div> <
        div className = {
            styles.code
        } >
        <
        i > npm install jinno--save < /i> <
        /div> <
        div className = {
            styles.text
        } > 2. Add your component to Jinno < /div> <
        div className = {
            classNames(styles.code, styles.codeNoMargin)
        } >
        <
        i > {
            "const Component = ()=>(<div>example</div>)"
        } < /i> <
        /div> <
        div className = {
            styles.code
        } >
        <
        b >
        <
        i > {
            `Jinno(Component,'my-component-id')`
        } < /i> <
        /b> <
        /div> <
        /div> <
        /div>
    );
};