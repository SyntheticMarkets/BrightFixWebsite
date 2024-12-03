import React, {
    useEffect
} from "react";
import styles from "./Message.module.scss";
import classNames from "classnames";
import {
    TextAIStoreClass
} from "../../../../stores/TextAIStore";
import {
    observer
} from "mobx-react-lite";
import Markdown from "markdown-to-jsx";
import {
    CircularProgress
} from "@material-ui/core";

const Message = observer((props) => {
    const Message = TextAIStoreClass.getMessage(props.uuid);
    const properties = Message.properties ? Message.properties : {};
    const from = Message.from;
    const text = Message.text;
    const componentName = properties.componentName;
    const codeReverted = properties.codeReverted;
    const loading = properties.loading || (from === "AI" && !text);
    const percentage = properties.percentage;
    const haveStreaming = properties.taskId;
    const showRevetCodeButton = properties.showRevetCodeButton;
    let interval;

    useEffect(() => {
        if (loading && !interval) {
            interval = true;
        } else {
            clearInterval(interval);
        }
    }, [properties.loading, text]);

    const openModalChanges = () => {
        const messageId = Message.uuid;
        TextAIStoreClass.setShowCodeDiff(messageId);
    };

    const revertOnce = () => {
        Message.revertCode();
    };

    return ( <
        div className = {
            classNames(styles.message, {
                [styles.user_message]: from === "user",
                [styles.default_message]: from === "default",
                [styles.have_streaming]: haveStreaming,
            })
        } >
        <
        Markdown > {
            text ? text : ""
        } < /Markdown> {
            from === "default" ? ( <
                >
                I will do this task only on this {
                        " "
                    } <
                    b >
                    <
                    i > {
                        componentName
                    } < /i>,<br / > I cannot change code outside that
                component. <
                /b> <
                />
            ) : null
        } {
            from === "Revert" ? ( <
                Revert revertOnce = {
                    revertOnce
                }
                codeReverted = {
                    codeReverted
                }
                />
            ) : null
        } {
            from === "CodeReverted" ? ( <
                CodeReverted revertOnce = {
                    revertOnce
                }
                codeReverted = {
                    codeReverted
                }
                />
            ) : null
        }

        {
            from === "CodeDiff" ? ( <
                CodeDiff showRevetCodeButton = {
                    showRevetCodeButton
                }
                codeReverted = {
                    codeReverted
                }
                revertOnce = {
                    revertOnce
                }
                openModalChanges = {
                    openModalChanges
                }
                />
            ) : null
        } <
        div className = {
            classNames(styles.small_icon, {
                [styles.small_iconRight]: from === "user",
            })
        } >
        {
            from === "user" ? < BlackIcon / > : null
        } {
            from !== "user" && from !== "default" ? < BlueIcon / > : null
        } <
        /div> {
            loading ? ( <
                > {
                    percentage ? ( <
                        div className = {
                            styles.loadingWrapper
                        } >
                        <
                        CircularProgress variant = "determinate"
                        value = {
                            percentage
                        }
                        /> <
                        div className = {
                            styles.loadingWrapper_percentage
                        } > {
                            percentage
                        } %
                        <
                        /div> <
                        /div>
                    ) : ( <
                        Loading / >
                    )
                } <
                />
            ) : null
        } <
        /div>
    );
});

const Loading = () => {
    return ( <
        div className = {
            styles.loadingWrapper
        } >
        <
        div className = {
            styles.loading
        } >
        <
        div className = {
            styles.dot
        } > < /div> <
        div className = {
            styles.dot
        } > < /div> <
        div className = {
            styles.dot
        } > < /div> <
        /div> <
        /div>
    );
};

const CodeReverted = () => {
    return ( <
        >
        The code has been reverted. <
        br / >
        Let 's try again! <
        br / >
        Try to explain to me better how can I solve the problem
        for you. <
        />
    );
};
const Revert = (props) => {
    return ( <
        >
        You can revert the code
        if it doesn 't meet your expectations or try to run
        another magic <
        Button text = {
            props.codeReverted ? "The code has been reverted" : "Revert code"
        }
        onClick = {
            props.revertOnce
        }
        disabled = {
            props.codeReverted
        }
        /> <
        />
    );
};
const CodeDiff = (props) => {
    return ( <
        div >
        I will modify your code as follows:
        <
        Button onClick = {
            props.openModalChanges
        }
        text = {
            "See code changes"
        }
        /> {
            props.showRevetCodeButton ? ( <
                >
                <
                div className = {
                    styles.row
                } > You can revert the code: < /div> <
                Button text = {
                    props.codeReverted ? "The code has been reverted" : "Revert code"
                }
                onClick = {
                    props.revertOnce
                }
                disabled = {
                    props.codeReverted
                }
                /> <
                div className = {
                    styles.row
                } >
                If it doesn 't meet your expectations, please explain what I can do
                to make it better <
                /div> <
                />
            ) : null
        } <
        /div>
    );
};

const Button = (props) => {
    return ( <
        div className = {
            classNames(styles.button, {
                [styles.buttonAffect]: !props.disabled,
                [styles.buttonDisabled]: props.disabled,
            })
        }
        onClick = {
            props.disabled ? () => {} : props.onClick
        } >
        {
            props.text
        } <
        /div>
    );
};

const BlueIcon = () => {
    return < > < />
    return ( <
        svg width = "17"
        height = "21"
        viewBox = "0 0 17 21"
        fill = "none"
        xmlns = "http://www.w3.org/2000/svg" >
        <
        path d = "M0.112425 20.1846C5.31242 20.9846 10.4458 18.1212 12.1124 16.2879C10.3946 12.1914 21.0003 2.24186 14.0003 2.24148C12.3817 2.24148 10.9993 -1.9986 5.11242 1.1846C5.09121 2.47144 5.11242 6.92582 5.11242 7.6842C5.11242 18.1842 -0.887575 19.5813 0.112425 20.1846Z"
        fill = "white" /
        >
        <
        /svg>
    );
};

const BlackIcon = () => {
    return ( <
        svg width = "18"
        height = "21"
        viewBox = "0 0 18 21"
        fill = "none"
        xmlns = "http://www.w3.org/2000/svg" >
        <
        path d = "M16.9259 20.1846C11.7259 20.9846 6.59258 18.1212 4.92591 16.2879C6.64378 12.1914 -3.962 2.24186 3.038 2.24148C4.65661 2.24148 6.03906 -1.9986 11.9259 1.1846C11.9471 2.47144 11.9259 6.92582 11.9259 7.6842C11.9259 18.1842 17.9259 19.5813 16.9259 20.1846Z"
        fill = "#262628" /
        >
        <
        /svg>
    );
};
export default Message;