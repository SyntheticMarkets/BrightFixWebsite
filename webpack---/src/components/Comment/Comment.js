import React, {
    useContext
} from "react";
import {
    observer
} from "mobx-react-lite";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import {
    faTrash
} from "@fortawesome/pro-regular-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    Code
} from "../Code/Code";
import {
    CommentsStoreClass
} from "../../stores/CommentsStore";
import GlobalStore from "../../stores/GlobalStore";
import styles from "./Comment.module.scss";

export const Comment = observer((props) => {
    const GlobalData = useContext(GlobalStore);

    // const [addBlurClass, setAddBlurClass] = useState(false)

    // const changeTextArea = (e) => {
    //   CommentsStoreClass.changeComment(props.data.title, e.target.value);
    // };

    const close = () => {
        CommentsStoreClass.setOpen(props.data.title, false, true, true);
    };

    const deleteComment = () => {
        CommentsStoreClass.delete(props.data.id);
    };

    const clickOnCss = (e) => {
        if (props.clickOnCss) {
            props.clickOnCss(e);
        }
    };

    // const detectClickOnEnter = (e) => {
    //   if(e.which===13){
    //     e.target.blur()
    //     setAddBlurClass(true)
    //     e.preventDefault();
    //     return
    //   }
    // }

    // const removeBlurClass = ()=>{
    //   setAddBlurClass(false)
    // }

    const texteareaValue = props.data.messages ? props.data.messages[0] : "";

    const downloadPrintScreen = () => {
        // PrintScreen(StyleStoreClass.elm, null, true);

    };

    return ( <
        span >
        <
        div className = {
            styles.comment
        }
        onClick = {
            clickOnCss
        } >
        <
        div className = {
            styles.Comment_buttons
        }
        style = {
            {
                display: GlobalData.isTakingPrintScreen !== "printScreen" ?
                    "flex" :
                    "none",
            }
        } >
        <
        FontAwesomeIcon icon = {
            faTrash
        }
        className = {
            styles.Comment_button
        }
        onClick = {
            deleteComment
        }
        /> {
            props.close ? ( <
                FontAwesomeIcon icon = {
                    faTimes
                }
                className = {
                    styles.Comment_button
                }
                onClick = {
                    close
                }
                />
            ) : null
        } <
        /div> {
            /* {(texteareaValue.length || !props.dontShowTextIfEmpty) && (GlobalData.isTakingPrintScreen !== 'printScreen' || texteareaValue.length) ? (
                      <span>
                        <TextareaAutosize
                          className={`Comment_textarea ${addBlurClass ? 'Comment_textareaRemoveHover' : ''}`}
                          onChange={changeTextArea}
                          onFocus={props.onFocus}
                          onBlur={props.onBlur}
                          onMouseOut={removeBlurClass}
                          onMouseEnter={removeBlurClass}
                          onClick={removeBlurClass}
                          onKeyDown={detectClickOnEnter}
                          placeholder="Add comment"
                          value={texteareaValue ? texteareaValue : ''}
                        />
                        <div className='Comment_separator' />
                      </span>
                    ) : null} */
        } {
            props.data.rules && props.data.rules.length ? ( <
                span > {!props.dontShowTitle ? ( <
                        div className = {
                            styles.Comment_title
                        } > {
                            GlobalData.isTakingPrintScreen === "printScreen" ?
                            "Please change the following CSS:" :
                                "Your changes:"
                        } <
                        /div>
                    ) : null
                } <
                Code title = {
                    props.data.title
                }
                code = {
                    props.data.rules
                }
                /> <
                /span>
            ) : null
        } {
            (props.data.rules || texteareaValue) &&
            GlobalData.isTakingPrintScreen !== "printScreen" &&
                props.fromComments ? ( <
                    div className = {
                        styles.comment_exportWrapper
                    }
                    onClick = {
                        downloadPrintScreen
                    } >
                    <
                    span className = {!props.data.rules && !texteareaValue ?
                        `${styles.comment_export} ${styles.comment_exportDisable}` :
                            styles.comment_export
                    } >
                    <
                    span > Download < /span> { /* <FontAwesomeIcon icon={faChevronRight} className='comment_exportWrapper_icon' /> */ } <
                    /span> <
                    /div>
                ) : null
        } <
        /div> <
        /span>
    );
});