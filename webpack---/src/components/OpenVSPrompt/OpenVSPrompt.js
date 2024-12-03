import React, {
    useContext
} from "react";
import styles from "./OpenVSPrompt.module.scss";
import {
    observer
} from "mobx-react-lite";
import {
    toJS
} from "mobx";
import HoverStore from "../../stores/HoverStore";
import {
    AnimateOnChange
} from "react-animation";

const OpenVSPrompt = observer(() => {
    const HoverStoreData = useContext(HoverStore);
    const promptPosition = toJS(HoverStoreData.promptPosition);

    const isVisible = promptPosition && promptPosition.top;

    return ( <
        AnimateOnChange durationOut = {
            100
        }
        durationIn = {
            100
        } > {
            isVisible ? ( <
                div className = {
                    styles.prompt
                }
                style = {
                    promptPosition
                } >
                <
                div className = {
                    styles.prompt_innder
                } >
                <
                span > 🎉 < /span> <
                div className = {
                    styles.text
                } > {
                    " "
                }
                The code
                for this element has been opened in your VS Code. {
                    " "
                } <
                /div> <
                span > 🎉 < /span> <
                /div> <
                /div>
            ) : null
        } <
        /AnimateOnChange>
    );
});

export default OpenVSPrompt;