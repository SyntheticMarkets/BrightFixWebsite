import React, {
    useRef,
    useEffect,
    useState
} from "react";
import {
    observer
} from "mobx-react-lite";
import {
    CanvasStoreClass
} from "../../../stores/CanvasStore";
import styles from "./ComponentDemo.module.scss";
import {
    trackEvent
} from "../../utils";
import classNames from "classnames";
import {
    EditPropertyStoreClass
} from "../../../stores/EditPropertyStore";
import ContentEditable from "react-contenteditable";
import {
    HoverStoreClass
} from "../../../stores/HoverStore";


// const Demo = (props) => (<div>mor</div>)
export const ComponentDemo = observer((props) => {
    const [scale, setScale] = useState(1);
    const componentRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            let componentDiv =
                componentRef.current && componentRef.current.children ?
                componentRef.current.children[0] :
                null; //the element of the component
            let wrapperDiv =
                wrapperRef && wrapperRef.current ? wrapperRef.current : null; //the element of the component

            //component width and height
            if (componentDiv && !componentDiv.offsetWidth) {
                componentDiv = componentDiv.children ?
                    componentDiv.children[0] :
                    componentDiv;
            }

            if (!componentDiv) {
                return;
            }

            let componentWidth = componentDiv.offsetWidth;
            let componentHeight = componentDiv.offsetHeight;

            //wrapper width and height
            let wrapperDivWidth = wrapperDiv.offsetWidth - 20;
            let wrapperDivHeight = wrapperDiv.offsetHeight - 20;
            if (
                wrapperDivWidth < componentWidth ||
                wrapperDivHeight < componentHeight
            ) {
                //if the component is bigger from the wrapper we will reduce the size
                let widthPercentage = (componentWidth * 100) / wrapperDivWidth; //calculate how big is the component
                let heightPercentage = (componentHeight * 100) / wrapperDivHeight;

                let widthScale = 100 / (widthPercentage / 100); //what suppose to be the scale so the width of the component will be < wrapper
                let heightScale = 100 / (heightPercentage / 100); //what suppose to be the scale so the height of the component will be < wrapper

                let scale =
                    widthScale < heightScale ? widthScale / 100 : heightScale / 100; // choose the smallest width/height

                if (!props.componentData.reduceChildrenScale) {
                    setScale(scale);
                } else if (
                    componentDiv &&
                    componentDiv.children &&
                    componentDiv.children[0]
                ) {
                    setScale(scale);
                }
            }
        }, 50);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [componentRef]);

    const saveNewTitle = (e) => {
        let clientId = props.componentData.clientId;
        let newTitle = e.target.innerText;

        EditPropertyStoreClass.updateComponentApi({
            clientId,
            title: newTitle
        });
    };

    const changeContentEditable = (e) => {
        if (e.target && e.target.innerText && e.target.innerText.length > 30) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }
    };
    const addComponent = (e) => {
        let componentDiv =
            componentRef && componentRef.current && componentRef.current.children ?
            componentRef.current.children[0] :
            null; //the element of the component
        let data = props.componentData; //component data

        // if (!data.width) {
        //   data.width = componentDiv ? componentDiv.offsetWidth + 1 : null;
        // }

        // if (!data.height) {
        //   data.height = componentDiv ? componentDiv.offsetHeight + 1 : null;
        // }

        CanvasStoreClass.addComponent(props.componentData);
    };

    let componentWidth =
        props.componentData && props.componentData.widthDemo ?
        props.componentData.widthDemo :
        null;
    componentWidth =
        typeof componentWidth === "number" ? componentWidth + "px" : null;
    let componentHeight =
        props.componentData && props.componentData.heightDemo ?
        props.componentData.heightDemo :
        null;
    componentHeight =
        typeof componentHeight === "number" ? componentHeight + "px" : null;

    let editable =
        props.componentData && props.componentData.injectComponentId ? true : false;

    return ( <
        div className = {
            styles.CanvasComp
        }
        style = {
            {
                opacity: !props.children ? 0 : 1
            }
        } >
        <
        div className = {
            styles.wrapper
        }
        ref = {
            wrapperRef
        } >
        <
        span style = {
            {
                width: componentWidth,
                height: componentHeight,
                transform: `scale(${scale})`,
            }
        }
        ref = {
            componentRef
        } >
        {
            props.children
        } <
        /span> <
        /div> <
        div className = {
            styles.footer
        } >
        <
        ContentEditable onBlur = {
            saveNewTitle
        }
        onKeyDown = {
            changeContentEditable
        }
        html = {
            props.componentData ? props.componentData.title : ""
        }
        className = {
            classNames(styles.title, {
                [styles.titleEditable]: editable,
            })
        }
        disabled = {!editable
        }
        /> {
            /* <div
                      onBlur={saveNewTitle}
                      onChange={changeContentEditable}
                      className={classNames(styles.title, {
                        [styles.titleEditable]: editable,
                      })}
                      contentEditable={editable}
                    >
                      {props.componentData ? props.componentData.title : ""}
                    </div> */
        } {
            props.children ? ( <
                div className = {
                    styles.CanvasComp_button
                }
                onClick = {
                    addComponent
                } >
                Try <
                /div>
            ) : null
        } <
        /div> <
        /div>
    );
});