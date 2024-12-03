import React, {
    useState,
    useEffect,
    useContext
} from "react";
import {
    CanvasStoreClass
} from "../../stores/CanvasStore";
import classNames from "classnames";
import {
    CanvasPropertiesStoreClass
} from "../../stores/CanvasPropertiesStore";
import InputLabel from "../InputLabel/InputLabel";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faSearch
} from "@fortawesome/pro-regular-svg-icons";
import styles from "./Input.module.scss";
import CanvasPropertiesStore from "../../stores/CanvasPropertiesStore";
import {
    observer
} from "mobx-react-lite";

function convertObjectValue(data) {
    let startValue = data && data.value ? data.value : "";
    if (typeof data !== "object") startValue = data;

    if (typeof startValue === "object") {
        startValue = `${startValue.length} items`;
    }

    return startValue;
}

const Input = observer((props) => {
    const CanvasPropertiesData = useContext(CanvasPropertiesStore);
    const [value, setValue] = useState(
        convertObjectValue(props.value ? props.value : props.data)
    );

    const onChange = (e) => {
        setValue(e.target.value);

        if (props.fromEditJson) {
            CanvasPropertiesStoreClass.onChange(props.data, e.target.value);
        } else if (props.updateCanvasStore) {
            CanvasStoreClass.onChange(props.data, e.target.value);
        } else if (props.onChange) {
            props.onChange(e);
        }
    };

    useEffect(() => {
        if (props.data && convertObjectValue(props.data) !== value) {
            setValue(convertObjectValue(props.data));
        } else if (convertObjectValue(props.value) !== value) {
            setValue(convertObjectValue(props.value));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data ? props.data.value : "", props.value]);

    let leftLabel = true; //props.updateCanvasStore

    const label = props.data && props.data.label ? props.data.label : props.label;

    return ( <
        span className = {
            classNames({
                [styles.Input_leftLabel]: leftLabel,
                [styles.Input_topLabel]: props.leftTop,
                [styles.Input_leftLabel_inputCurser]: props.onInputClicked,
                [styles.Input_search]: props.searchIcon,
                [styles.inputDisable]: CanvasPropertiesData.editPropertyId &&
                    props.data &&
                    props.editable &&
                    CanvasPropertiesData.editPropertyId !== props.data.id,
            })
        } >
        <
        InputLabel capitalize = {
            props.data && props.data.capitalize
        }
        label = {
            label
        }
        data = {
            props.data
        }
        labelClassName = {
            props.labelClassName
        }
        editable = {
            props.editable
        }
        /> {
            props.searchIcon ? ( <
                FontAwesomeIcon icon = {
                    faSearch
                }
                className = {
                    styles.Input_search_icon
                }
                />
            ) : null
        } <
        input type = {
            props.type ? props.type : "text"
        }
        onKeyPress = {
            props.onKeyPress
        }
        value = {
            value
        }
        onClick = {
            props.onInputClicked
        }
        className = {
            `${styles.Input_input} ${
          props.invalid ? styles.Input_invalidInput : ""
        }`
        }
        style = {
            props.width ? {
                width: props.width
            } : {}
        }
        placeholder = {
            props.placeholder ? props.placeholder : label
        }
        ref = {
            props.inputRef ? props.inputRef : null
        }
        onChange = {
            onChange
        }
        readOnly = {
            props.disabled ? "readonly" : false
        }
        /> {
            props.invalid ? ( <
                div className = {
                    styles.Input_invalid
                } > {
                    props.invalid
                } < /div>
            ) : null
        } <
        /span>
    );
});
export default Input;

// if (variables.env === "web" && variables.isDev) {
//   Jinno(Input, module, "Input", {
//     label: "my label",
//     value: "input value",
//   });
// }