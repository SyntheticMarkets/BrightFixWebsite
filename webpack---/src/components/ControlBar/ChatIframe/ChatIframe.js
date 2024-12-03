import React, {
    useContext,
    useState
} from "react";
import styles from "./ChatIframe.module.scss";
import GlobalStore from "../../../stores/GlobalStore";
import UserStore from "../../../stores/UserStore";
import CanvasStore from "../../../stores/CanvasStore";
import {
    observer
} from "mobx-react-lite";
import {
    CircularProgress
} from "@material-ui/core";
import Close from "../../Close/Close";
import {
    faUser
} from "@fortawesome/pro-light-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

const ChartIframe = observer(() => {
    const UserData = useContext(UserStore);
    const GlobalData = useContext(GlobalStore);
    const CanvasData = useContext(CanvasStore);
    const userId = UserData.email ? UserData.email : UserData.distinctId;
    const [showClickBackground, setShowClickBackground] = useState(true);
    const smallChatSize = GlobalData.smallChatSize;
    const showChatSupport = GlobalData.showChatSupport;

    const close = () => {
        GlobalData.toggleChat(false);
    };

    const getIframeBigger = () => {
        GlobalData.toggleChat(true, false);
        setShowClickBackground(false);

        window.chrome.storage.sync.set({
            openChatIframe: {
                show: true,
                smallSize: false
            },
        });
    };

    return ( <
        > {
            showClickBackground && showChatSupport && smallChatSize ? ( <
                div className = {
                    styles.firstMessageWrapper
                } >
                <
                div className = {
                    styles.closeButton
                } >
                <
                Close onClick = {
                    close
                }
                /> <
                /div> <
                FirstMessage onClick = {
                    getIframeBigger
                }
                /> <
                /div>
            ) : null
        } {
            showChatSupport && CanvasData.showControlBar && !smallChatSize ? ( <
                div className = {
                    styles.chat
                } >
                <
                div className = {
                    styles.closeButton
                } >
                <
                Close onClick = {
                    close
                }
                /> <
                /div> <
                >
                <
                iframe className = {
                    styles.chat
                }
                src = {
                    `https://tawk.to/chat/6698a986becc2fed6926f771/1i325cdq5?userId=${userId}`
                }
                /> <
                CircularProgress size = {
                    24
                }
                color = "black"
                className = {
                    styles.refresh
                }
                /> <
                /> <
                /div>
            ) : null
        } <
        />
    );
});

const FirstMessage = (props) => {
    return ( <
        div className = {
            styles.first_message
        }
        onClick = {
            props.onClick
        } >
        <
        div className = {
            styles.first_message_profile
        } >
        <
        FontAwesomeIcon icon = {
            faUser
        }
        /> <
        /div> <
        div className = {
            styles.first_message_text
        } >
        Hello, I am a real person!How is Jinno working
        for you ?
        <
        br / >
        Do you need any help ?
        <
        /div> <
        /div>
    );
};
export default ChartIframe;