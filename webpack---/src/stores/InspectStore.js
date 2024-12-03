import {
    createContext
} from "react";
import {
    decorate,
    observable,
    action
} from "mobx";
import $ from "jquery";
import {
    StyleStoreClass
} from "./StyleStore";
import * as utils from "../components/utils";
import {
    Hover
} from "../components/Hover/Hover";
import {
    GlobalStoreClass
} from "./GlobalStore";
import {
    CanvasStoreClass
} from "./CanvasStore";
import {
    clickOnDetectBox
} from "../components/useClickOutside";

import variables from "../variables";
// import PrintScreen from '../PrintScreen'

class InspectClass {
    constructor() {
        this.listenerToInspect();
        if (
            window.chrome &&
            window.chrome.runtime &&
            window.chrome.runtime.onMessage
        ) {
            window.chrome.runtime.onMessage.addListener(this.onMessage.bind(this));
        }

        window.onfocus = () => {
            this.checkIfInspectVisible();
        };
        this.isDetectMode = false;
        this.elementCounter = 1;
        this.inspectVisible = true;
        this.orientation = "horizontal";
        this.lastClosedDate = null;

        if (window.chrome && window.chrome.storage && window.chrome.storage.sync) {
            this.checkIfInspectVisible();
        } else {
            this.inspectPositionChanged(true, this.orientation);
        }

        document.addEventListener("click", this.chooseElement.bind(this), true);
    }

    checkIfInspectVisible() {
        if (
            variables.env === "web" &&
            window.chrome &&
            window.chrome.storage &&
            window.chrome.storage.sync
        ) {
            window.chrome.storage.sync.get("inspectPosition", (data) => {
                if (
                    data &&
                    data.inspectPosition &&
                    data.inspectPosition.visible !== undefined
                ) {
                    this.inspectVisible = data.inspectPosition.visible;

                    if (!this.inspectVisible &&
                        data.inspectPosition.lastClosedDate !== new Date().getDate()
                    ) {
                        this.inspectVisible = true;
                    }
                }

                if (
                    data &&
                    data.inspectPosition &&
                    data.inspectPosition.lastClosedDate !== undefined
                ) {
                    this.lastClosedDate = data.inspectPosition.lastClosedDate;
                }

                if (
                    data &&
                    data.inspectPosition &&
                    (data.inspectPosition.orientation === "horizontal" ||
                        data.inspectPosition.orientation === "vertical")
                ) {
                    this.orientation = data.inspectPosition.orientation;
                }

                this.inspectPositionChanged(true, this.orientation);
            });
        }
    }

    onMessage(message, sender, sendResponse) {
        if (message.to !== "Inspect") {
            return;
        }

        if (message.openHover !== undefined) {
            // if the detect mode has changed
            this.openInspect();
            this.toggleDetect(message.openHover, message.sendEvent);
        }
    }

    chooseElement(e, element, openDetectBox = false) {
        const elm = element ? element : e && e.target ? e.target : false;
        const isSuperDeveloperClassName = !!(
            elm &&
            typeof elm.className === "string" &&
            elm.className.includes("zloof")
        );

        const fixMeDiv = utils.checkIfItsFixMeDiv(elm);

        if (openDetectBox) {
            this.toggleDetect(true, false);
        }
        if (
            (GlobalStoreClass.hoverIsVisible && !isSuperDeveloperClassName) ||
            openDetectBox
        ) {
            if (!fixMeDiv) {
                clickOnDetectBox(e, element);
                if (e && e.stopPropagation && !CanvasStoreClass.canvasOpen) {
                    e.stopPropagation();
                    e.preventDefault();
                }

                this.elementCounter++;
                $(elm).attr("zloof", this.elementCounter); // add attribute 'zloof'

                const rules = ""; // getCSSRules(elm)

                elm.id = "jino_find_react_source";
                StyleStoreClass.setElement(elm, rules);

                if (this.isDetectMode) {
                    if (
                        (GlobalStoreClass.treeExpanded.length === 1 &&
                            GlobalStoreClass.treeExpanded.includes("properties")) ||
                        !GlobalStoreClass.treeExpanded.length
                    ) {
                        if (elm.children && !elm.children.length && elm.innerText) {
                            GlobalStoreClass.changeTreeExpanded(["typography"]);
                        } else {
                            GlobalStoreClass.changeTreeExpanded(["spacing"]);
                        }
                    }

                    Hover.hide();
                }
            }
        }

        return false;
    }

    listenerToInspect() {
        window.addEventListener("devtoolschange", (event) => {
            if (event && event.detail && this.inspectVisible) {
                this.openInspect(event);
            } else {
                console.error("Could not detect inspect position changed", event);
            }
        });
    }

