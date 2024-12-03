import React, {
    useContext,
    useEffect,
    useRef
} from "react";
import styles from "./Prompt.module.scss";
import TextAIStore from "../../stores/TextAIStore";
import {
    HoverStoreClass
} from "../../stores/HoverStore";
import HoverStore from "../../stores/HoverStore";
import CanvasStore from "../../stores/CanvasStore";
import TextAI from "./TextAI/TextAI";
import {
    observer
} from "mobx-react-lite";
import classNames from "classnames";
import Messages from "./Messages/Messages";
import Close from "../Close/Close";
import variables from "../../variables";

export default observer(() => {
    const TextAIData = useContext(TextAIStore);
    const HoverData = useContext(HoverStore);
    const CanvasData = useContext(CanvasStore);
    const textarea = useRef(null);

    useEffect(() => {
        if (textarea && textarea.current) {
            textarea.current.focus();
        }
    }, [TextAIData.elementPosition]);

    const close = (e) => {
        TextAIData.closeComment();
        HoverStoreClass.setIsHovering(false);

        e.preventDefault();
        e.stopPropagation();
        return;
    };

    const top = TextAIData.elementPosition.top;
    const left = TextAIData.elementPosition.left;
    const right = TextAIData.elementPosition.right;

    if (
        (top == undefined ||
            (!left == undefined && !right === undefined) ||
            !CanvasData.showControlBar) &&
        !variables.isEditor
    ) {
        return < > < />;
    }

    return ( <
        div className = {
            classNames(styles.wrapper, {
                [styles.show_buttons]: HoverData.isHovering,
                [styles.haveMessages]: TextAIData.conversation.length,
                [styles.editorPosition]: variables.isEditor,
            })
        }
        style = {!variables.isEditor ?
            {
                top,
                left,
                right,
                transform: TextAIData.elementPosition &&
                    TextAIData.elementPosition.transform,
            } :
            {}
        } >
        {!variables.isEditor ? ( <
                div className = {
                    classNames(styles.close, {
                        [styles.closeWithMessages]: TextAIData.conversation.length,
                    })
                } >
                <
                Close onClick = {
                    close
                }
                /> <
                /div>
            ) : null
        } <
        Messages / > {
            TextAIData.element || variables.isEditor ? < TextAI / > : null
        } <
        /div>
    );
});