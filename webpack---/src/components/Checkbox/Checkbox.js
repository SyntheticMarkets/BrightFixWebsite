import React, {
    useState,
    useContext,
    useEffect
} from "react";
import styles from "./Checkbox.module.scss";
import CheckboxMaterial from "@material-ui/core/Checkbox";
import {
    CanvasStoreClass
} from "../../stores/CanvasStore";
import {
    CanvasPropertiesStoreClass
} from "../../stores/CanvasPropertiesStore";
import CanvasPropertiesStore from "../../stores/CanvasPropertiesStore";
import {
    observer
} from "mobx-react-lite";
import classNames from "classnames";
import InputLabel from "../InputLabel/InputLabel";

const Checkbox = observer((props) => {
    const CanvasPropertiesData = useContext(CanvasPropertiesStore);
    const [checked, setChecked] = useState(
        props.data && props.data.value !== undefined ?
        props.data.value :
        props.value !== undefined ?
        props.value :
        false
    );
    let label = props.data && props.data.label ? props.data.label : props.label;

    useEffect(() => {
        if (props.data && props.data.value !== checked) {
            setChecked(props.data.value !== undefined ? props.data.value : false);
        } else if (props.value !== undefined && props.value !== checked) {
            setChecked(props.value !== undefined ? props.value : false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value, props.data ? props.data.value : ""]);

    const toggleChecked = () => {
        if (props.fromEditJson) {
            CanvasPropertiesStoreClass.onChange(props.data, !checked);
        } else if (props.updateCanvasStore) {
            CanvasStoreClass.onChange(props.data, !checked);
        }

        if (props.onChange) {
            props.onChange(!checked);
        }

        setChecked(!checked);
    };

    return ( <
        div className = {
            classNames(styles.checkbox, {
                [styles.inputDisable]: CanvasPropertiesData.editPropertyId &&
                    props.data &&
                    props.editable &&
                    CanvasPropertiesData.editPropertyId !== props.data.id,
            })
        }
        // onClick={toggleChecked}
        >
        {
            /* <div
                    className={`${styles.label} ${
                      props.data && props.data.capitalize === false
                        ? styles.removeCapitalize
                        : ""
                    }`}
                  >
                    {label}:
                  </div> */
        } <
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
        div className = {
            styles.checkboxHolder
        } >
        <
        CheckboxMaterial checked = {
            checked
        }
        onChange = {
            toggleChecked
        }
        className = {
            styles.checkboxDesign
        }
        /> <
        /div> <
        /div>
    );
});
export default Checkbox;

// if (variables.env === "web" && variables.isDev) {
//   Jinno(Checkbox, "Checkbox");
// }