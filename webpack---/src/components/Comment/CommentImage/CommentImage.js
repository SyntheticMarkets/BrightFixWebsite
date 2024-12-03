import React from "react";
import {
    observer
} from "mobx-react-lite";
import {
    Code
} from "../../Code/Code"
import {
    Comment
} from "../../Comment/Comment";
import styles from './CommentImage.module.scss'

export const CommentImage = observer((props) => {
            let fromRightAfter = props.afterImage ? `${props.afterImage.fromRight}%` : ''
            let fromTopAfter = props.afterImage ? `calc(${props.afterImage.fromTop}% + 4px)` : ''

            let fromTopBefore = props.beforeImage ? `${props.beforeImage.fromTop}%` : ''
            let fromLeftBefore = props.beforeImage ? `calc(${props.beforeImage.fromLeft}% + 4px)` : ''

            let beforeImage = ''
            if (props.beforeImage && props.beforeImage.canvas) {
                beforeImage = props.beforeImage.canvas
            } else if (props.beforeImage && props.beforeImage.url) {
                beforeImage = props.beforeImage.url
            }

            let afterImage = ''
            if (props.afterImage && props.afterImage.canvas) {
                afterImage = props.afterImage.canvas
            } else if (props.afterImage && props.afterImage.url) {
                afterImage = props.afterImage.url
            }

            // let beforeImage = props.beforeImage ? props.beforeImage.canvas : ''
            return ( <
                span >
                <
                div className = {
                    styles.CommentImage_images
                } >
                <
                div className = {
                    styles.CommentImage_images_wrapper
                } >
                <
                div className = {
                    styles.CommentImage_row
                } >
                <
                div className = {
                    styles.CommentImage_images_wrapperTwoFirst
                } >
                <
                div className = {
                    `${styles.CommentImage_images_wrapperTwoSize} ${styles.CommentImage_images_wrapperTwoSizeGood}`
                } >
                <
                div className = {
                    `${styles.CommentImage_images_wrapper_code} ${styles.CommentImage_images_wrapper_codeGood}`
                }
                style = {
                    {
                        right: `calc(${fromRightAfter} - 142px)`
                    }
                } > {
                    props.comment.rules ? ( < div className = {
                            `${styles.CommentImage_images_wrapper_text} ${styles.CommentImage_images_wrapper_textGood}`
                        } > Good < /div>) : null} { /* <Code title={props.comment.title} code={props.comment.rules}/> */ } <
                        Comment data = {
                            props.comment
                        }
                        dontShowTextIfEmpty = {
                            true
                        }
                        dontShowTitle = {
                            true
                        }
                        /> <
                        /div> <
                        /div> <
                        img alt = "bad"
                        src = {
                            afterImage
                        }
                        className = {
                            styles.CommentImage_images_image
                        }
                        /> <
                        div className = {
                            styles.CommentImage_line
                        }
                        style = {
                            {
                                right: `${fromRightAfter}`,
                                height: `${fromTopAfter}`
                            }
                        } >
                        <
                        div className = {
                            styles.CommentImage_lineRight
                        } > < /div> <
                        div className = {
                            styles.CommentImage_lineLeft
                        } > < /div> <
                        /div> <
                        /div> <
                        /div> <
                        /div>

                        {
                            props.comment.rules ? ( <
                                div className = {
                                    styles.CommentImage_images_wrapper
                                } >
                                <
                                div className = {
                                    styles.CommentImage_row
                                } >
                                <
                                div className = {
                                    styles.CommentImage_images_wrapperTwo
                                } >
                                <
                                div className = {
                                    styles.CommentImage_images_wrapperTwoSize
                                } >
                                <
                                div className = {
                                    `${styles.CommentImage_images_wrapper_code} ${styles.CommentImage_images_wrapper_codeWrong}`
                                }
                                style = {
                                    {
                                        left: `calc(${fromLeftBefore} - 142px)`
                                    }
                                } >
                                <
                                div className = {
                                    `${styles.CommentImage_images_wrapper_text} ${styles.CommentImage_images_wrapper_textWrong}`
                                } > Wrong < /div> <
                                Code title = {
                                    props.comment.title
                                }
                                code = {
                                    props.comment.beforeRules
                                }
                                /> <
                                /div> <
                                /div> <
                                img alt = "good"
                                src = {
                                    beforeImage
                                }
                                className = {
                                    styles.CommentImage_images_image
                                }
                                /> <
                                div className = {
                                    `${styles.CommentImage_line} ${styles.CommentImage_lineWrong}`
                                }
                                style = {
                                    {
                                        left: `${fromLeftBefore}`,
                                        height: `${fromTopBefore}`
                                    }
                                } >
                                <
                                div className = {
                                    styles.CommentImage_lineRight
                                } > < /div> <
                                div className = {
                                    styles.CommentImage_lineLeft
                                } > < /div> <
                                /div> <
                                /div> <
                                /div> <
                                /div>
                            ) : null
                        }

                        <
                        /div> <
                        /span>
                    );
                });