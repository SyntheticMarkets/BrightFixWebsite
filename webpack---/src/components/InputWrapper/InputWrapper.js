import React, {
    useState,
    useContext,
    useEffect
} from "react";
import TextField from "@material-ui/core/TextField";
import StyleStore from "../../stores/StyleStore";
import AreaStore from "../../stores/AreaStore";
import {
    SelectWrapper
} from "../SelectWrapper/SelectWrapper";
import {
    observer
} from "mobx-react-lite";
import {
    SliderBox
} from "../SliderBox/SliderBox";
import useClickOutside from "../useClickOutside";
import {
    rgbToHex
} from "../utils";
import {
    CanvasStoreClass
} from "../../stores/CanvasStore";
import InputLabel from "../InputLabel/InputLabel";
import styles from "./InputWrapper.module.scss";
import classNames from "classnames";
import CanvasPropertiesStore from "../../stores/CanvasPropertiesStore";

let timeout;
export const InputWrapper = observer((props) => {
    const CanvasPropertiesData = useContext(CanvasPropertiesStore);
    const styleData = useContext(StyleStore);
    const areaData = useContext(AreaStore);
    const [popoverOpen, setPopover] = useState(false);
    const [addZIndex, setAddZIndex] = useState(false);
    const [value, setValue] = useState("");
    // const [ref, hasClickedOutside] = useClickOutside();

    const ref = useClickOutside(() => {
        setPopover(false);
    });

    useEffect(() => {
        if (props.value !== undefined && props.value !== value) {
            setValue(props.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);
    const onSelectChange = (newValue, newIntValue) => {
        styleData.onChange(props.data, null, newValue);

        if (newValue === "none" || newValue === "auto" || newValue === "normal") {
            styleData.onChange(props.data, newValue);
        } else if (isNaN(props.data.value)) {
            styleData.onChange(props.data, 10);
        }
    };

    const onInputChange = (event, newValue) => {
        let theNewValue = newValue ? newValue : event.target.value;

        if (!isNaN(theNewValue)) {
            theNewValue = Number(theNewValue);
        }

        if (props.onChange) {
            props.onChange(theNewValue);
        } else if (props.updateCanvasStore) {
            setValue(theNewValue);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                CanvasStoreClass.onChange(props.data, theNewValue);
            }, 100);
        } else if (
            (event && event.target && event.target.value !== undefined) ||
            newValue
        ) {
            if (!isNaN(theNewValue) &&
                (props.data.kind === "auto" ||
                    props.data.kind === "none" ||
                    props.data.kind === "normal")
            ) {
                styleData.onChange(props.data, theNewValue, "px");
            } else {
                styleData.onChange(props.data, theNewValue);
            }
            showArea();
        }
    };

    const onInputFocus = (event) => {
        setPopover(true);
        if (
            props.data &&
            (props.data.kind === "none" ||
                props.data.kind === "auto" ||
                props.data.kind === "normal")
        ) {
            styleData.onChange(props.data, "", null, false);
        }
    };

    const onInputFocusOut = () => {
        if (
            props.data && (
                props.data.kind === "none" ||
                props.data.kind === "auto" ||
                props.data.kind === "normal")
        ) {
            styleData.onChange(props.data, props.data.value);
        }
    };

    const showArea = () => {
        if (props.data) {
            if (
                props.data.id.includes("margin") ||
                props.data.id.includes("padding")
            ) {
                areaData.calculateArea(props.data.id);
            }
        }
    };

    const onListOpen = (bool) => {
        setAddZIndex(bool);
    };

    const hideArea = () => {
        if (props.data) {
            if (
                props.data.id.includes("margin") ||
                props.data.id.includes("padding")
            ) {
                areaData.hideArea();
            }
        }
    };

    let specialKind;
    if (props.data && props.data.auto) {
        specialKind = {
            name: "Auto",
            value: "auto"
        };
    } else if (props.data && props.data.none) {
        specialKind = {
            name: "None",
            value: "none"
        };
    } else if (props.data && props.data.normal) {
        specialKind = {
            name: "Normal",
            value: "normal"
        };
    }

    let dataValue = props.data ? props.data.value : "";
    let inputValue = value ? value : dataValue;
    let type =
        props.type === "input" &&
        props.data &&
        props.data.type === "input" &&
        inputValue !== "none" &&
        inputValue !== "auto" &&
        inputValue !== "normal" ?
        "number" :
        "text";
    let inputValueForColorPiker =
        props.data && props.data.type === "color" ?
        rgbToHex(inputValue) :
        inputValue;

    let selectData = {
        value: props.data && props.data.kind,
        list: [{
                value: "px",
                name: "PX"
            },
            {
                value: "%",
                name: "%"
            },
            {
                value: "em",
                name: "EM"
            },
            {
                value: "vw",
                name: "VW"
            },
            {
                value: "vh",
                name: "VH  "
            },
        ],
    };

    if (props.data && props.data.auto) {
        selectData.list.push({
            value: "auto",
            name: "Auto"
        });
    }
    if (props.data && props.data.none) {
        selectData.list.push({
            value: "none",
            name: "None"
        });
    }
    if (props.data && props.data.normal) {
        selectData.list.push({
            value: "normal",
            name: "Normal"
        });
    }

    let leftLabel = true; //props.updateCanvasStore
    let label = props.data && props.data.label ? props.data.label : props.label;

    return ( <
        div className = {
            classNames(styles.InputWrapper, {
                [styles.inputDisable]: CanvasPropertiesData.editPropertyId &&
                    props.data &&
                    props.editable &&
                    CanvasPropertiesData.editPropertyId !== props.data.id,
            })
        }
        onMouseEnter = {
            showArea
        }
        ref = {
            ref
        }
        style = {
            props.width ? {
                width: props.width
            } : {}
        }
        onMouseLeave = {
            hideArea
        } >
        <
        div className = {
            `${styles.InputWrapper_leftLabel} ${
          props.data && props.data.labelPosition === "bottom"
            ? styles.InputWrapper_bottomLabel
            : ""
        }`
        } >
        <
        InputLabel label = {
            label
        }
        data = {
            props.data
        }
        editable = {
            props.editable
        }
        capitalize = {
            props.data && props.data.capitalize
        }
        position = {
            props.data && props.data.labelPosition
        }
        /> <
        TextField className = {
            `${styles.InputWrapper_input} ${
            props.data && props.data.type === "color"
              ? styles.InputWrapper_inputColorWrapper
              : ``
          }`
        }
        onChange = {
            onInputChange
        }
        label = {!leftLabel ? props.data.label : ""
        }
        onClick = {
            onInputFocus
        }
        onBlur = {
            onInputFocusOut
        }
        variant = "outlined"
        size = "small"
        type = {
            type
        }
        value = {
            isNaN(inputValue) &&
            inputValue !== "none" &&
            inputValue !== "auto" &&
            inputValue !== "normal" &&
            props.data &&
            props.data.type !== "color" ?
            "" :
                inputValue
        }
        />

        {
            props.data && props.data.type === "color" ? ( <
                input type = "color"
                className = {
                    styles.InputWrapper_inputColor
                }
                value = {
                    inputValueForColorPiker
                }
                onChange = {
                    onInputChange
                }
                style = {
                    {
                        backgroundColor: inputValue
                    }
                }
                />
            ) : null
        } <
        /div>

        {
            (!props.updateCanvasStore || type === "number") &&
            props.data &&
                props.data.type !== "color" &&
                inputValue !== "normal" &&
                inputValue ? ( <
                    div className = {
                        `${styles.InputWrapper_SelectKind} ${
            addZIndex ? styles.InputWrapper_SelectKind_zIndex : ""
          }`
                    } >
                    <
                    SelectWrapper onListOpen = {
                        onListOpen
                    }
                    data = {
                        selectData
                    }
                    dontUpdateStore = {
                        true
                    }
                    onChange = {
                        onSelectChange
                    }
                    kind = "small" /
                    >
                    <
                    /div>
                ) : null
        }

        {
            popoverOpen &&
                props.data &&
                props.data.type !== "color" &&
                !props.updateCanvasStore ? ( <
                    SliderBox type = {
                        type
                    }
                    right = {
                        props.updateCanvasStore || props.data.rightSlider
                    }
                    value = {
                        inputValue
                    }
                    specialKind = {
                        specialKind
                    }
                    onChange = {
                        onInputChange
                    }
                    onSelectChange = {
                        onSelectChange
                    }
                    />
                ) : null
        } <
        /div>
    );
});