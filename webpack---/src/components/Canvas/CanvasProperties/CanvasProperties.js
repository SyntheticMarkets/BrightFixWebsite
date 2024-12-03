import React, {
    useContext
} from "react";
import {
    observer
} from "mobx-react-lite";
import styles from "./CanvasProperties.module.scss";
import stylesTree from "../../Tree/Tree.module.scss";
import Fields from "../../Fields/Fields";
import CanvasStore from "../../../stores/CanvasStore";
import {
    faChevronRight
} from "@fortawesome/pro-regular-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import TreeView from "@material-ui/lab/TreeView";
import {
    TreeItem
} from "@material-ui/lab";
import GlobalStore from "../../../stores/GlobalStore";
import EditPropertyStore from "../../../stores/EditPropertyStore";

export const CanvasProperties = observer((props) => {
    const EditPropertyData = useContext(EditPropertyStore);
    const CanvasData = useContext(CanvasStore);
    const globalData = useContext(GlobalStore);

    const onNodeToggle = (e, newNodes) => {
        globalData.changeTreeExpanded(newNodes);
    };

    const addField = () => {
        EditPropertyData.addField();
    };
    if (!CanvasData.selectedProperties.length && !EditPropertyData.allowToEdit) {
        return < > < />;
    }
    console.log("hereeee", CanvasData.selectedProperties);
    return ( <
        div className = {
            styles.CanvasProperties
        }
        style = {
            {
                opacity: CanvasData.propertyOpacity
            }
        } >
        <
        TreeView className = {
            stylesTree.Tree
        }
        expanded = {
            globalData.treeExpanded
        }
        onNodeToggle = {
            onNodeToggle
        }
        defaultCollapseIcon = { <
            FontAwesomeIcon
            icon = {
                faChevronRight
            }
            className = {
                stylesTree.tree_icon
            }
            />
        }
        defaultExpandIcon = { <
            FontAwesomeIcon
            icon = {
                faChevronRight
            }
            className = {
                stylesTree.tree_icon
            }
            />
        } >
        <
        TreeItem nodeId = "properties"
        label = "Component properties"
        className = {
            `${stylesTree.Tree_child} ${styles.CanvasProperties_lastChild}`
        } >
        <
        Fields data = {
            CanvasData.selectedProperties
        }
        updateCanvasStore = {
            true
        }
        fromCanvas = {
            true
        }
        /> {
            EditPropertyData.allowToEdit ? ( <
                div className = {
                    styles.addField
                }
                onClick = {
                    addField
                } >
                +Add field <
                /div>
            ) : null
        } <
        /TreeItem> {
            CanvasData.selectedFunctions.length ? ( <
                TreeItem nodeId = "functions"
                label = "Functions"
                className = {
                    `${stylesTree.Tree_child} ${styles.CanvasProperties_lastChild}`
                } >
                <
                Fields data = {
                    CanvasData.selectedFunctions
                }
                updateCanvasStore = {
                    true
                }
                fromCanvas = {
                    true
                }
                /> <
                /TreeItem>
            ) : null
        } <
        /TreeView> <
        /div>
    );
});