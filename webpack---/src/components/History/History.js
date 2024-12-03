import React, {
    useContext
} from "react";
import HistoryStore from "../../stores/HistoryStore";
import {
    GlobalStoreClass
} from "../../stores/GlobalStore";
import {
    observer
} from "mobx-react-lite";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {
    UserStoreClass
} from "../../stores/UserStore";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faChevronLeft
} from "@fortawesome/pro-light-svg-icons";
import styles from './History.module.scss'

export const History = observer(() => {
    const HistoryData = useContext(HistoryStore);

    const moveToLogin = () => {
        GlobalStoreClass.setTab("login");
    };

    const moveToSignUp = () => {
        GlobalStoreClass.setTab("signup");
    };

    const goToEditor = () => {
        GlobalStoreClass.setTab("editor");
    }
    return ( <
        div >
        <
        div className = {
            styles.history_back
        }
        onClick = {
            goToEditor
        } >
        <
        FontAwesomeIcon icon = {
            faChevronLeft
        }
        className = {
            styles.history_back_icon
        }
        />
        Back <
        /div> {
            HistoryData.histories.map((item) => {
                let name =
                    item.name &&
                    item.name.includes("/") &&
                    item.name.split("/") &&
                    item.name.split("/")[0] ?
                    item.name.split("/")[0] :
                    item.name;

                return ( <
                    div className = {
                        styles.History_box
                    }
                    key = {
                        item.id
                    } >
                    <
                    div className = {
                        styles.History_names
                    }
                    onClick = {
                        () => {
                            HistoryData.openHistory(item.id);
                        }
                    } >
                    <
                    div className = {
                        styles.History_title
                    } > {
                        name
                    } < /div> <
                    div className = {
                        styles.lastUpdated
                    } >
                    updated {
                        item.createdDate
                    } <
                    /div> <
                    /div> <
                    IconButton className = {
                        styles.History_delete
                    }
                    aria - label = "delete"
                    onClick = {
                        () => {
                            HistoryData.deleteHistory(item.id);
                        }
                    } >
                    <
                    DeleteIcon / >
                    <
                    /IconButton> <
                    /div>
                );
            })
        }

        {
            !HistoryData.histories.length ? ( <
                div className = {
                    styles.History_empty
                } > {!UserStoreClass.session ? ( <
                        span >
                        First you need to < u onClick = {
                            moveToLogin
                        } > login < /u> or{" "} <
                        u onClick = {
                            moveToSignUp
                        } > sing up < /u> <
                        br / >
                        <
                        br / >
                        <
                        /span>
                    ) : null
                }
                Change something on the screen to see your history changes <
                /div>
            ) : null
        } <
        /div>
    );
});