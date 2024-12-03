import React, {
    useContext,
    useEffect,
    useRef
} from "react";
import {
    InputWrapper
} from "../InputWrapper/InputWrapper";
import {
    SelectWrapper
} from "../SelectWrapper/SelectWrapper";
import Checkbox from "../Checkbox/Checkbox";
import JsonInput from "../JsonInput/JsonInput";
import Input from "../Input/Input";
import FunctionData from "../FunctionData/FunctionData";
import {
    ButtonsWrapper
} from "../ButtonsWrapper/ButtonsWrapper";
import {
    CanvasStoreClass
} from "../../stores/CanvasStore";
import {
    convertToCodeName,
    buildFunc
} from "../utils";
import {
    faTrash
} from "@fortawesome/pro-light-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import CanvasPropertiesStore, {
    CanvasPropertiesStoreClass,
} from "../../stores/CanvasPropertiesStore";
import styles from "./Fields.module.scss";
import {
    observer
} from "mobx-react-lite";
import {
    SortableContainer,
    SortableElement
} from "react-sortable-hoc";
import EditPropertyStore from "../../stores/EditPropertyStore";
import classNames from "classnames";

const Fields = observer((props) => {
    const EditPropertyData = useContext(EditPropertyStore);
    const CanvasPropertiesData = useContext(CanvasPropertiesStore);
    const openDefaultProperty = CanvasPropertiesData.openDefaultProperty;

    const onMouseEnter = (e, item) => {
        let title = `${item.id} (${convertToCodeName(item.type)})`;
        CanvasStoreClass.setToolTipData(e.currentTarget, title, item.desc);
    };

    const onMouseLeave = (e) => {
        CanvasStoreClass.setToolTipData(null, null, null, null);
    };

    const removeRow = (item) => {
        CanvasPropertiesStoreClass.removeRow(item);
    };

    const onSortEnd = (newSort) => {
        const oldIndex = newSort.oldIndex;
        const newIndex = newSort.newIndex;

        if (oldIndex !== newIndex) {
            CanvasPropertiesData.onSort(oldIndex, newIndex);
        }
    };

    return ( <
        span onMouseLeave = {
            onMouseLeave
        } >
        <
        div className = {
            `${styles.Fields} ${styles.FieldsFromCanvas}`
        } >
        <
        GetFields data = {
            props.data
        }
        editable = {
            props.editable
        }
        helperClass = {
            styles.helperClass
        }
        axis = "xy"
        onSortEnd = {
            onSortEnd
        }
        allowToEdit = {
            props.updateCanvasStore && EditPropertyData.allowToEdit
        }
        removeRow = {
            removeRow
        }
        openDefaultProperty = {
            openDefaultProperty
        }
        onMouseEnter = {
            onMouseEnter
        }
        onMouseLeave = {
            onMouseLeave
        }
        updateCanvasStore = {
            props.updateCanvasStore
        }
        fromEditJson = {
            props.fromEditJson
        }
        /> <
        /div> <
        /span>
    );
});

