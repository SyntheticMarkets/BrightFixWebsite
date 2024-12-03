import React, {
    useContext,
    useEffect,
    useState
} from "react";
import styles from "./EditInput.module.scss";
import {
    SelectWrapper
} from "../SelectWrapper/SelectWrapper";
import Input from "../Input/Input";
import {
    InputWrapper
} from "../InputWrapper/InputWrapper";
import Checkbox from "../Checkbox/Checkbox";
import classNames from "classnames";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import CanvasPropertiesStore from "../../stores/CanvasPropertiesStore";
import EditPropertyStore from "../../stores/EditPropertyStore";
import {
    useClickOutside
} from "react-click-outside-hook";
import {
    observer
} from "mobx-react-lite";
import {
    toJS
} from "mobx";
import {
    CanvasStoreClass
} from "../../stores/CanvasStore";
import Textarea from "../Textarea.js/Textarea";
import EditList from "./EditList/EditList";

export default observer((props) => {
    const CanvasPropertiesData = useContext(CanvasPropertiesStore);
    const EditPropertyData = useContext(EditPropertyStore);
    const [ref, hasClickedOutside] = useClickOutside();

    const [listData, setListData] = useState(
        props.data && props.data.list !== undefined ? props.data.list : []
    );

    const [id, setId] = useState(
        props.data && props.data.id !== undefined ? props.data.id : ""
    );
    const [value, setValue] = useState(
        props.data && props.data.value !== undefined ? props.data.value : ""
    );
    const [type, setType] = useState(
        props.data && props.data.type !== undefined ? props.data.type : ""
    );
    const [desc, setDesc] = useState(
        props.data && props.data.desc !== undefined ? props.data.desc : ""
    );

    useEffect(() => {
        if (hasClickedOutside) {
            CanvasPropertiesData.checkIfCloseProperty(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasClickedOutside]);

    useEffect(() => {
        if (props.data) {
            setId(props.data.id);
            setValue(props.data.value);
            setType(props.data.type);
            setListData(props.data.list ? props.data.list : []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);

    const deleteField = () => {
        EditPropertyData.deleteField();
    };

    const typeData = {
        value: type,
        list: [{
                value: "inputText",
                name: "String"
            },
            {
                value: "select",
                name: "List"
            },
            {
                value: "number",
                name: "Number"
            },
            {
                value: "checkbox",
                name: "Boolean"
            },
            {
                value: "function",
                name: "Function"
            },
        ],
    };

    const close = () => {
        CanvasPropertiesData.setEditPropertyData(false);
    };

    const changeType = (newValue) => {
        setType(newValue);
        if (newValue === "number") {
            if (isNaN(value)) {
                setValue("");
            }
        }
    };

    const onChange = (e, type) => {
        let newValue =
            e && e.target && e.target.value !== undefined ? e.target.value : e;
        if (type === "id") {
            setId(newValue);
        } else if (type === "value") {
            setValue(newValue);
        } else if (type === "type") {
            changeType(newValue);
        } else if (type === "list") {
            setListData(newValue);
        } else if (type === "desc") {
            setDesc(newValue);
        }

        CanvasStoreClass.onChangeProperty(type, newValue);
    };


    return ( <
        div ref = {
            ref
        }
        className = {
            styles.wrapper
        }
        style = {
            CanvasPropertiesData.editPropertyPosition ?
            toJS(CanvasPropertiesData.editPropertyPosition) :
            {}
        } >
        <
        div className = {
            styles.scrollArea
        } >
        <
        div className = {
            classNames({
                [styles.tooltip]: true,
            })
        } >
        <
        FontAwesomeIcon className = {
            styles.close
        }
        onClick = {
            close
        }
        icon = {
            faTimes
        }
        /> <
        div className = {
            styles.allInputs
        } >
        <
        div className = {
            styles.field
        } >
        <
        SelectWrapper label = {
            "Type"
        }
        data = {
            typeData
        }
        value = "function"
        onChange = {
            (e) => {
                onChange(e, "type");
            }
        }
        /> <
        /div> <
        div className = {
            styles.field
        } >
        <
        Input label = {
            "Name"
        }
        value = {
            id
        }
        onChange = {
            (e) => {
                onChange(e, "id");
            }
        }
        /> <
        /div> <
        div className = {
            styles.field
        } > {
            type === "checkbox" ? ( <
                Checkbox label = {
                    "Default value"
                }
                value = {
                    value
                }
                onChange = {
                    (e) => {
                        onChange(e, "value");
                    }
                }
                />
            ) : type === "number" ? ( <
                InputWrapper label = {
                    "Default value"
                }
                value = {
                    value
                }
                type = "number"
                onChange = {
                    (e) => {
                        onChange(e, "value");
                    }
                }
                />
            ) : type !== 'function' ? ( <
                Input label = {
                    "Default value"
                }
                value = {
                    value
                }
                onChange = {
                    (e) => {
                        onChange(e, "value");
                    }
                }
                />
            ) : null
        } <
        /div> {
            type === "select" ? ( <
                div className = {
                    styles.field
                } >
                <
                EditList data = {
                    listData
                }
                onChangeList = {
                    (newList) => {
                        onChange(newList, "list");
                    }
                }
                /> <
                /div>
            ) : null
        } <
        div className = {
            styles.field
        } >
        <
        Textarea label = {
            "Description"
        }
        value = {
            desc
        }
        onChange = {
            (e) => {
                onChange(e, "desc");
            }
        }
        /> <
        /div> <
        div className = {
            classNames([styles.field, styles.deleteField])
        } >
        <
        span className = {
            styles.deleteField_button
        }
        onClick = {
            deleteField
        } >
        Delete field <
        /span> <
        /div> <
        /div> <
        /div> <
        /div> <
        /div>
    );
});