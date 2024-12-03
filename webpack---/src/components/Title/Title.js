import React, {
    useContext
} from "react";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import {
    observer
} from "mobx-react-lite";
import GlobalStore from "../../stores/GlobalStore";
import StyleStore from "../../stores/StyleStore";
import styles from './Title.module.scss'

export const Title = observer((props) => {
    const GlobalData = useContext(GlobalStore);
    const StyleData = useContext(StyleStore);

    // const toggleMinimize = () => {
    //   GlobalData.setIsMinimize(!GlobalData.isMinimize);
    // };

    const close = () => {
        GlobalData.toggleDetectBox(false);
    };

    const toggleButton = () => {
        if (GlobalData.tab === "editor") {
            GlobalData.setTab("Comments");
        } else {
            GlobalData.setTab("editor");
        }
    };

    return ( <
        div >
        <
        div className = {
            styles.Title_up
        } >
        <
        div className = {
            props.dragClass
        } > { /* <Profile /> */ } <
        /div> <
        div className = {
            styles.Title_Buttons
        } > {
            /* <div
                        className={`Title_button Title_button_minimaze`}
                        onClick={toggleMinimize}
                      >
                        {GlobalData.isMinimize ? (
                          <FontAwesomeIcon
                            icon={faPlus}
                            className='Title_button_minimaze_iconPlus'
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faWindowMinimize}
                            className='Title_button_minimaze_icon'
                          />
                        )}
                      </div> */
        } <
        div className = {
            styles.Title_button_close
        }
        onClick = {
            close
        } >
        <
        FontAwesomeIcon icon = {
            faTimes
        }
        className = {
            styles.Title_button_close_icon
        }
        /> <
        /div> <
        /div> <
        /div>

        {
            StyleData.elm &&
                !GlobalData.isMinimize &&
                (GlobalData.tab === "editor" || GlobalData.tab === "Comments") ? ( <
                    div >
                    <
                    div className = {
                        styles.Title_switchButton
                    }
                    onClick = {
                        toggleButton
                    } >
                    <
                    div className = {
                        styles.Title_selectedButton
                    }
                    style = {
                        {
                            left: GlobalData.tab === "Comments" ? "50%" : "0%"
                        }
                    } >
                    < /div> <
                    div className = {
                        styles.Title_switchText
                    } > Editor < /div> <
                    div className = {
                        `${styles.Title_switchText} ${styles.Title_switchTextLast}`
                    } >
                    Your changes <
                    /div> <
                    /div> <
                    /div>
                ) : null
        } <
        /div>
    );
});