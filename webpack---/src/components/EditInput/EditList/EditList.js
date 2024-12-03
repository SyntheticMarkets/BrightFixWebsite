import React from "react";
import styles from "./EditList.module.scss";
import Input from "../../Input/Input";

export default (props) => {
    const onChange = (e, index) => {
        let newData = props.data.map((item) => item);
        let item = newData[index];
        if (!item) { //if the item is not exists we will create the first item
            newData[index] = {};
            item = newData[index]
        }

        item.value = e.target.value; //update the value

        props.onChangeList(newData);
    };

    const addItem = () => {
        let newData = props.data.map(item => item);
        if (!newData.length) {
            newData.push({
                value: ""
            });
        }
        newData.push({
            value: ""
        });
        props.onChangeList(newData);
    };

    let data = props.data && props.data.length ? props.data : [{}];
    return ( <
        div > {
            data.map((item, index) => {
                return ( <
                    Input label = {
                        `Value ${index + 1}`
                    }
                    value = {
                        item.value
                    }
                    onChange = {
                        (e) => {
                            onChange(e, index);
                        }
                    }
                    />
                );
            })
        } <
        div className = {
            styles.add
        }
        onClick = {
            addItem
        } >
        +Add <
        /div> <
        /div>
    );
};