const GetFields = SortableContainer((props) => {
    let data = props.data;
    let kind = props.kind;
    let removeRow = props.removeRow;
    let onMouseEnter = props.onMouseEnter;
    let onMouseLeave = props.onMouseLeave;
    let openDefaultProperty = props.openDefaultProperty;
    let editable = props.editable !== undefined ? props.editable : true

    return ( <
        div className = {
            styles.allFields
        } > {
            data &&
            data.map((item, index) => {
                let key =
                    item && item.serverId ?
                    item.serverId :
                    `${item && item.id ? item.id : ""}_${index}`;
                if (
                    item.type === "input" ||
                    item.type === "color" ||
                    item.type === "number"
                ) {
                    return ( <
                        Row item = {
                            item
                        }
                        kind = {
                            kind
                        }
                        key = {
                            key
                        }
                        openDefaultProperty = {
                            openDefaultProperty
                        }
                        index = {
                            index
                        }
                        disabled = {!props.allowToEdit
                        }
                        updateCanvasStore = {
                            props.updateCanvasStore
                        } >
                        <
                        InputWrapper editable = {
                            editable
                        }
                        data = {
                            item
                        }
                        updateCanvasStore = {
                            props.updateCanvasStore
                        }
                        fromEditJson = {
                            props.fromEditJson
                        }
                        /> <
                        /Row>
                    );
                } else if (item.type === "inputText") {
                    return ( <
                        Row item = {
                            item
                        }
                        kind = {
                            kind
                        }
                        key = {
                            key
                        }
                        openDefaultProperty = {
                            openDefaultProperty
                        }
                        index = {
                            index
                        }
                        disabled = {!props.allowToEdit
                        }
                        updateCanvasStore = {
                            props.updateCanvasStore
                        } >
                        <
                        Input editable = {
                            editable
                        }
                        data = {
                            item
                        }
                        updateCanvasStore = {
                            props.updateCanvasStore
                        }
                        fromEditJson = {
                            props.fromEditJson
                        }
                        /> <
                        /Row>
                    );
                } else if (item.type === "Json") {
                    return ( <
                        Row item = {
                            item
                        }
                        kind = {
                            key
                        }
                        openDefaultProperty = {
                            openDefaultProperty
                        }
                        key = {
                            index
                        }
                        index = {
                            index
                        }
                        disabled = {!props.allowToEdit
                        }
                        updateCanvasStore = {
                            props.updateCanvasStore
                        } >
                        <
                        JsonInput data = {
                            item
                        }
                        /> <
                        /Row>
                    );
                } else if (item.type === "select") {
                    return ( <
                        Row item = {
                            item
                        }
                        kind = {
                            kind
                        }
                        openDefaultProperty = {
                            openDefaultProperty
                        }
                        key = {
                            key
                        }
                        index = {
                            index
                        }
                        disabled = {!props.allowToEdit
                        }
                        updateCanvasStore = {
                            props.updateCanvasStore
                        }
                        addClassName = {
                            kind === "section" ? styles.Field_sectionSpacing_select : ""
                        } >
                        <
                        SelectWrapper data = {
                            item
                        }
                        editable = {
                            editable
                        }
                        updateCanvasStore = {
                            props.updateCanvasStore
                        }
                        /> { /* </span> */ } {
                            item.children &&
                                item.children.visible &&
                                item.children.fields &&
                                item.children.visible.includes(item.value) ? ( <
                                    GetFields { ...props
                                    }
                                    data = {
                                        item.children.fields
                                    }
                                    />
                                ) : (
                                    ""
                                )
                        } <
                        /Row>
                    );
                } else if (item.type === "Buttons") {
                    return ( <
                        div key = {
                            index
                        }
                        onMouseEnter = {
                            (e) => {
                                onMouseEnter(e, item);
                            }
                        }
                        onMouseLeave = {
                            onMouseLeave
                        }
                        className = {
                            classNames({
                                [styles.Fields_rowBig]: item && item.big,
                                [styles.Fields_row]: kind !== "section",
                            })
                        } >
                        <
                        ButtonsWrapper key = {
                            index
                        }
                        data = {
                            item
                        }
                        /> <
                        /div>
                    );
                } else if (item.type === "checkbox") {
                    return ( <
                        Row item = {
                            item
                        }
                        kind = {
                            kind
                        }
                        key = {
                            key
                        }
                        openDefaultProperty = {
                            openDefaultProperty
                        }
                        index = {
                            index
                        }
                        disabled = {!props.allowToEdit
                        }
                        updateCanvasStore = {
                            props.updateCanvasStore
                        } >
                        <
                        Checkbox editable = {
                            editable
                        }
                        data = {
                            item
                        }
                        updateCanvasStore = {
                            props.updateCanvasStore
                        }
                        fromEditJson = {
                            props.fromEditJson
                        }
                        /> <
                        /Row>
                    );
                } else if (item.type === "spacer") {
                    return <div className = {
                        styles.fileds_spacer
                    }
                    key = {
                        index
                    } > < /div>;
                } else if (item.type === "function") {
                    return ( <
                        Row disabled = {!props.allowToEdit
                        }
                        index = {
                            index
                        }
                        item = {
                            item
                        }
                        openDefaultProperty = {
                            openDefaultProperty
                        }
                        kind = {
                            kind
                        }
                        key = {
                            key
                        } >
                        <
                        FunctionData data = {
                            item
                        }
                        editable = {
                            editable
                        }
                        /> <
                        /Row>
                    );
                } else if (item.type === "section") {
                    // <div
                    //   className={`${styles.fields_section} ${styles.Fields_row} ${
                    //     item.label ? styles.fields_sectionLabel : ""
                    //   }`}
                    return ( <
                        div className = {
                            classNames(styles.fields_section, {
                                [styles.fields_sectionLabel]: item.label,
                                [styles.treeElements]: item && item.items && item.items.length === 3,
                            })
                        }
                        key = {
                            item.id ? item.id : index
                        } >
                        {
                            item.canDelete ? ( <
                                FontAwesomeIcon className = {
                                    styles.Fields_trash
                                }
                                onClick = {
                                    () => {
                                        removeRow(item);
                                    }
                                }
                                icon = {
                                    faTrash
                                }
                                />
                            ) : null
                        } <
                        GetFields { ...props
                        }
                        data = {
                            item.items
                        }
                        kind = "section" / >
                        <
                        /div>
                    );
                } else if (item.type === "row") {
                    return ( <
                        div className = {
                            `${styles.Fields_row} ${styles.Fields_rowMargin} ${
                  props.updateCanvasStore ? styles.Fields_rowBlack : ""
                }`
                        }
                        key = {
                            index
                        } >
                        {
                            item.label
                        } <
                        /div>
                    );
                } else {
                    return < > < />;
                }
            })
        } <
        /div>
    );
});

