import React, {
    useState,
    useContext
} from "react";
import {
    CommentsStoreClass
} from "../../../stores/CommentsStore";
import HistoryStore from "../../../stores/HistoryStore";
import {
    InspectStoreClass
} from "../../../stores/InspectStore";
import {
    GlobalStoreClass
} from "../../../stores/GlobalStore";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faLocation,
    faTrashAlt
} from "@fortawesome/pro-light-svg-icons";
import {
    scrollTo
} from "../../utils";
import $ from 'jquery'
import styles from './SummaryOptions.module.scss'

export const SummaryOptions = (props) => {
        const [showLocationToolTip, setShowLocationToolTip] = useState(false)
        const HistoryData = useContext(HistoryStore)

        const goToElement = () => {
            if (props.data && props.data.title) {
                GlobalStoreClass.setTab('editor')
                CommentsStoreClass.setOpen(props.data.title, true, false);
                scrollTo(props.data.title);

                if ($(props.data.title)) {
                    InspectStoreClass.chooseElement(null, $(props.data.title)[0])
                }
            }
        }

        const deleteComment = () => {
            if (props.data && props.data.title && window.confirm('Are you sure you want to delete this item?')) {
                CommentsStoreClass.delete(props.data.title)
            }
        }

        const showLocationTooltip = () => {
            setShowLocationToolTip(true)
        }

        const hideLocationTooltip = () => {
            setShowLocationToolTip(false)
        }

        return ( <
                div className = {
                    styles.SummaryOptions
                } >
                <
                div className = {
                    styles.SummaryOptions_buttons
                } >
                <
                div className = {
                    styles.SummaryOptions_icon
                }
                onClick = {
                    goToElement
                }
                onMouseEnter = {
                    showLocationTooltip
                }
                onMouseLeave = {
                    hideLocationTooltip
                } >
                <
                FontAwesomeIcon icon = {
                    faLocation
                }
                /> {
                    showLocationToolTip ? ( < div className = {
                                styles.SummaryOptions_iconTooltip
                            } >
                            Go to element <
                            /div>):null} <
                            /div> {
                                !HistoryData.shareMode ? ( < div className = {
                                        `${styles.SummaryOptions_icon} ${styles.SummaryOptions_iconTrash}`
                                    }
                                    onClick = {
                                        deleteComment
                                    } >
                                    <
                                    FontAwesomeIcon icon = {
                                        faTrashAlt
                                    }
                                    /> <
                                    /div>):null} <
                                    /div>  <
                                    /div>
                                );
                            };