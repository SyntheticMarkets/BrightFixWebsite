import React from "react";
import styles from "./Scroll.module.scss";
import Close from "../../Close/Close";

const Scroll = () => {
    const closeEvent = () => {

    }
    return ( <
        div className = {
            `controlbar_dragArea ${styles.wrapper}`
        } >
        <
        div className = {
            styles.scrollWrapper
        } >
        <
        div className = {
            styles.scroll
        } > < /div> <
        /div> <
        div className = {
            styles.closeWrapper
        } >
        <
        Close fromControlBar = {
            true
        }
        onClick = {
            closeEvent
        }
        /> <
        /div> <
        /div>
    );
};
export default Scroll;