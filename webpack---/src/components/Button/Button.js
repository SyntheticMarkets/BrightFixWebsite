import React from "react";
import ReactDOM from "react-dom";
import styles from "./Button.module.scss";
import variables from "../../variables";
// import Jinno from "jinno";

const Button = (props) => {
    const onClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return ( <
        >
        <
        div className = {
            styles.Button
        }
        onClick = {
            onClick
        } > {
            props.test
        } {
            props.text
        } <
        /div> <
        />
    );
};

// if (variables.env === "web" && variables.isDev) {
//   let myComponent = Jinno(Button, "Button", module);
//   myComponent.setProps({});
// }

export default Button;