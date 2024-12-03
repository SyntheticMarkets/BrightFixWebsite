import React, {
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import {
    observer
} from "mobx-react-lite";
import TextAIStore from "../../../stores/TextAIStore";
import styles from "./TextAI.module.scss";
import AISubmit from "./AISubmit/AISubmit";
import classNames from "classnames";
import HoverStore from "../../../stores/HoverStore";
import variables from "../../../variables";
styles.isEditor = true;

const TextAI = observer((props) => {
    const textarea = useRef(null);
    const TextAIData = useContext(TextAIStore);
    const [showError, setShowError] = useState(false);
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        if (TextAIData.inputValue.length >= 8 && showError) {
            setShowError(false);
        }
    }, [TextAIData.inputValue]);

    useEffect(() => {
        const handleMouseEnter = () => {
            setFocus(true);
        };

        const handleMouseLeave = () => {
            setFocus(false);
        };

        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    useEffect(() => {
        if (textarea && textarea.current && !variables.isEditor) {
            textarea.current.focus();
        }
    }, [TextAIData.elementPosition]);

    useEffect(() => {
        if (TextAIData.element && variables.isEditor) {
            textarea.current.focus();
        }
    }, [TextAIData.element]);

    const onChange = (e) => {
        if (e && e.target && e.target.value != null) {
            TextAIData.changeAIinputValue(e.target.value);
        }
    };
    const onEnterPress = (e) => {
        if (TextAIData.loading) {
            return;
        }
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            submit();
        }
    };

    const submit = () => {
        if (TextAIData.inputValue.length < 8 && !TextAIData.loading) {
            setShowError(true);
            return;
        }

        if (variables.isEditor) {
            TextAIData.submit();
        } else if (!TextAIData.element) {} else {
            setShowError(false);
            TextAIData.submit();
        }
    };

    return ( <
        div className = {
            classNames(styles.TextAI, {
                [styles.TextAI_onButton]: variables.isEditor,
                [styles.TextAI_focus]: variables.isEditor && focus,
            })
        }
        style = {
            {
                "--is-editor": variables.isEditor || true ? "0" : "0",
            }
        } >
        <
        textarea placeholder = "Make the text larger, add elements to the screen,
        change element colors or write js code "
        value = {
            TextAIData.inputValue
        }
        onChange = {
            onChange
        }
        onKeyDown = {
            onEnterPress
        }
        ref = {
            textarea
        }
        className = {
            styles.textarea
        }
        /> {
            showError ? ( <
                div className = {
                    styles.error
                } > Please enter at least 8 characters. < /div>
            ) : (
                false
            )
        } <
        AISubmit submit = {
            submit
        }
        /> <
        /div>
    );
});
export default TextAI;