const Row = SortableElement((props) => {
    const elm = useRef(null);

    const onMouseEnter = (e, item, selected = false) => {
        if (!item.desc) {
            return;
        }

        let title = `${item.id} (${convertToCodeName(item.type)})`;

        if (item.type === "function") {
            title = `function ${item.id} ${buildFunc(item && item.params)}`;
        }
        CanvasStoreClass.setToolTipData(
            e.currentTarget,
            title,
            item.desc,
            selected
        );
    };

    // const onMouseLeave = (e) => {
    //   // CanvasStoreClass.setToolTipData(null, null, null, null);
    // };

    useEffect(() => {
        if (props.item && props.item.id === props.openDefaultProperty) {
            setTimeout(() => {
                if (elm.current) {
                    elm.current.currentTarget = elm.current;
                    onMouseEnter(elm.current, props.item, true);
                }
            }, 400);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.openDefaultProperty]);

    const onClick = (e) => {
        if (
            props.item &&
            props.item.id &&
            CanvasPropertiesStoreClass.editPropertyId &&
            CanvasPropertiesStoreClass.editPropertyId === props.item.id
        ) {
            CanvasPropertiesStoreClass.checkIfCloseProperty(false, true);
        }
    };

    return ( <
        div ref = {
            elm
        }
        onClick = {
            onClick
        }
        onMouseEnter = {
            (e) => {
                onMouseEnter(e, props.item);
            }
        }
        className = {
            classNames(styles.Fields_row, {
                [props.addClassName]: props.addClassName,
                [styles.Fields_rowBig]: props.item && props.item.big,
            })
        } >
        {
            props.children
        } <
        /div>
    );
});

export default Fields;

// if (variables.env === "web" && variables.isDev) {
//   Jinno(
//     Fields,
//     "Fields",
//     {
//       data: [{ type: "inputText", value: "a", key: "test", label: "test" }],
//     },
//     { title: "Fields" }
//   );
// }