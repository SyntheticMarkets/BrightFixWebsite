import React, {
    useState,
    useContext,
    useEffect
} from "react";
import {
    observer
} from "mobx-react-lite";
import StyleStore from "../../stores/StyleStore";
import {
    CanvasStoreClass
} from "../../stores/CanvasStore";
import {
    faCaretDown
} from "@fortawesome/pro-solid-svg-icons";
import {
    faCaretUp
} from "@fortawesome/pro-solid-svg-icons";
import useClickOutside from '../useClickOutside'
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import InputLabel from '../InputLabel/InputLabel'
import styles from './SelectWrapper.module.scss'
import classNames from "classnames";
import CanvasPropertiesStore from "../../stores/CanvasPropertiesStore";

export const SelectWrapper = observer((props) => {
    const styleData = useContext(StyleStore);
    const CanvasPropertiesData = useContext(CanvasPropertiesStore);
    const [value, setValue] = useState('') //useState(props.value ? props.value : props.data.value);
    const [name, setName] = useState('') //useState(props.name ? props.name : props.data.name);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (props && props.data && props.data.value && props.data.value !== value) {
            updateName(props.data.value)
            setValue(props.data.value);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data.value]);

    const updateName = (newValue) => {
        let item = props.data && props.data.list ? props.data.list.find((item) => {
            return item.value === newValue;
        }) : {};

        if (item) {
            setName(item.name ? item.name : item.value)
        }
    }

    const onChange = (newValue) => {
        if (typeof newValue === 'string') {
            setValue(newValue);
            updateName(newValue)

            if (props.onChange) {
                props.onChange(newValue);
            }

            changeOpen(false)
        }

        if (props.updateCanvasStore) {
            CanvasStoreClass.onChange(props.data, newValue);
        } else if (props.style !== "regular" && !props.dontUpdateStore) {
            styleData.onChange(props.data, newValue);
        }
    };

    const changeOpen = (bool) => {
        setOpen(bool)

        if (props.onListOpen) {
            props.onListOpen(bool)
        }
    }

    const ref = useClickOutside(() => {
        changeOpen(false);
    });

    const openList = () => {
        changeOpen(!open)
    }

    let list = props && props.data && props.data.list ? props.data.list : [];
    let leftLabel = true //props.updateCanvasStore
    const label = props.data && props.data.label ? props.data.label : props.label

    return ( <
        div className = {
            classNames({
                [styles.SelectWrapper1_leftLabel]: leftLabel,
                [styles.SelectWrapper1_bottomLabel]: props.data && props.data.labelPosition === "bottom",
                [styles.inputDisable]: CanvasPropertiesData.editPropertyId &&
                    props.data &&
                    props.editable &&
                    CanvasPropertiesData.editPropertyId !== props.data.id,
            })
        }
        ref = {
            ref
        } >
        { /* {leftLabel && props.data.label? (<div className={`SelectWrapper1_labelLeft`}>{props.data.label}</div>) :null} */ } <
        InputLabel editable = {
            props.editable
        }
        data = {
            props.data
        }
        label = {
            label
        }
        capitalize = {
            props.data && props.data.capitalize
        }
        position = {
            props.data && props.data.labelPosition
        }
        /> <
        div className = {
            `${styles.SelectWrapper1} ${
          open ? styles.SelectWrapper1_open : ""
        } ${value ? styles.SelectWrapper1_value : ""} ${
          props.kind === "small" ? styles.SelectWrapper1_small : ""
        }`
        } >
        <
        div className = {
            styles.SelectWrapper1_input
        }
        onClick = {
            openList
        } > {!leftLabel ? ( <
                div className = {
                    styles.SelectWrapper1_label
                } > {
                    props.data.label
                } <
                /div>
            ) : null
        } <
        div className = {
            `${styles.SelectWrapper1_theValue} ${
              !name ? styles.SelectWrapper1_placeholder : ""
            }`
        } >
        {
            name ? name : label
        } <
        /div> <
        FontAwesomeIcon icon = {
            open ? faCaretUp : faCaretDown
        }
        className = {
            styles.SelectWrapper1_icon
        }
        /> <
        /div>

        {
            open ? ( <
                div className = {
                    styles.SelectWrapper1_list
                } > {
                    list.map((item, index) => {
                        return ( <
                            div onClick = {
                                () => {
                                    onChange(item.value);
                                }
                            }
                            key = {
                                index
                            }
                            className = {
                                `${styles.SelectWrapper1_list_item} ${
                    item.value === value
                      ? styles.SelectWrapper1_list_itemSelected
                      : ""
                  }`
                            }
                            value = {
                                item.value
                            } >
                            {
                                item.name ? item.name : item.value
                            } <
                            /div>
                        );
                    })
                } <
                /div>
            ) : null
        } <
        /div> <
        /div>
    );
});