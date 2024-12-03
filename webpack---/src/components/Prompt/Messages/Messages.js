import React, {
    useContext,
    useState,
    useEffect,
    useRef
} from "react";
import Message from "./Message/Message";
import styles from "./Messages.module.scss";
import {
    observer
} from "mobx-react-lite";
import TextAIStore from "../../../stores/TextAIStore";
import classNames from "classnames";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faArrowDown
} from "@fortawesome/pro-light-svg-icons";

let timeout;
const Messages = observer(() => {
    const [showIcon, setShowIcon] = useState(false);
    const TextAIData = useContext(TextAIStore);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    };

    const handleScroll = () => {
        if (
            messagesEndRef.current &&
            messagesContainerRef.current &&
            TextAIData.conversation.length > 1
        ) {
            const distanceToBottom =
                messagesContainerRef.current.scrollHeight -
                messagesContainerRef.current.scrollTop -
                messagesContainerRef.current.clientHeight;
            if (distanceToBottom <= 20) {
                setShowIcon(false);
            } else {
                setShowIcon(true);
            }
        }
    };

    useEffect(() => {
        handleScroll();
    }, [TextAIData.streamUpdates]);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (TextAIData.conversation.length) {
                const lastMessage =
                    TextAIData.conversation[TextAIData.conversation.length - 1];
                scrollToBottom();
            }
        }, 50);
    }, [TextAIData.conversation.length]);

    const conversation = TextAIData.conversation;

    return ( <
        div className = {
            classNames(styles.Messages, {
                [styles.MessagesOpen]: conversation.length,
            })
        } >
        <
        div className = {
            styles.scrollarea
        }
        ref = {
            messagesContainerRef
        } > {
            conversation.map((item, index) => {
                return <Message key = {
                    item ? item.uuid : index
                }
                uuid = {
                    item.uuid
                }
                />;
            })
        } <
        div ref = {
            messagesEndRef
        }
        className = {
            styles.padding
        }
        /> <
        /div> {
            showIcon && conversation.length ? ( <
                div className = {
                    styles.scrool_down
                }
                onClick = {
                    scrollToBottom
                } >
                <
                FontAwesomeIcon icon = {
                    faArrowDown
                }
                className = {
                    styles.icon
                }
                /> <
                /div>
            ) : null
        } <
        /div>
    );
});

export default Messages;