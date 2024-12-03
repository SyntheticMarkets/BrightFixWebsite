import React, {
    useContext,
    useRef,
    useState
} from "react";
import GlobalStore from "../../stores/GlobalStore";
import UserStore from "../../stores/UserStore";
import CanvasStore from "../../stores/CanvasStore";
import SearchStore from "../../stores/SearchStore";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import HoverStore from "../../stores/HoverStore";
import {
    faTimes,
    faComment,
    faSearch,
    faCrosshairs,
} from "@fortawesome/pro-light-svg-icons";
import {
    InspectStoreClass
} from "../../stores/InspectStore";
import {
    observer
} from "mobx-react-lite";
import {
    faReact
} from "@fortawesome/free-brands-svg-icons";
import {
    faPen,
    faUser
} from "@fortawesome/pro-light-svg-icons";
import styles from "./ControlBar.module.scss";
import {
    trackEvent
} from "../utils";
import classNames from "classnames";
import ControlBarButton from "./ControlBarButton/ControlBarButton";
import AIButton from "./AIButton/AIButton";
import InstallVSIcon from "./InstallVSIcon/InstallVSIcon";
import Profile from "./Profile/Profile";
import {
    OutsideClickHandler
} from "../utils";
import Scroll from "./Scroll/Scroll";
import Draggable from "react-draggable";
import ChartIframe from "./ChatIframe/ChatIframe";

export const ControlBar = observer((props) => {
    const GlobalData = useContext(GlobalStore);
    const CanvasData = useContext(CanvasStore);
    const SearchData = useContext(SearchStore);
    const HoverStoreData = useContext(HoverStore);
    const [focus, setFocus] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const UserData = useContext(UserStore);

    const openCanvas = async (e) => {
        SearchData.setSearchOpen(true);
        SearchData.setSearch("");
        CanvasData.setCanvasOpen(true);

        trackEvent(`controlBar - open canvas`);
    };

    const openDetectBox = () => {
        InspectStoreClass.toggleDetect(true);

        trackEvent(`controlBar - open detect box`);
    };

    const dragStop = (event, data) => {
        let x = data.x;
        let y = data.y;

        GlobalData.setControlBarPosition(x, y);
    };

    const closeClick = () => {
        if (HoverStoreData.isHovering) {
            GlobalData.setReactDetectionOpen(false);
            HoverStoreData.setIsHovering(false);
        } else if (GlobalData.reactDetectionOpen) {
            GlobalData.setReactDetectionOpen(false);
        }
    };

    const openFindInVScode = () => {
        trackEvent("ControlBar - click on find in VSCode button");
        HoverStoreData.setIsHovering(true, true, "detectInVSCode");
    };

    const openLogin = () => {
        GlobalData.setModalOpen("login");
    };

    const openSignUp = () => {
        window.open("https://www.jinno.app");
        // GlobalData.setModalOpen("signUp");
    };

    const startFindReactComponent = () => {
        trackEvent(`controlBar - open react detection`);
        GlobalData.setReactDetectionOpen(true);
    };

    const openProfile = () => {
        setShowProfile(true);
    };

    const openAI = () => {
        trackEvent(`AI - click on do magic`);
        HoverStoreData.setIsHovering(true, true, "magic");
    };
    const openChat = () => {
        GlobalData.toggleChat(true);
    };

    const nodeRef = useRef(null);

    let isLogin = UserData.email ? true : false;

    if (window.isAws) {
        return < > < />;
    }

    const showSelectElement =
        HoverStoreData.isHovering || GlobalData.reactDetectionOpen;

    return ( <
        Draggable key = {
            1
        }
        nodeRef = {
            nodeRef
        }
        bounds = {
            "html"
        }
        handle = ".controlbar_dragArea"
        defaultClassName = {
            classNames(styles.ControlBar_mainWrapper, {
                [styles.ControlBar_notLogin]: !showSelectElement,
                [styles.reactDetectionOpen]: showSelectElement,
                [styles.increaseWidth]: !isLogin,
                [styles.ControlBar_mainDesign]: CanvasData.canvasOpen ||
                    !CanvasData.showControlBar ||
                    GlobalData.isOpen ||
                    GlobalData.system === "tasks",
            })
        }
        position = {
            {
                x: CanvasData.showControlBar ? GlobalData.aiX : 0,
                y: CanvasData.showControlBar ? GlobalData.aiY : 0,
            }
        }
        onStop = {
            dragStop
        }
        scale = {
            1
        } >
        <
        div ref = {
            nodeRef
        } >
        <
        span className = {
            styles.showScroll
        } >
        <
        Scroll dragClass = {
            "controlbar_dragArea"
        }
        /> <
        /span> <
        div className = {
            styles.ControlBar_main
        }
        onMouseEnter = {
            () => {
                setFocus(true);
            }
        }
        onMouseLeave = {
            () => {
                setFocus(false);
            }
        } >
        {
            isLogin && !CanvasData.canvasOpen && !showSelectElement ? ( <
                div className = {
                    styles.ControlBar_controls
                } > {
                    showProfile ? ( <
                        OutsideClickHandler onOutsideClick = {
                            () => {
                                setShowProfile(false);
                            }
                        } >
                        <
                        Profile / >
                        <
                        /OutsideClickHandler>
                    ) : null
                } <
                ControlBarButton iconText = {
                    "Profile"
                }
                icon = {
                    faUser
                }
                onClick = {
                    openProfile
                }
                /> {
                    UserData.email === "mor@zloof.co.il1" ? ( <
                        ControlBarButton iconText = {
                            "Search"
                        }
                        icon = {
                            faReact
                        }
                        onClick = {
                            openCanvas
                        }
                        />
                    ) : null
                } <
                ControlBarButton iconText = {
                    "Find"
                }
                icon = {
                    faReact
                }
                onClick = {
                    openFindInVScode
                }
                /> <
                AIButton focus = {
                    focus
                }
                /> <
                ControlBarButton iconText = {
                    "Design"
                }
                icon = {
                    faPen
                }
                onClick = {
                    openDetectBox
                }
                /> <
                ControlBarButton iconText = {
                    "Support"
                }
                icon = {
                    faComment
                }
                onClick = {
                    openChat
                }
                /> <
                ChartIframe / >
                <
                /div>
            ) : null
        } {
            HoverStoreData.isHovering || GlobalData.reactDetectionOpen ? ( <
                div className = {
                    styles.Close
                } >
                <
                FontAwesomeIcon icon = {
                    faTimes
                }
                onClick = {
                    closeClick
                }
                /> <
                /div>
            ) : null
        } {
            showSelectElement ? ( <
                div className = {
                    styles.ReactDetectionText
                } >
                Click on the screen to select {
                    GlobalData.pageHaveReact ? " React component" : " HTML element"
                } <
                /div>
            ) : null
        } {
            !isLogin ? ( <
                div className = {
                    styles.notLogin
                } >
                <
                div className = {
                    styles.login_text
                } >
                Welcome to Jinno!Check out Jinno 's features{" "} <
                a href = "https://website.jinno.app/"
                target = "_blank" >
                here <
                /a> <
                br / >
                <
                div className = {
                    styles.login_signupRow
                } >
                <
                div onClick = {
                    openSignUp
                }
                className = {
                    styles.signupButton
                } >
                Start
                for free <
                /div> <
                u onClick = {
                    openLogin
                } > or login < /u> <
                /div> <
                /div> <
                /div>
            ) : null
        } <
        /div> {
            !GlobalData.userHaveVSextension ? < InstallVSIcon / > : null
        } <
        /div> <
        /Draggable>
    );
});