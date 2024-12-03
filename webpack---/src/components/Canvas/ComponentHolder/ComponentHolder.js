import React, {
    useEffect,
    useRef,
    useState
} from "react";
import {
    CanvasStoreClass
} from "../../../stores/CanvasStore";
import CreateEditWrapper from "../../CreateEditWrapper.js";
import {
    StyleStoreClass
} from "../../../stores/StyleStore.js";
import styles from "./ComponentHolder.module.scss";
import ComponentSelector from "./ComponentSelector/ComponentSelector";
import {
    getPosition
} from "../../utils";
import {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview
} from "react-live";

let hoverId1;
let hoverId2;
export const ComponentHolder = (props) => {
    const elm = useRef(null);
    const [isHover1, setIsHover1] = useState(true);
    const [isHover2, setIsHover2] = useState(true);
    const [selectorPosition1, setSelectorPosition1] = useState();
    const [selectorPosition2, setSelectorPosition2] = useState();

    useEffect(() => {
        if (!elm || !elm.current || !elm.current[0]) {
            return;
        }

        let width = elm.current.children[0].offsetWidth + 1;
        let height = elm.current.children[0].offsetHeight + 1;
        let id = props.data.id;

        CanvasStoreClass.updateComponentStyle(id, width, height);
    }, [props.data]);

    const updateStyleHover = () => {
        setTimeout(() => {
            if (StyleStoreClass.elm) {
                CreateEditWrapper(StyleStoreClass.elm);
            }
        }, 100);
    };
    // let Component = props.Component;

    let componentProps = props.data.props;
    if (props.data.multiComponent) {
        componentProps.multiComponent = props.data.multiComponent;
    }

    const unSelectMe = (innerComponentId) => {
        if (innerComponentId === hoverId1) {
            setSelectorPosition1(null);
        } else if (innerComponentId === hoverId2) {
            setSelectorPosition2(null);
        }
    };

    const openChromeExtension = () => {
        let link = `https://chrome.google.com/webstore/detail/nggpkpfmdkbaakpndblpandmldendooa`;
        window.open(
            "https://jinno.io/pixel.html?event=navigateToChromeExtensionFromDemo&redirect=" +
            link
        );
    };

    const selectMe = (e, innerComponentId, doHover = false) => {
        if (!e.currentTarget) {
            return;
        }

        let position = getPosition(e.currentTarget, true);
        let wrapperPosition = getPosition(elm.current, true);

        position = {
            width: `${position.width + 8}px`,
            height: `${position.height + 8}px`,
            top: `${
        position.top - wrapperPosition.top + elm.current.scrollTop - 4
      }px`,
            left: `${position.left - wrapperPosition.left - 4}px`,
        };

        if (doHover) {
            if (isHover1) {
                //on first over
                setSelectorPosition1(position);
                hoverId1 = innerComponentId;
            } else if (isHover2) {
                setSelectorPosition2(position);
                hoverId2 = innerComponentId;
            }
        } else {
            if (hoverId1 === innerComponentId && isHover1) {
                //after hover click
                hoverId1 = null;
                hoverId2 = null;
                setIsHover2(true);
                setSelectorPosition2();
                setIsHover1(doHover);
            } else if (hoverId2 === innerComponentId && isHover2) {
                hoverId1 = null;
                hoverId2 = null;
                setIsHover1(true);
                setSelectorPosition1();
                setIsHover2(doHover);
            }
        }

        if (!doHover) {
            CanvasStoreClass.onChangeMultiComponent(innerComponentId);
        }
    };

    let editable = props.data ? props.data.editable : false;
    let Component = props.Component;

    return ( <
        div className = {
            styles.wrapper
        } >
        <
        div ref = {
            elm
        }
        className = {
            "CodeMeCanvas " + props.data.center ?
            `${styles.componentHolder} CodeMeCanvas ${styles.center}` :
                styles.componentHolder
        }
        style = {
            {
                width: typeof props.data.width === "string" ?
                    props.data.width :
                    props.data.width + "px",
                height: typeof props.data.height === "string" ?
                    props.data.height :
                    props.data.height + "px",
                minWidth: typeof props.data.minWidth === "string" ?
                    props.data.minWidth :
                    props.data.minWidth + "px",
                minHeight: typeof props.data.minHeight === "string" ?
                    props.data.minHeight :
                    props.data.minHeight + "px",
            }
        } >
        <
        > {
            selectorPosition1 ? ( <
                ComponentSelector isHover = {
                    isHover1
                }
                style = {
                    selectorPosition1
                }
                />
            ) : null
        } {
            selectorPosition2 ? ( <
                ComponentSelector isHover = {
                    isHover2
                }
                style = {
                    selectorPosition2
                }
                />
            ) : null
        }

        {
            editable ? ( <
                >
                <
                LiveError / >
                <
                LivePreview / >
                <
                />
            ) : ( <
                span id = "JinnoWorkingComponent" >
                <
                Component width = {
                    props.data.width
                }
                height = {
                    props.data.height
                }
                updateStyleHover = {
                    updateStyleHover
                }
                selectMe = {
                    selectMe
                }
                unSelectMe = {
                    unSelectMe
                } { ...props.data.props
                }
                /> <
                /span>
            )
        } <
        /> <
        /div> {
            props.showLadingPage ? ( <
                div className = {
                    styles.banner
                } > { /* <img src={background} className={styles.banner_background} /> */ } <
                div className = {
                    styles.banner_title
                } > Did you love this Demo ? < /div> <
                div className = {
                    styles.banner_subTitle
                } >
                Build demo like this
                for your React components and share it with your team <
                /div> <
                div className = {
                    styles.banner_button
                }
                onClick = {
                    openChromeExtension
                } >
                Get started <
                /div> <
                /div>
            ) : null
        } <
        /div>
    );
};