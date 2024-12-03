// import root from 'react-shadow';
// import {jssPreset} from "@material-ui/styles";
// import {create} from 'jss';
import React, {
    useContext
} from "react";
import {
    Comments
} from "../Comments/Comments";
import {
    Area
} from "../Area/Area";
import {
    Inspect
} from "../Inspect/Inspect";
import {
    DetectBox
} from "../detectBox/detectBox";
import {
    Canvas
} from "../Canvas/Canvas";
import {
    HoverComponent
} from "../Hover/HoverComponent";
import {
    clickOnDetectBox
} from "../useClickOutside";
import {
    Summary
} from "../Summary/Summary";
import {
    RightClick
} from "../RightClick/RightClick";
import {
    observer
} from "mobx-react-lite";
import GlobalStore from "../../stores/GlobalStore";
import TextAIStore from "../../stores/TextAIStore";
import CanvasStore from "../../stores/CanvasStore";
import RemoveExtension from "../RemoveExtension/RemoveExtension";
import Prompt from "../Prompt/Prompt";
import {
    ControlBar
} from "../ControlBar/ControlBar";
import SignUp from "../SignUp/SignUp";
import InstallVSCodeModal from "../InstallVSCodeModal/InstallVSCodeModal";
import PageSupportModal from "../PageSupportModal/PageSupportModal";
import ReactModal from "../ReactModal/ReactModal";
import Payment from "../../Modals/Payment/Payment";
import Login from "../Login/Login";
import OpenVSPrompt from "../OpenVSPrompt/OpenVSPrompt";
import CodeDiff from "../CodeDiff/CodeDiff";

import TabsStore from "../../stores/TabsStore";
import Tabs from "../ControlBar/Tabs/Tabs";
import variables from "../../variables";
import NotLogin from "../NotLogin/NotLogin";
import ProductTour from "../ProductTour/ProductTour";
import CodeStore from "../../stores/CodeStore";

const WrappedJssComponent = observer(() => {
    const CanvasData = useContext(CanvasStore);
    const GlobalData = useContext(GlobalStore);
    const TextAIData = useContext(TextAIStore);
    const CodeData = useContext(CodeStore);

    return ( <
        div id = "fixMeDetectBox" >
        <
        div >
        <
        span onClick = {
            clickOnDetectBox
        } >
        <
        Comments / >
        <
        Inspect / >
        <
        RemoveExtension / >
        <
        DetectBox / > {!CanvasData.canvasOpen ? < HoverComponent / > : null
        } {
            GlobalData.summaryOpen ? < Summary / > : null
        } {
            GlobalData.modalOpen === "signUp" ? < SignUp / > : null
        } {
            GlobalData.modalOpen === "installVScode" ? ( <
                InstallVSCodeModal / >
            ) : null
        } {
            GlobalData.modalOpen === "pageSupportModal" ? ( <
                PageSupportModal / >
            ) : null
        } {
            GlobalData.modalOpen === "showReactModal" ? < ReactModal / > : null
        } {
            GlobalData.showPaymanyModal ? < Payment / > : null
        } {
            GlobalData.modalOpen === "login" ? < Login / > : null
        } {
            TextAIData.showCodeDiffID !== null ? < CodeDiff / > : null
        } <
        Area / >
        <
        RightClick / > {
            variables.isEditor && < NotLogin / >
        } {
            !variables.isEditor && < ControlBar / >
        } {
            !CodeData.isCssFile && < Prompt / >
        } <
        OpenVSPrompt / >
        <
        Tabs / > {
            GlobalData.showProductTour &&
            variables.isEditor &&
            !localStorage.productTourFinished ? ( <
                ProductTour / >
            ) : null
        } <
        /span> <
        /div> { /* {</StylesProvider>} */ } <
        Canvas / >
        <
        /div>
    );
});

export default WrappedJssComponent;