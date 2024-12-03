import React, {
    useState,
    useEffect
} from "react";
import {
    CopyToClipboard
} from "react-copy-to-clipboard";
import styles from "./OtherCopyToClipBoard.module.scss";

export default (props) => {
    const [value, setValue] = useState(props.text);
    const [copied, setCopied] = useState(false);
    /*remove*/
    useEffect(() => {
        if (props.text !== value) {
            setValue(props.text);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.text]); /*remove*/

    return ( <
        div >
        <
        textarea value = {
            value
        }
        onChange = {
            (e) => {
                setValue(e.target.value);
                setCopied(false);
            }
        }
        />

        <
        div className = {
            styles.title
        } > 1. Button < /div> <
        CopyToClipboard options = {
            {
                debug: props.debug,
                message: props.message
            }
        }
        text = {
            value
        }
        onCopy = {
            () => setCopied(true)
        } >
        <
        span > Copy to clipboard with span < /span> <
        /CopyToClipboard>

        <
        div className = {
            styles.title
        } > 2. Span < /div> <
        CopyToClipboard options = {
            {
                debug: props.debug,
                message: props.message
            }
        }
        text = {
            value
        }
        onCopy = {
            () => setCopied(true)
        } >
        <
        button > Copy to clipboard with button < /button> <
        /CopyToClipboard>

        <
        div className = {
            styles.title
        } > 2. Width onClick < /div> <
        section className = "section" >
        <
        CopyToClipboard options = {
            {
                debug: props.debug,
                message: props.message
            }
        }
        onCopy = {
            () => setCopied(true)
        }
        text = {
            value
        } >
        <
        button onClick = {
            () => setCopied(true)
        } >
        Copy to clipboard with onClick prop <
        /button> <
        /CopyToClipboard> <
        /section>

        {
            copied ? < span className = {
                    styles.copyText
                } > Copied. < /span> : null} <
                /div>
        );
    };;