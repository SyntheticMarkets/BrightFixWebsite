import React from "react";
import NumberFormat from "react-number-format";
import styles from './OtherNumberFormat.module.scss'

const NumberFormatExample = (props) => {
    return ( <
        div >
        <
        div className = {
            styles.title
        } > Format Number Input < /div> <
        NumberFormat { ...props
        }
        /> <
        /div>
    );
};
export default NumberFormatExample;