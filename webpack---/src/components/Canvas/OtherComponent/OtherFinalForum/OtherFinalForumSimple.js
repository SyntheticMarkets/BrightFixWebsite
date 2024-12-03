/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import styles from "./OtherFinalForumSimple.module.scss";
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
        ...props,
        toppings: [props.toppings],
        sauces: [props.ketchup ? "ketchup" : null, props.mustard ? "mustard" : null, props.mayonnaise ? "mayonnaise" : null, props.guacamole ? "guacamole" : null, ],
    };
    delete formData.height;
    if (!props.toppings) delete formData.toppings;
    if (!props.ketchup && !props.mustard && !props.mayonnaise && !props.guacamole) delete formData.sauces;

    return ( <
        div className = {
            styles.wrapper
        } >
        <
        div className = {
            styles.title
        } > React Final Form - Simple Example < /div> <
        a href = "https://final-form.org/react"
        target = "_blank"
        rel = "noopener noreferrer" >
        Read Docs <
        /a> <
        Form onSubmit = {
            onSubmit
        }
        initialValues = {
            {
                ...formData,
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
                }
                className = {
                    styles.form
                } >
                <
                div >
                <
                label > First Name < /label> <
                Field name = "firstName"
                component = "input"
                type = "text"
                placeholder = "First Name" /
                >
                <
                /div> <
                div >
                <
                label > Last Name < /label> <
                Field name = "lastName"
                component = "input"
                type = "text"
                placeholder = "Last Name" /
                >
                <
                /div> <
                div >
                <
                label > Employed < /label> <
                Field name = "employed"
                component = "input"
                type = "checkbox" / >
                <
                /div> <
                div >
                <
                label > Favorite Color < /label> <
                Field name = "favoriteColor"
                component = "select" >
                <
                option / >
                <
                option value = "#ff0000" > ❤️Red < /option> <
                option value = "#00ff00" > 💚Green < /option> <
                option value = "#0000ff" > 💙Blue < /option> <
                /Field> <
                /div> <
                div >
                <
                label > Toppings < /label> <
                Field name = "toppings"
                component = "select"
                multiple >
                <
                option value = "chicken" > 🐓Chicken < /option> <
                option value = "ham" > 🐷Ham < /option> <
                option value = "mushrooms" > 🍄Mushrooms < /option> <
                option value = "cheese" > 🧀Cheese < /option> <
                option value = "tuna" > 🐟Tuna < /option> <
                option value = "pineapple" > 🍍Pineapple < /option> <
                /Field> <
                /div> <
                div >
                <
                label > Sauces < /label> <
                div className = {
                    styles.labels
                } >
                <
                label >
                <
                Field name = "sauces"
                component = "input"
                type = "checkbox"
                value = "ketchup" /
                > {
                    " "
                }
                Ketchup <
                /label> <
                label >
                <
                Field name = "sauces"
                component = "input"
                type = "checkbox"
                value = "mustard" /
                > {
                    " "
                }
                Mustard <
                /label> <
                label >
                <
                Field name = "sauces"
                component = "input"
                type = "checkbox"
                value = "mayonnaise" /
                > {
                    " "
                }
                Mayonnaise <
                /label> <
                label >
                <
                Field name = "sauces"
                component = "input"
                type = "checkbox"
                value = "guacamole" /
                > {
                    " "
                }
                Guacamole🥑 <
                /label> <
                /div> <
                /div> <
                div >
                <
                label > Best Stooge < /label> <
                div className = {
                    styles.labels
                } >
                <
                label >
                <
                Field name = "stooge"
                component = "input"
                type = "radio"
                value = "larry" /
                > {
                    " "
                }
                Larry <
                /label> <
                label >
                <
                Field name = "stooge"
                component = "input"
                type = "radio"
                value = "moe" /
                > {
                    " "
                }
                Moe <
                /label> <
                label >
                <
                Field name = "stooge"
                component = "input"
                type = "radio"
                value = "curly" /
                > {
                    " "
                }
                Curly <
                /label> <
                /div> <
                /div> <
                div >
                <
                label > Notes < /label> <
                Field name = "notes"
                component = "textarea"
                placeholder = "Notes" / >
                <
                /div> <
                div className = {
                    styles.buttons
                } >
                <
                button type = "submit"
                disabled = {
                    submitting || pristine
                } >
                Submit <
                /button> <
                button type = "button"
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