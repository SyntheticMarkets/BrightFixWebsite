import React, {
    useContext
} from "react";
import UserStore from "../../../../stores/UserStore";
import {
    observer
} from "mobx-react-lite";
import TextAIStore from "../../../../stores/TextAIStore";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import styles from "./AISubmit.module.scss";
import {
    faStop
} from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";
import variables from "../../../../variables";

const AISubmit = observer((props) => {
    const TextAIData = useContext(TextAIStore);

    return ( <
        div className = {
            classNames(styles.wrapper, {
                [styles.wrapper_forEditor]: variables.isEditor,
            })
        } >
        <
        div className = {
            styles.sendButton_wrapper
        } >
        <
        div className = {
            styles.sendButton
        }
        onClick = {
            props.submit
        } > {
            /* <div style={{ display: variables.isEditor ? "block" : "none" }}>
                        Edit AI
                      </div> */
        } {
            TextAIData.loading ? (
                // <CircularProgress size={18} color="white" className={styles.icon} />
                <
                FontAwesomeIcon icon = {
                    faStop
                }
                color = "white"
                className = {
                    styles.icon
                }
                />
            ) : ( <
                svg className = {
                    styles.icon
                }
                width = "20"
                height = "20"
                viewBox = "0 0 20 20"
                fill = "none"
                xmlns = "http://www.w3.org/2000/svg" >
                <
                path d = "M3.43999 9.99989H8.83999M7.50999 2.22989L16.07 6.50989C19.91 8.42989 19.91 11.5699 16.07 13.4899L7.50999 17.7699C1.74999 20.6499 -0.600011 18.2899 2.27999 12.5399L3.14999 10.8099C3.36999 10.3699 3.36999 9.63989 3.14999 9.19989L2.27999 7.45989C-0.600011 1.70989 1.75999 -0.65011 7.50999 2.22989Z"
                stroke = "white"
                strokeWidth = "1.5"
                strokeLinecap = "round"
                strokeLinejoin = "round" /
                >
                <
                /svg>
            )
        } <
        /div> <
        /div> <
        /div>
    );
});

export default AISubmit;