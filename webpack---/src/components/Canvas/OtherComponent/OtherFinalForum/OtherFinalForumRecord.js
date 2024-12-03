import React from "react";
import styles from "./OtherFinalForumRecord.module.scss";
import {
    Form,
    Field
} from "react-final-form";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
};

export default (props) => {
    let formData = {
        ...props
    };
    delete formData.height;

    return ( <
            div className = {
                styles.wrapper
            } >
            <
            div className = {
                styles.title
            } > React Final Form Example < /div> <
            div className = {
                styles.subTitle
            } > Password / Confirm Validation < /div> <
            a href = "https://final-form.org/react"
            target = "_blank"
            rel = "noopener noreferrer" >
            Read Docs <
            /a> <
            Form onSubmit = {
                onSubmit
            }
            initialValues = {
                formData
            }
            validate = {
                (values) => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = "Required";
                    }
                    if (!values.password) {
                        errors.password = "Required";
                    }
                    if (!values.confirm) {
                        errors.confirm = "Required";
                    } else if (values.confirm !== values.password) {
                        errors.confirm = "Must match";
                    }
                    return errors;
                }
            }
            render = {
                ({
                    handleSubmit,
                    form,
                    submitting,
                    pristine,
                    values
                }) => ( <
                    form onSubmit = {
                        handleSubmit
                    } >
                    <
                    Field name = "username" > {
                        ({
                            input,
                            meta
                        }) => ( <
                            div >
                            <
                            label > Username < /label> <
                            input { ...input
                            }
                            type = "text"
                            placeholder = "Username" / > {
                                meta.error && meta.touched && < span > {
                                    meta.error
                                } < /span>} <
                                /div>
                            )
                        } <
                        /Field> <
                        Field name = "password" > {
                            ({
                                input,
                                meta
                            }) => ( <
                                div >
                                <
                                label > Password < /label> <
                                input { ...input
                                }
                                type = "password"
                                placeholder = "Password" / > {
                                    meta.error && meta.touched && < span > {
                                        meta.error
                                    } < /span>} <
                                    /div>
                                )
                            } <
                            /Field> <
                            Field name = "confirm" > {
                                ({
                                    input,
                                    meta
                                }) => ( <
                                    div >
                                    <
                                    label > Confirm < /label> <
                                    input { ...input
                                    }
                                    type = "password"
                                    placeholder = "Confirm" / > {
                                        meta.error && meta.touched && < span > {
                                            meta.error
                                        } < /span>} <
                                        /div>
                                    )
                                } <
                                /Field> <
                                div className = {
                                    styles.buttons
                                } >
                                <
                                button type = "submit"
                                disabled = {
                                    submitting
                                } >
                                Submit <
                                /button> <
                                button
                                type = "button"
                                onClick = {
                                    form.reset
                                }
                                disabled = {
                                    submitting || pristine
                                } >
                                Reset <
                                /button> <
                                /div> <
                                pre > {
                                    JSON.stringify(values, 0, 2)
                                } < /pre> <
                                /form>
                            )
                        }
                        /> <
                        /div>
                    );
                };