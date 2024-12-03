import React, {
    useContext,
    useState
} from "react";
import styles from "./CodeHolder.module.scss";
import CanvasStore from "../../../stores/CanvasStore";
import {
    observer
} from "mobx-react-lite";
import {
    reactLiveHome
} from "./theme";
import {
    ComponentHolder
} from "../ComponentHolder/ComponentHolder";
import ReactCode from "./ReactCode/ReactCode";
import {
    LiveProvider
} from "react-live";
import classNames from "classnames";
// let ComponentReact = (props) => {
//   let ComponentCode = component.Component;

//   return (
//     <ComponentCode
//       {...component.props}
//       {...props}
//       width={component.width}
//       height={component.height}
//     />
//   );
// };

export const CodeHolder = observer((props) => {
    const CanvasData = useContext(CanvasStore);
    let component =
        CanvasData.components && CanvasData.components[0] ?
        CanvasData.components[0] :
        null;
    let jsCode = component ? component.js : null;
    let editable = component && component.editable ? true : false;
    let componentName =
        component && component.clientId ? component.clientId : "Component";
    let ComponentCode = component ? component.Component : "";

    const saveCode = (newCode) => {
        let component =
            CanvasData.components && CanvasData.components[0] ?
            CanvasData.components[0] :
            null;

        CanvasData.saveCode(newCode);
    };

    if (!component) {
        return < > < />;
    }

    const getComponentName = () => {
        if (component.componentName) {
            return component.componentName;
        } else if (!component.clientId ||
            component.clientId.includes("DontSaveMe")
        ) {
            return "Component";
        }

        return component.clientId;
    };

    return ( <
        div className = {
            styles.wrapper
        }
        data = {
            jsCode
        } > {
            /* <div className={styles.npmHolder} onCopy={onCopyNpm}>
                    <CodeNpm />
                  </div> */
        } { /* <div className={styles.spacer}></div> */ } <
        div className = {
            styles.codeHolder
        } > {
            editable ? ( <
                LiveProvider code = {
                    jsCode
                }
                key = {
                    CanvasData.updateCode
                }
                theme = {
                    reactLiveHome
                }
                transformCode = {
                    (newCode) => {
                        saveCode(newCode);
                        return newCode;
                    }
                }
                scope = {
                    {
                        useState,
                        styles: {},
                        [getComponentName()]: ComponentCode,
                    }
                } >
                <
                CodeAndDemoSection component = {
                    component
                }
                showLadingPage = {
                    props.showLadingPage
                }
                ComponentReact = {
                    ComponentCode
                }
                /> <
                /LiveProvider>
            ) : ( <
                CodeAndDemoSection component = {
                    component
                }
                showLadingPage = {
                    props.showLadingPage
                }
                ComponentReact = {
                    ComponentCode
                }
                />
            )
        } <
        /div> <
        /div>
    );
});

const CodeAndDemoSection = (props) => {
    let hideCode =
        props.component.clientId && isNaN(props.component.typeId) ? true : false;

    return ( <
        div className = {
            styles.box
        } >
        <
        div className = {
            classNames(styles.box_item, {
                [styles.box_item_fullWdith]: hideCode
            })
        } >
        <
        ComponentHolder showLadingPage = {
            props.showLadingPage
        }
        Component = {
            props.ComponentReact
        }
        data = {
            props.component
        }
        /> <
        /div> {
            !hideCode ? ( <
                div className = {
                    styles.box_item
                } >
                <
                ReactCode / >
                <
                /div>
            ) : null
        } <
        /div>
    );
};