import React, {
    useContext
} from "react";
import styles from "./CodeDiff.module.scss";
import ReactDiffViewer from "react-diff-viewer";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import TextAIStore from "../../stores/TextAIStore";
import {
    observer
} from "mobx-react-lite";
import hljs from "highlight.js";
import theme from "./CodeDiffTheme.modeule.scss";
import {
    CircularProgress
} from "@material-ui/core";

const highlightSyntax = (str) => {
    if (!str) {
        return;
    }
    return ( <
        pre >
        <
        code dangerouslySetInnerHTML = {
            {
                __html: hljs.highlightAuto(str).value,
            }
        }
        /> <
        /pre>
    );
};

const CodeDiff = observer(() => {
    const TextAIData = useContext(TextAIStore);

    const message = TextAIData.getMessage(TextAIData.showCodeDiffID);
    const properties = message && message.properties ? message.properties : {};
    const loading = properties.loading;
    const codeChanges = message.getCodeChanges();

    const close = (e) => {
        TextAIData.hideCodeDiff();
        e.preventDefault();
        e.stopPropagation();
    };

    const checkIfToCloseModal = (e) => {
        if (e.target === e.currentTarget) {
            close(e);
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return ( <
        div className = {
            `${styles.CodeDiff} jinno-className`
        }
        onClick = {
            checkIfToCloseModal
        } >
        <
        div className = {
            styles.modal
        } >
        <
        FontAwesomeIcon icon = {
            faTimes
        }
        className = {
            styles.close
        }
        onClick = {
            close
        }
        /> <
        div className = {
            styles.title
        } > {
            loading ? ( <
                CircularProgress size = {
                    24
                }
                color = "black"
                className = {
                    styles.refresh
                }
                />
            ) : null
        } {
            loading ? "I am preparing the code changes at " : "Code changes at "
        } {
            codeChanges.componentName ? codeChanges.componentName : 'your code'
        } <
        /div> <
        div className = {
            `${styles.scroll} ${theme.wrapper}`
        } >
        <
        ReactDiffViewer oldValue = {
            codeChanges.oldCode
        }
        newValue = {
            codeChanges.newCode
        }
        disableWordDiff = {
            false
        }
        splitView = {
            true
        }
        renderContent = {
            highlightSyntax
        }
        /> <
        /div> <
        /div> <
        /div>
    );
});

export default CodeDiff;