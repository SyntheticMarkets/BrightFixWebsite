import React from "react";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import styles from "./ReactModal.module.scss";
import {
    GlobalStoreClass
} from "../../stores/GlobalStore";

export default function ReactModal(props) {
    const close = () => {
        GlobalStoreClass.setModalOpen("");
    };

    return ( <
        div className = {
            styles.wrapper
        } >
        <
        div className = {
            styles.background
        } > < /div> <
        div className = {
            styles.box
        } >
        <
        div className = {
            styles.SignUp
        } >
        <
        FontAwesomeIcon icon = {
            faTimes
        }
        className = {
            styles.SignUp_close
        }
        onClick = {
            close
        }
        /> <
        div className = {
            styles.SignUp_title
        } >
        Only React code can be modified by Jinno <
        /div> <
        div className = {
            styles.SignUp_subtitle
        } >
        With Jinno, you can modify the code in Visual Studio code only
        for React code. <
        /div> <
        div className = {
            styles.SignUp_button
        }
        onClick = {
            close
        } >
        Close <
        /div> <
        /div> <
        /div> <
        /div>
    );
}