import React from "react";
import {
    observer
} from "mobx-react-lite";
import styles from './Code.module.scss'

export const Code = observer((props) => {
    if (!props.code || props.code.length === 0) {
        return <div > < /div>;
    }

    let title = props.title.length > 16 ? "..." : props.title;
    return ( <
        div className = {
            styles.code
        } >
        <
        div className = {
            styles.codeArea
        } >
        <
        div >
        <
        div className = {
            styles.codeClassName
        } > {
            title
        } & #x0007B; < /div> {
            props.code.map((item) => {
                return ( <
                    div className = {
                        styles.codeRules
                    }
                    key = {
                        item.key
                    } >
                    <
                    span className = {
                        styles.key
                    } > {
                        item.key
                    } < /span>: <
                    span className = {
                        styles.value
                    } > {
                        item.value
                    } < /span>; <
                    /div>
                );
            })
        } <
        div className = {
            styles.codeClassName
        } > & #x0007D; < /div> <
        /div> <
        /div> <
        /div>
    );
});