import React from "react";
import styles from "./OtherFinalForumField.module.scss";
import {
    Form,
    Field
} from "react-final-form";
import {
    FORM_ERROR
} from "final-form";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
    await sleep(300);
    if (values.username !== "erikras") {
        return {
            username: "Unknown username"
        };
    }
    if (values.password !== "finalformrocks") {
        return {
            [FORM_ERROR]: "Login Failed"
        };
    }
    window.alert("LOGIN SUCCESS!");
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
            } > Submission Errors < /div> <
            a href = "https://final-form.org/react"
            target = "_blank"
            rel = "noopener noreferrer" >
            Read Docs <
            /a> <
            div >
            Only successful credentials are < code > erikras < /code> and{" "} <
            code > finalformrocks < /code>. <
            /div> <
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
                    return errors;
                }
            }
            render = {
                ({
                    submitError,
                    handleSubmit,
                    form,
                    submitting,
                    pristine,
                    values,
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
                                (meta.error || meta.submitError) && meta.touched && ( <
                                    span > {
                                        meta.error || meta.submitError
                                    } < /span>
                                )
                            } <
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
                        /Field> {
                            submitError && < div className = "error" > {
                                    submitError
                                } < /div>} <
                                div className = {
                                    styles.buttons
                                } >
                                <
                                button type = "submit"
                            disabled = {
                                    submitting
                                } >
                                Log In <
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