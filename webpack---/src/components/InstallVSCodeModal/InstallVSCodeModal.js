import React from "react";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import styles from "./InstallVSCodeModal.module.scss";
import {
    GlobalStoreClass
} from "../../stores/GlobalStore";
import {
    trackEvent
} from "../utils";
import variables from "../../variables";

export default function InstallVSCodeModal(props) {
    const close = () => {
        GlobalStoreClass.setModalOpen("");
    };
    const navigateToVsCode = () => {
        trackEvent("User clicked on install vs code");
        window.open(
            "https://marketplace.visualstudio.com/items?itemName=jinno.codelens-sample"
        );
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
        Install our VS code extension <
        /div> <
        div className = {
            styles.SignUp_subtitle
        } >
        Jino AI can automatically change your react code once you make a change. <
        br / >
        Let our AI do it
        for
        you by installing our VS code. <
        /div> <
        img src = {
            variables.env !== "web" &&
            window.chrome.runtime.getURL("inject/vscode.jpeg")
        }
        className = {
            styles.image
        }
        /> <
        div className = {
            styles.SignUp_button
        }
        onClick = {
            navigateToVsCode
        } >
        Install <
        /div> <
        /div> <
        /div> <
        /div>
    );
}