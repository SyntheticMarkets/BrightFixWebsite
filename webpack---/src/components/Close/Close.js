import React, {
    useContext,
    useState
} from "react";
import styles from "./Close.module.scss";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    observer
} from "mobx-react-lite";
import HoverStore from "../../stores/HoverStore";
import {
    PageDataStoreClass
} from "../../stores/PageDataStore";
import GlobalStore from "../../stores/GlobalStore";
import CanvasStore from "../../stores/CanvasStore";
import classNames from "classnames";
import {
    OutsideClickHandler,
    trackEvent
} from "../utils";

const Close = observer((props) => {
    const CanvasData = useContext(CanvasStore);
    const [showMenu, setShowMenu] = useState(false);
    const GlobalData = useContext(GlobalStore);

    const closeClick = async () => {
        const canOpenJinnoByDefault = await PageDataStoreClass.canOpenJinnoByDefault(
            false,
            true
        );

        if (!showMenu && canOpenJinnoByDefault && props.fromControlBar) {
            setShowMenu(true);
            GlobalData.toggleChat(false);
        } else if (props.fromControlBar) {
            CanvasData.setShowControlBar(false);
        } else if (props.onClick) {
            props.onClick();
        }
    };

    const handleOutsideClick = () => {
        setShowMenu(false);
    };

    const hideFor = (period) => {
        trackEvent(`Extension closed for - ${period ? period : "once"}`);
        setShowMenu(false);

        if (period) {
            CanvasData.hideJinnoForPeriod(period);
        } else {
            CanvasData.setShowControlBar(false);
        }
    };

    return ( <
        div className = {
            styles.wrapper
        } >
        <
        div className = {
            classNames(styles.close, {
                [styles.removeHoverAffect]: showMenu,
            })
        }
        onClick = {
            closeClick
        } >
        <
        FontAwesomeIcon icon = {
            faTimes
        }
        className = {
            styles.icon
        }
        />

        {
            showMenu && props.fromControlBar ? ( <
                OutsideClickHandler onOutsideClick = {
                    handleOutsideClick
                } >
                <
                div className = {
                    styles.menu
                } >
                <
                div className = {
                    styles.menu_item
                }
                onClick = {
                    () => {
                        hideFor("month");
                    }
                } >
                Hide
                for a month <
                /div> <
                div className = {
                    styles.menu_item
                }
                onClick = {
                    () => {
                        hideFor("week");
                    }
                } >
                Hide
                for a week <
                /div> <
                div className = {
                    styles.menu_item
                }
                onClick = {
                    () => {
                        hideFor("day");
                    }
                } >
                Hide
                for 1 day <
                /div> <
                div className = {
                    styles.menu_item
                }
                onClick = {
                    () => {
                        hideFor();
                    }
                } >
                Hide only once <
                /div> <
                /div> <
                /OutsideClickHandler>
            ) : null
        } <
        /div> <
        /div>
    );
});
export default Close;