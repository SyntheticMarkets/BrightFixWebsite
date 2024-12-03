import React, {
    useContext
} from "react";
import {
    observer
} from "mobx-react-lite";
import CanvasStore from "../../stores/CanvasStore";
import SearchStore from "../../stores/SearchStore";
import GlobalStore from "../../stores/GlobalStore";
import {
    CodeHolder
} from "./CodeHolder/CodeHolder";
import StyleStore from "../../stores/StyleStore";
import EditPropertyStore from "../../stores/EditPropertyStore";
import {
    CanvasComponents
} from "./CanvasComponents/CanvasComponents";
import {
    CanvasProperties
} from "./CanvasProperties/CanvasProperties";
import {
    Tree
} from "../Tree/Tree";
import {
    Tooltip
} from "./Tooltip/Tooltip";
import styles from "./Canvas.module.scss";
import EditJson from "./EditJson/EditJson.js";
import CanvasPropertiesStore from "../../stores/CanvasPropertiesStore";
import Toggle from "../Toggle/Toggle";
import EditInput from "../EditInput/EditInput";
import CallToAction from "../Canvas/CallToAction/CallToAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
    HoverComponent
} from "../Hover/HoverComponent";
import AddNpm from "./AddNpm/AddNpm";
import CanvasHeader from "./CanvasHeader/CanvasHeader";

let sendAfter100 = false;
let sendAfter300 = false;
let sendAfter500 = false;
export const Canvas = observer((props) => {
    const SearchData = useContext(SearchStore);
    const CanvasData = useContext(CanvasStore);
    const GlobalData = useContext(GlobalStore);
    const StyleData = useContext(StyleStore);
    const EditPropertyData = useContext(EditPropertyStore);
    const CanvasPropertiesData = useContext(CanvasPropertiesStore);

    const saveFields = () => {
        let component =
            CanvasData.components && CanvasData.components[0] ?
            CanvasData.components[0] :
            {};
        if (component.notAbleToSave) {
            CanvasData.setShowInstallSdk(true);
        } else {
            EditPropertyData.saveFields();
        }
    };

    const updateTooltipPosition = () => {
        if (CanvasData.toolTipData && CanvasData.toolTipData.text) {
            CanvasData.setToolTipData(
                CanvasData.toolTipData.element,
                CanvasData.toolTipData.title,
                CanvasData.toolTipData.text
            );
        }
    };
    const changeToggle = (newValue) => {
        CanvasPropertiesData.setSelectedTab(newValue.toLowerCase());
    };

    const onScroll = (e) => {
        let scrollFromTop = e.target.scrollTop;

        if (!sendAfter100 && scrollFromTop > 100) {
            sendAfter100 = true;
        }

        if (!sendAfter300 && scrollFromTop > 300) {
            sendAfter300 = true;
        }

        if (!sendAfter500 && scrollFromTop > 400) {
            sendAfter500 = true;
        }
    };

    if (!CanvasData.canvasOpen) {
        return < > < />;
    }

    const isLoading = CanvasData.isLoading;
    let typeId =
        CanvasData.components &&
        CanvasData.components[0] &&
        CanvasData.components[0].typeId ?
        CanvasData.components[0].typeId :
        false;
    let showLandingPageOnComponents = [
        6, 12, 13, 14, 15, 16, 18, 19, 20, 21, 23, 24,
    ];
    let showLadingPage =
        window.isAws &&
        !SearchData.searchOpen &&
        showLandingPageOnComponents.includes(typeId);

    return ( <
        div className = {
            styles.CanvasForScroll
        }
        onScroll = {
            onScroll
        }
        style = {
            props.removeCodeHolder ? {
                position: "relative"
            } : {}
        } >
        <
        HoverComponent / > {
            CanvasData.showInstallSdk ? < AddNpm / > : null
        }

        <
        div className = {
            `${styles.Canvas} ${
          showLadingPage ? styles.CanvasSmall : ""
        }`
        } >
        <
        CanvasHeader / >
        <
        div className = {
            styles.Canvas_flex
        } > {
            isLoading ? ( <
                span className = {
                    styles.CanvasComponentsHolder
                } >
                <
                div className = {
                    styles.loading
                } >
                <
                CircularProgress variant = "indeterminate"
                size = {
                    40
                }
                thickness = {
                    3.6
                }
                /> <
                /div> <
                /span>
            ) : null
        } {
            true || (SearchData.searchOpen && !isLoading) ? ( <
                span className = {
                    styles.CanvasComponentsHolder
                } > {
                    SearchData.myComponentsList.length ? ( <
                        CanvasComponents allComponentsCopy = {
                            SearchData.myComponentsList
                        }
                        title = "My components" /
                        >
                    ) : null
                } {
                    !isLoading ? ( <
                        CanvasComponents allComponentsCopy = {
                            SearchData.componentsList
                        }
                        title = "Jinno example project (Coming Soon!):" /
                        >
                    ) : null
                } <
                /span>
            ) : null
        }

        <
        div className = {
            styles.rightWrapperHolder
        }
        style = {
            SearchData.searchOpen || isLoading ?
            {
                display: "none",
            } :
            {}
        } >
        <
        EditJson / > {!CanvasPropertiesData.editPropertyId ? < Tooltip / > : null
        } {
            CanvasPropertiesData.editPropertyId ? ( <
                EditInput data = {
                    CanvasPropertiesData.editPropertyData
                }
                />
            ) : null
        } <
        div className = {
            styles.rightWrapper
        }
        style = {
            CanvasPropertiesData.editPropertyId ?
            {
                overflow: "hidden",
            } :
            {}
        }
        onScroll = {
            updateTooltipPosition
        } >
        <
        span className = {
            styles.toggle
        } >
        <
        Toggle leftValue = "Design"
        rightValue = "Props"
        selected = {
            CanvasPropertiesData.selectedTab === "props" ?
            "Props" :
                "Design"
        }
        onChange = {
            changeToggle
        }
        /> <
        /span> {
            CanvasPropertiesData.selectedTab === "props" ? ( <
                CanvasProperties / >
            ) : null
        } {
            StyleData.elm &&
                GlobalData.tab === "editor" &&
                CanvasPropertiesData.selectedTab === "design" ? ( <
                    Tree fromCanvas = {
                        true
                    }
                    editable = {
                        false
                    }
                    />
                ) : CanvasPropertiesData.selectedTab === "design" ? ( <
                    div className = {
                        styles.emptyText
                    } >
                    Click on element on the component and start to design <
                    /div>
                ) : null
        } <
        /div> <
        CallToAction / > {
            EditPropertyData.showSaveButton ? ( <
                div className = {
                    styles.save
                }
                onClick = {
                    saveFields
                } >
                Save <
                /div>
            ) : null
        } <
        /div> {
            !SearchData.searchOpen && !isLoading && !props.removeCodeHolder ? ( <
                div className = {
                    styles.Canvas_drag
                } > {
                    CanvasData.codeOpen ? ( <
                        CodeHolder showLadingPage = {
                            showLadingPage
                        }
                        />
                    ) : null
                } { /* <CanvasGrid showLadingPage={showLadingPage} /> */ } <
                /div>
            ) : null
        } <
        /div> <
        /div> <
        /div>
    );
});