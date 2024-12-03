import React, {
    useContext
} from "react";
import Fields from "../Fields/Fields";
import TreeView from "@material-ui/lab/TreeView";
import {
    TreeItem
} from "@material-ui/lab";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faChevronRight
} from "@fortawesome/pro-regular-svg-icons";
import {
    observer
} from "mobx-react-lite";
import StyleStore from "../../stores/StyleStore";
import GlobalStore from "../../stores/GlobalStore";
import styles from './Tree.module.scss'

export const Tree = observer((props) => {
            const styleData = useContext(StyleStore);
            const globalData = useContext(GlobalStore);

            const onNodeToggle = (event, openNodes) => {
                globalData.changeTreeExpanded(openNodes);
            };
            if (props.data) {
                return ( < TreeView className = {
                        styles.Tree
                    }
                    expanded = {
                        props.data.map(item => {
                            return item.nodeId
                        })
                    } >

                    {
                        props.data.map(item => {
                            return ( <
                                TreeItem key = {
                                    item.nodeId
                                }
                                nodeId = {
                                    item.nodeId
                                }
                                label = {
                                    item.label
                                }
                                className = {
                                    `${styles.Tree_child} ${styles.Tree_alwaysOpen}`
                                } >
                                <
                                Fields fromCanvas = {
                                    true
                                }
                                data = {
                                    item.data
                                }
                                updateCanvasStore = {
                                    true
                                }
                                fromEditJson = {
                                    props.fromEditJson
                                }
                                /> <
                                /TreeItem>
                            )
                        })
                    } <
                    /TreeView>)
                }

                return ( <
                    TreeView className = {
                        styles.Tree
                    }
                    expanded = {
                        globalData.treeExpanded
                    }
                    onNodeToggle = {
                        onNodeToggle
                    }
                    defaultCollapseIcon = { <
                        FontAwesomeIcon icon = {
                            faChevronRight
                        }
                        className = {
                            styles.tree_icon
                        }
                        />
                    }
                    defaultExpandIcon = { <
                        FontAwesomeIcon icon = {
                            faChevronRight
                        }
                        className = {
                            styles.tree_icon
                        }
                        />
                    } >
                    <
                    TreeItem nodeId = "spacing"
                    label = "Spacing"
                    className = {
                        styles.Tree_child
                    } >
                    <
                    Fields editable = {
                        props.editable
                    }
                    fromCanvas = {
                        props.fromCanvas
                    }
                    data = {
                        styleData.spacingData
                    }
                    /> <
                    /TreeItem> <
                    TreeItem nodeId = "size"
                    label = "Size"
                    className = {
                        styles.Tree_child
                    } >
                    <
                    Fields editable = {
                        props.editable
                    }
                    fromCanvas = {
                        props.fromCanvas
                    }
                    data = {
                        styleData.sizeData
                    }
                    /> <
                    /TreeItem> <
                    TreeItem nodeId = "position"
                    label = "Position"
                    className = {
                        styles.Tree_child
                    } >
                    <
                    Fields editable = {
                        props.editable
                    }
                    fromCanvas = {
                        props.fromCanvas
                    }
                    data = {
                        styleData.positionData
                    }
                    /> <
                    /TreeItem> <
                    TreeItem nodeId = "typography"
                    label = "Typography"
                    className = {
                        styles.Tree_child
                    } >
                    <
                    Fields editable = {
                        props.editable
                    }
                    fromCanvas = {
                        props.fromCanvas
                    }
                    data = {
                        styleData.typographyData
                    }
                    /> <
                    /TreeItem> <
                    TreeItem nodeId = "backgrounds"
                    label = "Background"
                    className = {
                        styles.Tree_child
                    } >
                    <
                    Fields editable = {
                        props.editable
                    }
                    fromCanvas = {
                        props.fromCanvas
                    }
                    data = {
                        styleData.backgroundData
                    }
                    /> <
                    /TreeItem> <
                    TreeItem nodeId = "borders"
                    label = "Border"
                    className = {
                        styles.Tree_child
                    } >
                    <
                    Fields editable = {
                        props.editable
                    }
                    fromCanvas = {
                        props.fromCanvas
                    }
                    data = {
                        styleData.borderData
                    }
                    /> <
                    /TreeItem> <
                    TreeItem nodeId = "shadow"
                    label = "Shadow"
                    className = {
                        styles.Tree_child
                    } >
                    <
                    Fields editable = {
                        props.editable
                    }
                    fromCanvas = {
                        props.fromCanvas
                    }
                    data = {
                        styleData.shadowData
                    }
                    /> <
                    /TreeItem>

                    {
                        /* <TreeItem nodeId="code" label="Your changes" className={styles.treeChild}>
                                          <Code />
                                      </TreeItem> */
                    } <
                    /TreeView>
                );
            });