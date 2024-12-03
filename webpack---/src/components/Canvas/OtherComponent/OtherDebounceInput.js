import React, {
    useState,
    useEffect,
    useRef
} from "react";
import {
    DebounceInput
} from "react-debounce-input";
import styles from "./OtherDebounceInput.module.scss";

const Customizable = (props0) => {
    const [value, setValue] = useState(props0.value);
    const [infinite, setInfinite] = useState(false);
    const [key, setKey] = useState(true);
    /*remove*/
    useEffect(() => {
        if (props0.value !== value) {
            setValue(props0.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props0.value]); /*remove*/

    return ( <
        div >
        <
        div className = {
            styles.config
        } >
        <
        label className = {
            styles.label
        } >
        Infinite timeout:
        <
        input className = {
            styles.input
        }
        type = "checkbox"
        checked = {
            infinite
        }
        onChange = {
            (e) => setInfinite(e.target.checked)
        }
        /> <
        /label> <
        /div>

        <
        DebounceInput debounceTimeout = {
            infinite ? -1 : props0.debounceTimeout
        }
        value = {
            value
        } { ...props0
        }
        onChange = {
            (e) => setValue(e.target.value)
        }
        onKeyDown = {
            (e) => setKey(e.key)
        }
        /> <
        p > Value: {
            value
        } < /p> <
        p > Key pressed: {
            key
        } < /p> <
        /div>
    );
};

const Controllable = (props1) => {
    const [value, setValue] = useState(props1.value);
    const [debouncedValue, setDebouncedValue] = useState();
    /*remove*/
    useEffect(() => {
        if (props1.value !== value) {
            setValue(props1.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props1.value]); /*remove*/

    return ( <
        div >
        <
        div className = {
            styles.config
        } >
        <
        label className = {
            styles.label
        } >
        Contollable input:
        <
        input className = {
            styles.input
        }
        type = "text"
        value = {
            value
        }
        onChange = {
            (e) => setValue(e.target.value)
        }
        /> {
            value
        } <
        /label> <
        /div>

        <
        div className = {
            styles.config
        } >
        <
        label className = {
            styles.label
        } >
        Debounced input:
        <
        DebounceInput className = {
            styles.input
        }
        value = {
            value
        } { ...props1
        }
        onChange = {
            (e) => {
                setValue(e.target.value);
                setDebouncedValue(e.target.value);
            }
        }
        /> {
            debouncedValue
        } <
        /label> <
        /div> <
        /div>
    );
};

const Textarea = (props3) => {
    const [value, setValue] = useState(props3.value);
    const [infinite, setInfinite] = useState(false);
    const [key, setKey] = useState("");
    /*remove*/
    useEffect(() => {
        if (props3.value !== value) {
            setValue(props3.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props3.value]); /*remove*/

    return ( <
        div >
        <
        div className = {
            styles.config
        } >
        <
        label className = {
            styles.label
        } >
        Infinite timeout:
        <
        input className = {
            styles.input
        }
        type = "checkbox"
        checked = {
            infinite
        }
        onChange = {
            (e) => setInfinite(e.target.checked)
        }
        /> <
        /label> <
        /div>

        <
        DebounceInput cols = "60"
        rows = "7"
        element = {
            props3.element
        }
        className = {
            styles.textarea
        } { ...props3
        }
        debounceTimeout = {
            infinite ? -1 : props3.debounceTimeout
        }
        onChange = {
            (e) => setValue(e.target.value)
        }
        onKeyDown = {
            (e) => setKey(e.key)
        }
        /> <
        p > Value: {
            value
        } < /p> <
        p > Key pressed: {
            key
        } < /p> <
        /div>
    );
};

const UndoRedo = (props2) => {
    const [value, setValue] = useState(props2.value);
    const [history, setHistory] = useState([""]);
    const [historyIndex, setHistoryIndex] = useState(0);

    /*remove*/
    useEffect(() => {
        if (props2.value !== value) {
            setValue(props2.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props2.value]); /*remove*/

    const onChange = ({
        target: {
            value
        }
    }) => {
        setValue(value);
        setHistoryIndex(historyIndex + 1);
        setHistory([...history.slice(0, historyIndex + 1), value]);
    };

    const onRedo = () => {
        setValueFromHistory(historyIndex + 1);
    };

    const onUndo = () => {
        setValueFromHistory(historyIndex - 1);
    };

    const setValueFromHistory = (index) => {
        const newHistoryIndex = Math.min(Math.max(index, 0), history.length - 1);

        setValue(history[newHistoryIndex]);
        setHistoryIndex(newHistoryIndex);
    };

    const HistoryElements = history.map((value, key) => ( <
        span className = "item"
        key = {
            key
        } > {
            key === historyIndex ? ( <
                b > {
                    `"${value}"`
                } < /b>
            ) : ( <
                span > {
                    `"${value}"`
                } < /span>
            )
        } <
        /span>
    ));

    return ( <
        div >
        <
        div className = {
            styles.config
        } >
        <
        label className = {
            styles.label
        } >
        Debounced Input:
        <
        DebounceInput className = {
            styles.input
        }
        value = {
            value
        } { ...props2
        }
        onChange = {
            onChange
        }
        /> <
        /label>

        <
        label className = {
            styles.label
        } >
        <
        button onClick = {
            onUndo
        } > Undo < /button> <
        /label>

        <
        label className = {
            styles.label
        } >
        <
        button onClick = {
            onRedo
        } > Redo < /button> <
        /label> <
        /div>

        <
        p > Current Value: {
            value
        } < /p> <
        p > History: {
            HistoryElements
        } < /p> <
        p > History Index: {
            historyIndex
        } < /p> <
        /div>
    );
};

const RefComponent = (props4) => {
    const elementRef = useRef(null);
    const [value, setValue] = useState(props4.value);
    const [key, setKey] = useState(null);
    /*remove*/
    useEffect(() => {
        if (props4.value !== value) {
            setValue(props4.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props4.value]); /*remove*/

    return ( <
        div >
        <
        div className = {
            styles.config
        } >
        <
        label className = {
            styles.label
        } >
        <
        button onClick = {
            () => elementRef.current.focus()
        } >
        Focus, please <
        /button> <
        /label>

        <
        label className = {
            styles.label
        } >
        <
        button onClick = {
            () => elementRef.current.blur()
        } >
        Blur, please <
        /button> <
        /label> <
        /div>

        <
        DebounceInput inputRef = {
            elementRef
        }
        onChange = {
            (e) => setValue(e.target.value)
        }
        onKeyDown = {
            (e) => setKey(e.key)
        } { ...props4
        }
        /> <
        p > Value: {
            value
        } < /p> <
        p > Key pressed: {
            key
        } < /p> <
        /div>
    );
};

export default (props) => {
    /*remove*/
    const firstElement = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            if (props && props.selectMe) {
                props.selectMe({
                    currentTarget: firstElement.current
                }, 0, true);
                props.selectMe({
                    currentTarget: firstElement.current
                }, 0, false);
            }
        }, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); /*remove*/

    return ( <
        div className = {
            styles.app
        } >
        <
        div className = {
            styles.title
        } > react - debounce - input < /div> <
        Wrapper id = {
            0
        } { ...props
        } >
        <
        section className = {
            styles.section
        }
        ref = {
            firstElement
        } >
        <
        div className = {
            styles.subTitle
        } > Example 1. Customizable < /div> <
        Customizable { ...(props.multiComponent && props.multiComponent[0])
        }
        /> <
        /section> <
        /Wrapper>

        <
        Wrapper id = {
            1
        } { ...props
        } >
        <
        section className = {
            styles.section
        } >
        <
        div className = {
            styles.subTitle
        } > Example 2. Controllable < /div> <
        Controllable { ...(props.multiComponent && props.multiComponent[1])
        }
        /> <
        /section> <
        /Wrapper>

        <
        Wrapper id = {
            2
        } { ...props
        } >
        <
        section className = {
            styles.section
        } >
        <
        div className = {
            styles.subTitle
        } > Example 3. Undo - Redo < /div> <
        UndoRedo { ...(props.multiComponent && props.multiComponent[2])
        }
        /> <
        /section> <
        /Wrapper>

        <
        Wrapper id = {
            3
        } { ...props
        } >
        <
        section className = {
            styles.section
        } >
        <
        div className = {
            styles.subTitle
        } > Example 4. Debounced Textarea < /div> <
        Textarea { ...(props.multiComponent && props.multiComponent[3])
        }
        /> <
        /section> <
        /Wrapper>

        <
        Wrapper id = {
            4
        } { ...props
        } >
        <
        section className = {
            styles.section
        } >
        <
        div className = {
            styles.subTitle
        } > Example 5. Custom ref < /div> <
        RefComponent { ...(props.multiComponent && props.multiComponent[4])
        }
        /> <
        /section> <
        /Wrapper> <
        /div>
    );
};;

/*remove*/
const Wrapper = (props) => {
    return ( <
        span onClick = {
            (e) => {
                props.selectMe(e, props.id);
            }
        }
        onMouseEnter = {
            (e) => {
                props.selectMe(e, props.id, true);
            }
        }
        onMouseLeave = {
            (e) => {
                props.unSelectMe(props.id);
            }
        } >
        {
            props.children
        } <
        /span>
    );
}; /*remove*/