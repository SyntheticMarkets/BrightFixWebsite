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
import styles from "./Textarea.module.scss";
import CanvasPropertiesStore from "../../stores/CanvasPropertiesStore";
import {
    observer
} from "mobx-react-lite";

export default observer((props) => {
    const CanvasPropertiesData = useContext(CanvasPropertiesStore);
    const [value, setValue] = useState(props.value ? props.value : props.data);

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
        if (props.data && props.data !== value) {
            setValue(props.data);
        } else if (props.value !== value) {
            setValue(props.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data ? props.data.value : "", props.value]);

    let leftLabel = true; //props.updateCanvasStore

    const label = props.data && props.data.label ? props.data.label : props.label;
    return ( <
        span className = {
            classNames({
                [styles.Input_leftLabel]: leftLabel,
                [styles.Input_leftLabel_inputCurser]: props.onInputClicked,
                [styles.Input_search]: props.searchIcon,
                [styles.inputDisable]: CanvasPropertiesData.editPropertyId &&
                    props.data &&
                    props.editable &&
                    CanvasPropertiesData.editPropertyId !== props.data.id,
            })
        } >
        <
        div className = {
            styles.label
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
        editable = {
            props.editable
        }
        /> <
        /div> {
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
        textarea type = {
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