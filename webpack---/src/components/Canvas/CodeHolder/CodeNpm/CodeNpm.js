import React, {
    useContext,
    useState
} from "react";
import styles from "./CodeNpm.module.scss";
import CanvasStore from "../../../../stores/CanvasStore";
import {
    observer
} from "mobx-react-lite";
import ContentEditable from "react-contenteditable";
import classNames from "classnames";
import {
    EditPropertyStoreClass
} from "../../../../stores/EditPropertyStore";

export default observer(() => {
    const [removeText, setRemoveText] = useState(false);
    const CanvasData = useContext(CanvasStore);
    let component =
        CanvasData.components && CanvasData.components[0] ?
        CanvasData.components[0] :
        {};
    let npmCode = component && component.npm ? component.npm : "";
    let editable = component && component.injectComponentId ? true : false;

    if (typeof npmCode === "object") {
        let npmString = "";
        npmCode.forEach((item, index) => {
            if (index) {
                npmString += "<br/>";
            }
            npmString += item;
        });
        npmCode = npmString;
    }

    const onBlur = (e) => {
        let clientId = component.clientId;
        let newNpm = e.target.innerText;

        EditPropertyStoreClass.updateComponentApi({
            clientId,
            npm: newNpm
        });
        setRemoveText(false);
    };

    const onFocus = () => {
        if (!npmCode) {
            setRemoveText(true);
        }
    };

    if (!npmCode && !editable) {
        return < > < />;
    }

    return ( <
        div className = {
            styles.codeNpm
        } >
        <
        ContentEditable onBlur = {
            onBlur
        }
        onFocus = {
            onFocus
        }
        className = {
            classNames(styles.inner, {
                [styles.editable]: editable,
            })
        }
        html = {
            npmCode ?
            npmCode :
                removeText ?
                "" :
                "Write your npm, for example: npm i jinno"
        }
        disabled = {!editable
        }
        /> <
        /div>
    );
});