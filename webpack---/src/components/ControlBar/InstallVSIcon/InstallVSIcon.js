import React from "react";
import styles from "./InstallVSIcon.module.scss";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faExclamation
} from "@fortawesome/pro-duotone-svg-icons";
import {
    GlobalStoreClass
} from "../../../stores/GlobalStore";

const InstallVSIcon = () => {
    const openInstallVScode = () => {
        GlobalStoreClass.setModalOpen("installVScode");
    };

    return ( <
        div className = {
            styles.InstallVSIcon
        }
        onClick = {
            openInstallVScode
        } >
        <
        FontAwesomeIcon icon = {
            faExclamation
        }
        className = {
            styles.icon
        }
        /> <
        div className = {
            styles.tooltip
        } >
        To have Jinno modify your code, you need to use our VS extension <
        /div> <
        /div>
    );
};
export default InstallVSIcon;