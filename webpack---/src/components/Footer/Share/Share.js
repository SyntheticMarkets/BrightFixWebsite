import React, {
    useState,
    useContext
} from "react";
import {
    faPaperPlane
} from "@fortawesome/pro-light-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import CommentsStore from "../../../stores/CommentsStore";
import {
    observer
} from "mobx-react-lite";
import Input from "../../Input/Input";
import GlobalStore from "../../../stores/GlobalStore";
import HistoryStore from "../../../stores/HistoryStore";
import {
    copy,
    getBaseUrl
} from "../../utils";
import styles from './Share.module.scss'

export const Share = observer(function(props) {
            const GlobalData = useContext(GlobalStore);
            const CommentsData = useContext(CommentsStore);
            const HistoryData = useContext(HistoryStore);

            const [value, setValue] = useState("");
            const [sendAffect, setSendAffect] = useState(false);
            const [copyText, setCopyText] = useState("copy");

            // const link = `${getBaseUrl()}/share?id=${HistoryData.historyId}&shareSession=${HistoryData.shareSession}`;
            const link = `${getBaseUrl()}/share/#FixMeId=${HistoryData.historyId}&shareSession=${HistoryData.shareSession}`;

            const toggleOpen = (bool) => {
                if (CommentsData.emptyFromComments && bool) {
                    return;
                }

                GlobalData.setTab('summary')
                if (bool) {
                    // GlobalData.toggleShareOpen(true);
                } else {
                    // GlobalData.toggleShareOpen(false);
                }
            };

            const change = (e) => {
                setValue(e.target.value);
            };

            const send = () => {
                if (value /*&& GlobalData.shareOpen*/ ) {
                    setSendAffect(true);
                    setValue("");

                    HistoryData.share(value);

                    setTimeout(() => {
                        setSendAffect(false);
                    }, 1300);
                }
            };

            const detectEnter = (e) => {
                if (e.which === 13) {
                    send();
                }
            };

            const copyLink = () => {
                copy(link);
                setCopyText("Copied!");

                setTimeout(() => {
                    setCopyText("Copy!");
                }, 3000);
            };

            let shareOpen = true
            return ( <
                div className = {
                    styles.Share
                } >
                <
                div className = {
                    `${styles.Share_circle} ${
          shareOpen ? styles.Share_circleOpen : ""
        }`
                } >
                <
                div className = {
                    `${styles.Share_circleHalf} ${
            shareOpen ? styles.Share_circleHalfOpen : ""
          }`
                } >
                < /div> <
                /div> <
                FontAwesomeIcon icon = {
                    faPaperPlane
                }
                className = {
                    `${styles.Share_icon} ${
          shareOpen ? styles.Share_iconOpen : ""
        } ${
          sendAffect ? styles.Share_iconSendAffect : null
        }`
                }
                onClick = {
                    send
                }
                />

                <
                div className = {
                    `${styles.Share_button} ${
          shareOpen ? styles.Share_buttonOpen : ""
        } ${CommentsData.emptyFromComments ? styles.Share_buttonDisabled : ""}`
                }
                onClick = {!shareOpen ? toggleOpen : null
                } >
                <
                div className = {
                    `${styles.Share_box} ${
            shareOpen ? styles.Share_boxOpen : ''
          }`
                } >
                <
                div className = {
                    styles.Share_title
                } >
                Anyone with this link can see and edit:
                <
                /div> <
                div className = {
                    styles.Share_linkBox
                } >
                <
                div className = {
                    styles.Share_link
                } >
                <
                a href = {
                    link
                }
                rel = "noopener noreferrer"
                target = "_blank" > {
                    link
                } <
                /a> <
                /div> <
                div className = {
                    styles.Share_copy
                }
                onClick = {
                    copyLink
                } > {
                    copyText
                } <
                /div> <
                /div> <
                div className = {
                    styles.Share_or
                } >
                <
                div className = {
                    styles.Share_line
                } > < /div> <
                span className = {
                    styles.Share_orText
                } > OR < /span> <
                /div> {
                    shareOpen ? ( <
                        FontAwesomeIcon icon = {
                            faTimes
                        }
                        className = {
                            styles.Share_close
                        }
                        onClick = {
                            () => {
                                props.toggleShareOpen();
                            }
                        }
                        />
                    ) : null
                } <
                div className = {
                    styles.Share_input
                } >
                <
                Input type = "email"
                placeholder = "Email"
                onKeyPress = {
                    detectEnter
                }
                value = {
                    value
                }
                text = {
                    "Share with someone on your team:"
                }
                onChange = {
                    change
                }
                /> <
                /div> {
                    CommentsData.saveImagesStatus.needToSave || true ? ( < div className = {
                            styles.share_progress
                        } >
                        <
                        span className = {
                            styles.share_progress_title
                        } > Saving your designs: < /span> <
                        span className = {
                            styles.share_progress_number
                        } > {
                            `${Math.round((CommentsData.saveImagesStatus.saved/CommentsData.saveImagesStatus.needToSave)*100)}%`
                        } <
                        /span> <
                        /div>):null} <
                        /div> <
                        /div> <
                        /div>
                    );
                });