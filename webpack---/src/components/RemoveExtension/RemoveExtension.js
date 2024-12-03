import React, {
    useContext,
    useState
} from "react";
import styles from "./RemoveExtension.module.scss";
import {
    observer
} from "mobx-react-lite";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import GlobalStore from "../../stores/GlobalStore";
import {
    CanvasStoreClass
} from "../../stores/CanvasStore";
import {
    trackEvent
} from "../utils";
// import AnimaStore from "../../store/AnimaStore";
// import { setLocalStorage } from "../../lib/utils";

export default observer(() => {
    const GlobalData = useContext(GlobalStore);
    const [tab, setTab] = useState(1);

    const close = () => {
        GlobalData.setShowRemoveExtension(false);
    };

    const onSave = () => {
        CanvasStoreClass.setShowControlBar();
        GlobalData.setShowRemoveExtension(false);
        // if (window.isChromeExtension !== false) {
        let removeFor;
        if (tab === 1) {
            removeFor = "1 day";
        } else if (tab === 2) {
            removeFor = "1 week";
        } else if (tab === 3) {
            removeFor = "1 month";
        }

        // trackEvent(`remove for ${removeFor}`);

        window.chrome.storage.sync.set({
            isClosed: {
                for: removeFor,
                date: new Date().getTime(),
            },
        });
        // }
    };

    if (!GlobalData.showRemoveExtension) {
        return < > < />;
    }

    return ( <
        div className = {
            styles.all
        } >
        <
        div className = {
            styles.wrapper
        } >
        <
        FontAwesomeIcon className = {
            styles.close
        }
        icon = {
            faTimes
        }
        onClick = {
            close
        }
        /> <
        div className = {
            styles.title
        } > Remove
        for: < /div> <
        div className = {
            styles.option
        } >
        <
        div className = {
            `${styles.checkbox} ${
              tab === 1 ? styles.checkboxSelected : ""
            }`
        }
        onClick = {
            () => {
                setTab(1);
            }
        } >
        <
        div className = {
            styles.checkboxSelectedBackground
        } > < /div> <
        /div> <
        div className = {
            styles.text
        }
        onClick = {
            () => {
                setTab(1);
            }
        } >
        Remove
        for 1 day <
        /div> <
        /div> <
        div className = {
            styles.option
        } >
        <
        div className = {
            `${styles.checkbox} ${
              tab === 2 ? styles.checkboxSelected : ""
            }`
        }
        onClick = {
            () => {
                setTab(2);
            }
        } >
        <
        div className = {
            styles.checkboxSelectedBackground
        } > < /div> <
        /div> <
        div className = {
            styles.text
        }
        onClick = {
            () => {
                setTab(2);
            }
        } >
        Remove
        for 1 week <
        /div> <
        /div> <
        div className = {
            styles.option
        } >
        <
        div className = {
            `${styles.checkbox} ${
              tab === 3 ? styles.checkboxSelected : ""
            }`
        }
        onClick = {
            () => {
                setTab(3);
            }
        } >
        <
        div className = {
            styles.checkboxSelectedBackground
        } > < /div> <
        /div> <
        div className = {
            styles.text
        }
        onClick = {
            () => {
                setTab(3);
            }
        } >
        Remove
        for 1 month <
        /div> <
        /div> <
        div className = {
            styles.button
        }
        onClick = {
            onSave
        } >
        Save <
        /div> <
        /div> <
        /div>
    );
});