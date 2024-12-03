import React, {
    useState,
    useContext
} from "react";
import {
    observer
} from "mobx-react-lite";
import CommentsStore from "../../stores/CommentsStore";
import GlobalStore from "../../stores/GlobalStore";
import UserStore from '../../stores/UserStore'
import {
    CommentImage
} from "../Comment/CommentImage/CommentImage"
import {
    SummarySlider
} from './SummarySlider/SummarySlider'
import {
    SummaryOptions
} from './SummaryOptions/SummaryOptions'
import {
    Share
} from "../Footer/Share/Share";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import {
    faChevronDown
} from "@fortawesome/pro-light-svg-icons";
import styles from './Summary.module.scss'

export const Summary = observer((props) => {
            const [buttonActive, setButtonActive] = useState(false)
            const CommentsData = useContext(CommentsStore);
            const GlobalData = useContext(GlobalStore);
            const UserData = useContext(UserStore);

            const openSummary = () => {
                GlobalData.setTab('share')
                CommentsData.saveAllComments()
                CommentsData.saveAllImagesInServer()
            }

            const toggleShareOpen = () => {
                if (UserData.email && GlobalData.tab === 'summary') {
                    openSummary()
                } else if (UserData.email && GlobalData.tab === 'share') {
                    GlobalData.setTab('summary')
                } else {
                    GlobalData.setTab('signup')
                }
            }

            const goToSummary = () => {
                GlobalData.setTab('summary', false)
            }

            const goToEditor = () => {
                GlobalData.setTab('editor')
            }

            const checkIfNeedToCloseModal = (e) => {
                if (e.target.className === 'Summary_modal') {
                    GlobalData.setTab('summary')
                }
            }

            const onScroll = (e) => {
                if (e.target.scrollTop > 200 && !buttonActive) {
                    setButtonActive(true)
                } else if (e.target.scrollTop < 200 && buttonActive) {
                    setButtonActive(false)
                }
            }

            return ( <
                    div className = {
                        styles.Summary
                    }
                    onScroll = {
                        onScroll
                    } >
                    <
                    div className = {
                        styles.Summary_firstPage
                    } >
                    <
                    div className = {
                        styles.Summary_firstPage_text
                    } >
                    This is how your Co - worker will see your changes < br / > { /* <span className="Summary_firstPage_subText">(No need to install the chrome extension)</span> */ } <
                    br / > < br / >
                    <
                    div className = {
                        styles.Summary_firstPage_down
                    } > scroll down < /div> <
                    FontAwesomeIcon className = {
                        styles.Summary_firstPage_scrollDown
                    }
                    icon = {
                        faChevronDown
                    }
                    /> <
                    /div>

                    <
                    /div> {
                        !window.isAws ? ( <
                            div className = {
                                styles.Summary_closeWrapper
                            }
                            onClick = {
                                goToEditor
                            } >
                            <
                            FontAwesomeIcon icon = {
                                faTimes
                            }
                            className = {
                                styles.Summary_close
                            }
                            /> <
                            /div>
                        ) : null
                    } {
                        GlobalData.tab === 'signup' || GlobalData.tab === 'login' || GlobalData.tab === 'share' ? ( <
                                div className = {
                                    styles.Summary_modal
                                }
                                onClick = {
                                    checkIfNeedToCloseModal
                                } >
                                <
                                div className = {
                                    styles.Summary_modal_wrapper
                                } > {
                                    GlobalData.tab === 'signup' ? < SignUp onClose = {
                                        goToSummary
                                    }
                                    onCloseAfterSignUp = {
                                        openSummary
                                    }
                                    /> : ''} {
                                        GlobalData.tab === 'login' ? < Login onClose = {
                                            goToSummary
                                        }
                                        onCloseAfterSignUp = {
                                            openSummary
                                        }
                                        /> : ''} {
                                            GlobalData.tab === 'share' ? < Share toggleShareOpen = {
                                                toggleShareOpen
                                            }
                                            /> : ''} <
                                            /div> <
                                            /div>):null} <
                                            div className = {
                                                    styles.Summary_background
                                                } > < /div> <
                                                SummarySlider toggleShareOpen = {
                                                    toggleShareOpen
                                                }
                                            buttonActive = {
                                                buttonActive
                                            }
                                            /> {
                                                CommentsData.comments.map(comment => {
                                                    if (!comment.rules && !comment.messages) {
                                                        return ( < span > < /span>)
                                                        }
                                                        return ( <
                                                                div className = {
                                                                    styles.Summary_oneComment
                                                                }
                                                                key = {
                                                                    comment.id
                                                                } > {!window.isAws ? ( < SummaryOptions data = {
                                                                        comment
                                                                    }
                                                                    />) : null} <
                                                                    CommentImage beforeImage = {
                                                                        comment.beforeImage
                                                                    }
                                                                    afterImage = {
                                                                        comment.afterImage
                                                                    }
                                                                    comment = {
                                                                        comment
                                                                    }
                                                                    /> <
                                                                    /div>)
                                                                })
                                                            } <
                                                            /div>
                                                    );
                                                });