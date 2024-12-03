import React, {
    useContext,
    useEffect,
    useState
} from "react";
import styles from "./Tooltip.module.scss";
import CanvasStore from "../../../stores/CanvasStore";
import {
    observer
} from "mobx-react-lite";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";

let timeout;
export const Tooltip = observer((props) => {
    const CanvasData = useContext(CanvasStore);
    const [show, setShow] = useState(false);
    const [closed, setClosed] = useState(false);
    let visible =
        props.visible !== undefined ?
        props.visible :
        CanvasData.toolTipData.visible;
    let top = props.top !== undefined ? props.top : CanvasData.toolTipData.top;
    let title =
        props.title !== undefined ? props.title : CanvasData.toolTipData.title;
    let text =
        props.text !== undefined ? props.text : CanvasData.toolTipData.text;
    let selected =
        props.selected !== undefined ?
        props.selected :
        CanvasData.toolTipData.selected;
    // const [oldText, setOldText] = useState(text)
    // const [newText, setNewText] = useState(text)
    // const [useNewText, setUseNewText] = useState(false)

    useEffect(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setClosed(false);
            setShow(visible);
        }, 150);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.visible, CanvasData.toolTipData.visible]);

    const onClose = () => {
        setClosed(true);
    };
    // useEffect(()=>{
    //     let ifToUseNewText = !useNewText
    //     if(ifToUseNewText){
    //         // setNewText(text)
    //     }
    //     else{
    //         // setOldText(oldText)
    //     }
    //     setUseNewText(ifToUseNewText)
    // },[props.text,CanvasData.toolTipData.text])

    if (visible === undefined) {
        visible = true;
    }

    if (!visible || closed || window.innerWidth < 900) {
        return < > < />;
    }

    return ( <
        div className = {
            `${styles.tooltip} ${selected ? styles.selected : ""} ${
        show ? styles.show : ""
      }`
        }
        style = {
            {
                top: top + "px"
            }
        } >
        <
        div className = {
            styles.title
        } >
        <
        div > {
            title
        } < /div> {
            selected ? ( <
                FontAwesomeIcon className = {
                    styles.close
                }
                icon = {
                    faTimes
                }
                onClick = {
                    onClose
                }
                />
            ) : null
        } <
        /div> <
        div >
        <
        div className = {
            styles.text
        } > {
            text
        } < /div> <
        /div> <
        /div>
    );
});