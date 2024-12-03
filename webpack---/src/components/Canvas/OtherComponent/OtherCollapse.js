import React from "react";
import {
    Collapse
} from "react-collapse";

export default (props) => {

    return ( <
        Collapse { ...props
        }
        initialStyle = {
            {
                height: 50,
                overflow: 'hidden'
            }
        } >
        <
        div > Random content < /div> <
        /Collapse>
    );
};