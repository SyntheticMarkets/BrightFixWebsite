import React, {
    useRef,
    useContext
} from "react";
import {
    Changes
} from "../Changes/Changes";
import {
    Title
} from "../Title/Title";
import {
    Tree
} from "../Tree/Tree";
import {
    observer
} from "mobx-react-lite";
import GlobalStore from "../../stores/GlobalStore";
import {
    Footer
} from "../Footer/Footer.js";
import {
    History
} from "../History/History.js";
import StyleStore from "../../stores/StyleStore";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import CanvasStore from "../../stores/CanvasStore";
import Draggable from "react-draggable";
import styles from './detectBox.module.scss'

window.login = Login
export const DetectBox = observer((props) => {
    const GlobalData = useContext(GlobalStore);
    const StyleData = useContext(StyleStore);
    const CanvasData = useContext(CanvasStore)
    const nodeRef = useRef(null);

    const dragStop = (event, data) => {
        let x = data.x;
        let y = data.y;

        GlobalData.x = x;
        GlobalData.y = y;

        GlobalData.stopDragPosition();
    };

    // const movePosition = ()=>{
    //   GlobalData.movePosition()
    // }

    if (!GlobalData.isOpen || CanvasData.canvasOpen) {
        return <div > < /div>;
    }
    // let signupOpen = true;

    // return <></>
    return ( <
        div className = {
            `${GlobalData.detectBoxPosition==='left' ? styles.detectBoxLeft : ''}`
        } > {
            /* <div className={`detectBox_move ${GlobalData.detectBoxPosition==='left' ? 'detectBox_moveLeft' : ''}`}  onClick={movePosition}>
                    <FontAwesomeIcon icon={GlobalData.detectBoxPosition==='left' ? faChevronRight : faChevronLeft} className='detectBox_move_icon' />
                    <div className={`detectBox_move_borderHidden ${GlobalData.detectBoxPosition==='left' ? `detectBox_move_borderHiddenLeft` : ''}`}>
                      <div className="detectBox_move_border"></div>
                    </div>
                  </div> */
        } <
        Draggable key = {
            1
        }
        nodeRef = {
            nodeRef
        }
        bounds = {
            "html"
        }
        handle = '.detectBox_dragArea'
        defaultClassName = {
            `${styles.detectBox} ${
            GlobalData.isMinimize ? styles.detectBox_Minimaze : ""
          }`
        }
        position = {
            {
                x: GlobalData.x,
                y: GlobalData.y
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
        } > {
            true || (GlobalData.tab !== "signup" && GlobalData.tab !== "login") ? ( <
                Title dragClass = {
                    'detectBox_dragArea'
                }
                />
            ) : null
        }

        {
            !GlobalData.isMinimize ? ( <
                div className = {
                    `${styles.detectBox_scroll} ${
                  GlobalData.tab === "history" ? styles.detectBox_scrollForHistory : ""
                } ${
                  GlobalData.tab === "login" || GlobalData.tab === "signup"
                    ? styles.detectBox_scrollForSignUp
                    : ""
                }`
                } >
                {!StyleData.elm && GlobalData.tab === "editor" ? ( <
                        div className = {
                            styles.detectBox_emptyText
                        } >
                        Click on element on the screen and start to design <
                        /div>
                    ) : null
                } {
                    StyleData.elm && GlobalData.tab === "editor" ? < Tree / > : ""
                } {
                    GlobalData.tab === "Comments" ? < Changes / > : ""
                } {
                    GlobalData.tab === "signup" ? < SignUp / > : ""
                } {
                    GlobalData.tab === "login" ? < Login / > : ""
                } {
                    GlobalData.tab === "history" ? < History / > : ""
                } <
                /div>
            ) : null
        }

        {
            !GlobalData.isMinimize &&
                GlobalData.tab !== "signup" &&
                GlobalData.tab !== "login" ? ( <
                    Footer / >
                ) : null
        } <
        /div> <
        /Draggable> <
        /div>
    );
});