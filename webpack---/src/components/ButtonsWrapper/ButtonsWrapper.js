import React, {
    useState,
    useContext,
    useEffect
} from "react";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {
    observer
} from "mobx-react-lite";
import StyleStore from "../../stores/StyleStore";
import InputLabel from "../InputLabel/InputLabel";
import styles from "./ButtonWrapper.module.scss";

export const ButtonsWrapper = observer((props) => {
    const styleData = useContext(StyleStore);

    const [value, setValue] = useState(props.data ? props.data.value : props.value);

    useEffect(() => {
        if (props && props.data && props.data.value) {
            setValue(props.data.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);

    const chooseIcon = (icon) => {
        if (icon === "alignLeft") {
            return <FormatAlignLeftIcon / > ;
        }
        if (icon === "alignCenter") {
            return <FormatAlignCenterIcon / > ;
        } else if (icon === "alignRight") {
            return <FormatAlignRightIcon / > ;
        } else if (icon === "alignJustify") {
            return <FormatAlignJustifyIcon / > ;
        } else if (icon === "italic") {
            return <FormatItalicIcon / > ;
        } else if (icon === "underline") {
            return <FormatUnderlinedIcon / > ;
        } else if (icon === "bold") {
            return <FormatBoldIcon / > ;
        }
    };

    const setNewValueFromArray = (event, newValue) => {
        let newArray = value.map((item) => {
            return item;
        }); //copy the array
        const findValue = newArray.find((value) => {
            return value === newValue;
        }); //find if the value in the array

        if (findValue) {
            newArray = newArray.filter((value) => {
                return value !== newValue;
            });
        } else {
            newArray.push(newValue);
        }

        setValue(newArray);
        styleData.onChangeFontKinds(newArray);
    };

    const setNewValue = (event, newValue) => {
        if (!newValue) {
            return;
        }
        setValue(newValue);
        styleData.onChange(props.data, newValue);
    };

    return ( <
        div className = {
            styles.ButtonsWrapper_FontStyles
        } >
        <
        InputLabel label = {
            props.data.label
        }
        /> { /* <div className='ButtonsWrapper_label'>{props.data.label}</div> */ } <
        ToggleButtonGroup className = {
            styles.ButtonsWrapper_buttonGroup
        }
        size = "small"
        value = {
            value
        }
        exclusive onChange = {
            props.data.multiSelect ? setNewValueFromArray : setNewValue
        }
        aria - label = "text alignment" >
        {
            props.data &&
            props.data.list &&
            props.data.list.map((item) => {
                return ( <
                    ToggleButton value = {
                        item.value
                    }
                    key = {
                        item.value
                    }
                    className = {
                        styles.ButtonsWrapper_button
                    } >
                    {
                        chooseIcon(item.icon)
                    } <
                    /ToggleButton>
                );
            })
        } <
        /ToggleButtonGroup> <
        /div>
    );
});

// if (variables.env === "web" && variables.isDev) {
//   Jinno(
//     ButtonsWrapper,
//     "ButtonsWrapper",
//     {
//       data: {
//         value: [true, false, true],
//         list: [
//           { value: "italic", icon: "italic" },
//           { value: "underline", icon: "underline" },
//           { value: "bold", icon: "bold" },
//         ],
//       },
//     },
//     { title: "Buttons", width: 110, height: 200 }
//   );
// }