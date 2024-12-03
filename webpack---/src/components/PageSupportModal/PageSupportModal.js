import React, {
    useContext,
    useEffect
} from "react";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    GlobalStoreClass
} from "../../stores/GlobalStore";
import styles from "./PageSupportModal.module.scss";
import Task from "./Task/Task";
import {
    observer
} from "mobx-react-lite";
import "../../stores/UserStore";
import PageDataStore from "../../stores/PageDataStore";
import GlobalStore from "../../stores/GlobalStore";
import {
    trackEvent
} from "../utils";

const PageSupportModal = observer((props) => {
    const PageData = useContext(PageDataStore);
    const GlobalData = useContext(GlobalStore);

    const userHaveVSextension = GlobalData.userHaveVSextension;
    const pageHaveReact = PageData.pageHaveReact ? PageData.pageHaveReact : false;
    const pageHaveDebugSource = PageData.pageHaveDebugSource;
    const porcentage =
        (userHaveVSextension + pageHaveReact + pageHaveDebugSource) * 33 + "%";

    const close = () => {
        GlobalStoreClass.setModalOpen("");
    };

    useEffect(() => {
        if (!pageHaveReact || !pageHaveDebugSource || !userHaveVSextension) {
            trackEvent(
                `Support modal open, issues: ${
          !pageHaveDebugSource ? "no DebugSource" : ""
        }${!pageHaveReact ? ", no React detected" : ""}${
          !userHaveVSextension ? ", VS code not installed" : ""
        }`
            );
        }
    }, []);

    const openSupport = () => {
        trackEvent("Clicked on open support");
        window.open(
            "mailto:ender.jinno@gmail.com?subject=I need help to configure Jinno&body=I need help to configure Jinno on my website",
            "_blank"
        );
    };

    return ( <
        div className = {
            styles.wrapper
        } >
        <
        div className = {
            styles.background
        } > < /div> <
        div className = {
            styles.box
        } >
        <
        div className = {
            styles.SignUp
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
        } > Complete your setup < /div> <
        div className = {
            styles.subtitle
        } >
        In order
        for Jinno to work on this app you must finish the setup.Please complete the following steps:
        <
        /div> <
        div className = {
            styles.progress
        } >
        <
        div className = {
            styles.progress_text
        } > {
            porcentage
        } < /div> <
        div className = {
            styles.progress_line
        } >
        <
        div className = {
            styles.progress_line_fill
        }
        style = {
            {
                width: porcentage
            }
        } >
        < /div> <
        /div> <
        /div> <
        div className = {
            styles.tasks
        } >
        <
        Task title = {
            `VS Code extension is ${
                !userHaveVSextension ? "not " : ""
              }installed`
        }
        explanation = "You can install"
        link = "https://marketplace.visualstudio.com/items?itemName=jinno.codelens-sample"
        done = {
            userHaveVSextension
        }
        linkText = {
            "using this link"
        }
        /> <
        Task title = {
            pageHaveReact ?
            "This is a React app" :
                "This is not a React app"
        }
        explanation = "Only React apps are supported"
        done = {
            pageHaveReact
        }
        /> <
        Task title = "Source code is not available"
        explanation = "Make sure the project is running locally on your computer and configured properly. If it's still not working Please"
        done = {
            pageHaveDebugSource
        }
        linkText = {
            " contact our support team."
        }
        onLinkClick = {
            openSupport
        }
        /> <
        /div> <
        div className = {
            styles.button
        }
        onClick = {
            close
        } >
        Close <
        /div> <
        /div> <
        /div> <
        /div>
    );
});
export default PageSupportModal;