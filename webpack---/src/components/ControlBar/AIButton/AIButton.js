import React, {
    useContext
} from "react";
import styles from "./AIButton.module.scss";
import {
    faWandMagic
} from "@fortawesome/pro-regular-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    observer
} from "mobx-react-lite";
import HoverStore from "../../../stores/HoverStore";
import {
    trackEvent
} from "../../utils";

export default observer((props) => {
    const HoverStoreData = useContext(HoverStore);

    const onClick = () => {
        trackEvent(`AI - click on do magic`);
        HoverStoreData.setIsHovering(true, true, "magic");
    };

    return ( <
        div className = {
            `${styles.button} ${props.focus ? styles.button_active : ""}`
        }
        onClick = {
            onClick
        } >
        <
        FontAwesomeIcon icon = {
            faWandMagic
        }
        className = {
            styles.icon
        }
        /> <
        div className = {
            styles.text
        } > Do Magic < /div> <
        /div>
    );
});