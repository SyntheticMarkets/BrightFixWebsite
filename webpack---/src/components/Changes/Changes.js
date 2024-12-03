import React, {
    useContext,
    useState
} from "react";
import {
    Comment
} from "../Comment/Comment";
import {
    observer
} from "mobx-react-lite";
import CommentsStore from "../../stores/CommentsStore";
import {
    scrollTo
} from "../utils";
import styles from './Changes.module.scss'

export const Changes = observer((props) => {
    const CommentsData = useContext(CommentsStore);
    const [focus, setFocus] = useState(false);
    const [hover, setHover] = useState(false);

    const mouseEnter = (title) => {
        setHover(true);
        CommentsData.changeVisible(title, true);
    };

    const mouseOut = (title) => {
        setHover(false);
        if (!focus) {
            CommentsData.changeVisible(title, false);
        }
    };

    const onFocus = () => {
        setFocus(true);
    };

    const toggleIsOpen = (e, data) => {
        if (e.target.tagName !== "TEXTAREA") {
            CommentsData.setOpen(data.title, !data.open, false);
            scrollTo(data.title);
        }
    };

    const onBlur = (title) => {
        setFocus(false);

        if (!hover) {
            CommentsData.changeVisible(title, false);
        }
    };

    return ( <
        div className = {
            styles.Changes
        } > {
            CommentsData.comments.map((item) => {
                return ( <
                    div className = {
                        styles.Changes_wrapper
                    }
                    onMouseEnter = {
                        () => {
                            mouseEnter(item.title);
                        }
                    }
                    onMouseLeave = {
                        () => {
                            mouseOut(item.title);
                        }
                    }
                    key = {
                        item.title
                    } >
                    <
                    Comment data = {
                        item
                    }
                    id = {
                        item.title
                    }
                    onFocus = {
                        onFocus
                    }
                    clickOnCss = {
                        (e) => {
                            toggleIsOpen(e, item);
                        }
                    }
                    onBlur = {
                        () => {
                            onBlur(item.title);
                        }
                    }
                    /> <
                    /div>
                );
            })
        }

        {
            !CommentsData.comments.length ? ( <
                div className = {
                    styles.Changes_text
                } >
                Change one of the elements on the screen to
                export your changes code. <
                /div>
            ) : null
        } <
        /div>
    );
});