import React, {
    useContext,
    useState,
    useEffect,
    useRef
} from "react";
import {
    LiveEditor
} from "react-live";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";
import CanvasStore from "../../../../stores/CanvasStore";
import CommentsStore from "../../../../stores/CommentsStore";
import classNames from "classnames";
import {
    observer
} from "mobx-react-lite";
import "ace-builds/src-min-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-css";
import styles from "./ReactCode.module.scss";
import Button from "../../../Button/Button";
import CodeStore from "../../../../stores/CodeStore";
import {
    toJS
} from "mobx";

let previousLineInEditor = null;
//the ace editor will work with lower version. with higher version it will do a udf-8 error after webpack build
export default observer(() => {
    const [previousLine, setPreviousLine] = useState(null);
    const editorRef = useRef(null);

    const CanvasData = useContext(CanvasStore);
    const CommentsData = useContext(CommentsStore);
    const CodeData = useContext(CodeStore);

    let component =
        CanvasData.components && CanvasData.components[0] ?
        CanvasData.components[0] :
        null;
    let jsCode = component ? component.js : null;
    const [tab, setTab] = useState("js");
    const [code, setCode] = useState(jsCode);

    let editable = component.editable;
    let cssCode = component && component.originalCSS ? component.originalCSS : "";
    let tabs = component && component.tabs ? component.tabs : [];

    useEffect(() => {
        if (!CodeData || !CodeData.hoverLineFromHTML) {
            return;
        }

        const editor =
            editorRef && editorRef.current ? editorRef.current.editor : null;
        const lineNumber = toJS(CodeData.hoverLineFromHTML);
        if (!editor || !lineNumber) {
            return;
        }

        // Remove the highlight from the previously highlighted line
        if (previousLine !== null && previousLine !== lineNumber) {
            editor.session.removeGutterDecoration(
                previousLine - 1,
                styles.highlightedLine
            );
        }

        // Highlight the new line
        editor.gotoLine(lineNumber, 0, true);
        editor.selection.selectLine();
        editor.session.addGutterDecoration(lineNumber - 1, styles.highlightedLine);

        // Update the previous line state

        setPreviousLine(lineNumber);
    }, [CodeData.hoverLineFromHTML]);

    const onSelectTab = (newTab) => {
        if (newTab === "js") {
            setCode(jsCode);
        } else if (newTab === "css") {
            setCode(cssCode);
        } else {
            let newCode = tabs.find((innerTab) => innerTab.name === newTab);
            if (newCode && newCode.code) {
                setCode(newCode.code);
            }
        }
        setTab(newTab);
    };

    let addCss = "";
    if (tab === "css") {
        CommentsData.comments.forEach((item) => {
            addCss += `\n${item.title} {`;
            if (item.rules) {
                item.rules.forEach((rule) => {
                    addCss += `\n\t${rule.key}: ${rule.value};`;
                });
            }
            addCss += `\n}\n`;
        });
    }
    cssCode += addCss;

    useEffect(() => {
        if (
            tab === "js" &&
            CanvasData.components &&
            CanvasData.components[0] &&
            CanvasData.components[0].js !== code
        ) {
            setCode(CanvasData.components[0].js);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        // eslint-disable-next-line react-hooks/exhaustive-deps
        CanvasData.components &&
        CanvasData.components[0] &&
        CanvasData.components[0].js,
    ]);

    const onCopyCode = () => {
        // trackEvent(`copy code`);
    };

    const resetCode = () => {
        CanvasData.resetCode();
    };

    const save = () => {
        let component =
            CanvasData.components && CanvasData.components[0] ?
            CanvasData.components[0] :
            {};

        if (component.notAbleToSave) {
            //if the component is from the react detect
            CanvasData.setShowInstallSdk(true);
        } else {
            CanvasData.saveCodeInServer();
        }
    };

    useEffect(() => {
        const editor = editorRef.current.editor; // Access the Ace editor instance

        const handleMouseMove = (e) => {
            const {
                row
            } = editor.renderer.screenToTextCoordinates(
                e.clientX,
                e.clientY
            );
            const lineOfCode = row + 1;
            if (lineOfCode != previousLineInEditor) {
                previousLineInEditor = lineOfCode;
                CodeData.setHoverLineFromCode(lineOfCode);
            }
        };

        // Add mousemove event listener to the editor's container
        editor.container.addEventListener("mousemove", handleMouseMove.bind(this));
        // Cleanup the event listener on component unmount
        return () => {
            editor.container.removeEventListener(
                "mousemove",
                handleMouseMove.bind(this)
            );
        };
    }, [previousLineInEditor]);

    return ( <
        div className = {
            styles.ReactCode
        }
        onCopy = {
            onCopyCode
        } >
        <
        div className = {
            styles.tabs
        }
        style = {!cssCode && !tabs.length ? {
                display: "none"
            } : {}
        } >
        <
        div className = {
            classNames({
                [styles.tab]: true,
                [styles.tabSelected]: tab === "js",
            })
        }
        onClick = {
            () => {
                onSelectTab("js");
            }
        } >
        JS <
        /div> {
            cssCode || (CommentsData.comments && CommentsData.comments.length) ? ( <
                div className = {
                    classNames({
                        [styles.tab]: true,
                        [styles.tabSelected]: tab === "css",
                    })
                }
                onClick = {
                    () => {
                        onSelectTab("css");
                    }
                } >
                CSS <
                /div>
            ) : null
        } {
            tabs.map((innerTab) => {
                return ( <
                    Tab name = {
                        innerTab.name
                    }
                    selectedTab = {
                        tab
                    }
                    onSelectTab = {
                        onSelectTab
                    }
                    />
                );
            })
        } <
        /div> <
        div className = {
            styles.wrapper
        } >
        <
        div className = {
            styles.code
        } > {
            editable ? ( <
                LiveEditor style = {
                    {
                        minHeight: "100%"
                    }
                }
                />
            ) : ( <
                AceEditor ref = {
                    editorRef
                }
                mode = {
                    tab === "css" && false ? "css" : "jsx"
                }
                theme = "dracula"
                readOnly = {
                    true
                }
                value = {
                    code
                }
                />
            )
        } <
        /div> {
            editable && component.changedJsCode !== component.originalJS ? ( <
                div className = {
                    styles.buttons
                } >
                <
                div className = {
                    classNames(styles.button, styles.buttonReset)
                }
                onClick = {
                    resetCode
                } >
                Reset <
                /div> <
                div className = {
                    styles.button
                } >
                <
                Button text = {
                    "Save"
                }
                onClick = {
                    save
                }
                /> <
                /div> <
                /div>
            ) : null
        } <
        /div> <
        /div>
    );
});

const Tab = (props) => {
    return ( <
        div className = {
            classNames({
                [styles.tab]: true,
                [styles.tabSelected]: props.selectedTab === props.name,
            })
        }
        onClick = {
            () => {
                props.onSelectTab(props.name);
            }
        } >
        {
            props.name
        } <
        /div>
    );
};