    inspectPositionChanged(isOpen, orientation) {
        // return
        // const close =
        //   window.chrome && window.chrome.extension
        //     ? window.chrome.extension.getURL("icons/x.svg")
        //     : "";
        // if (isOpen && this.inspectVisible) {
        //   if (orientation === "horizontal" || orientation === "outside") {
        //     $(`.${styles.Inspect}`).remove();
        //     $("body")
        //       .append(`<div class='${styles.Inspect} ${styles.inspect_horizontal}' id="fixMe123123132">
        //                     <div class='${styles.background}'>
        //                         <svg class=${styles.icon} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="crosshairs" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-crosshairs fa-w-16 fa-3x"><path fill="currentColor" d="M506 240h-34.591C463.608 133.462 378.538 48.392 272 40.591V6a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v34.591C133.462 48.392 48.392 133.462 40.591 240H6a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h34.591C48.392 378.538 133.462 463.608 240 471.409V506a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6v-34.591C378.538 463.608 463.608 378.538 471.409 272H506a6 6 0 0 0 6-6v-20a6 6 0 0 0-6-6zM272 439.305V374a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v65.305C151.282 431.711 80.315 361.031 72.695 272H138a6 6 0 0 0 6-6v-20a6 6 0 0 0-6-6H72.695C80.289 151.282 150.969 80.316 240 72.695V138a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6V72.695C360.718 80.289 431.685 150.969 439.305 240H374a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h65.305C431.711 360.718 361.031 431.684 272 439.305zM280 256c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z" class=""></path></svg>
        //                         <img src='${close}' class=${styles.close} />
        //                     </div>
        //                     <div class="${styles.closeWrapper}">
        //                         <img src='${close}' class=${styles.close} />
        //                     </div>
        //                 </div>`);
        //   } else if (orientation === "vertical") {
        //     $(`.${styles.Inspect}`).remove();
        //     $("body")
        //       .append(`<div class='${styles.Inspect} ${styles.inspect_vertical}' id="fixMe123123132">
        //                     <div class='${styles.background}'>
        //                         <svg class=${styles.icon} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="crosshairs" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-crosshairs fa-w-16 fa-3x"><path fill="currentColor" d="M506 240h-34.591C463.608 133.462 378.538 48.392 272 40.591V6a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v34.591C133.462 48.392 48.392 133.462 40.591 240H6a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h34.591C48.392 378.538 133.462 463.608 240 471.409V506a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6v-34.591C378.538 463.608 463.608 378.538 471.409 272H506a6 6 0 0 0 6-6v-20a6 6 0 0 0-6-6zM272 439.305V374a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v65.305C151.282 431.711 80.315 361.031 72.695 272H138a6 6 0 0 0 6-6v-20a6 6 0 0 0-6-6H72.695C80.289 151.282 150.969 80.316 240 72.695V138a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6V72.695C360.718 80.289 431.685 150.969 439.305 240H374a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h65.305C431.711 360.718 361.031 431.684 272 439.305zM280 256c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z" class=""></path></svg>
        //                         <img src='${close}' class=${styles.close} />
        //                     </div>
        //                     <div class="${styles.closeWrapper}">
        //                         <img src='${close}' class=${styles.close} />
        //                     </div>
        //                 </div>`);
        //   }
        //   $(`.${styles.Inspect}`).on("click", (e) => {
        //     const elm = e && e.target ? e.target : false;
        //     if ($("#fixMe123123132").find(elm).length && !this.isDetectMode) {
        //       this.toggleDetect(true);
        //     } else {
        //       this.toggleDetect(false);
        //     }
        //   });
        //   $(`.${styles.closeWrapper}`).click(this.closeInspect.bind(this));
        // } else {
        //   this.isDetectMode = false;
        // }
    }

    openInspect(event) {
        this.inspectVisible = true;

        // const isOpen = event && event.detail ? event.detail.isOpen : this.inspectVisible;
        const orientation =
            event && event.detail && event.detail.orientation ?
            event.detail.orientation :
            this.orientation;

        if (window.chrome && window.chrome.storage && window.chrome.storage.sync) {
            window.chrome.storage.sync.set({
                inspectPosition: {
                    visible: this.inspectVisible,
                    orientation: this.orientation,
                    lastClosedDate: this.lastClosedDate,
                },
            });
        }

        this.inspectPositionChanged(true, orientation);
    }

    closeInspect() {
        this.inspectVisible = false;
        this.lastClosedDate = new Date().getDate();

        if (
            variables.env === "chromeExtension" &&
            window.chrome &&
            window.chrome.storage &&
            window.chrome.storage.sync
        ) {
            window.chrome.storage.sync.set({
                inspectPosition: {
                    visible: this.inspectVisible,
                    orientation: this.orientation,
                    lastClosedDate: this.lastClosedDate,
                },
            });
        }
        // $(`.${styles.Inspect}`).remove();

        if (this.isDetectMode) {
            this.toggleDetect(false, false);
            this.isDetectMode = false;
            // window.chrome.runtime.sendMessage({to:'Inspect',openHover:false, sendEvent:false});
        }
    }

    toggleDetect(bool, sendEvent = true) {
        this.isDetectMode = bool !== undefined ? bool : !this.isDetectMode;
        if (this.isDetectMode) {
            GlobalStoreClass.toggleDetectBox(true);
            GlobalStoreClass.showHover(true);
        }
    }
}

decorate(InspectClass, {
    isDetectMode: observable,
    inspectVisible: observable,
    orientation: observable,
    toggleDetect: action,
    closeInspect: action,
});

export let InspectStoreClass = new InspectClass();
export default createContext(InspectStoreClass);