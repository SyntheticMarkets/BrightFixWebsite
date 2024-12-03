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
import {
    HistoryStoreClass
} from "./HistoryStore";
import {
    UserStoreClass
} from "./UserStore";
import {
    InspectStoreClass
} from "./InspectStore";
import {
    CommentsStoreClass
} from "./CommentsStore";
import {
    MeasuresStoreClass
} from "./MeasuresStore";
import {
    removeListener
} from "../components/CreateEditWrapper";
import {
    getFromUrl,
    trackEvent,
    api
} from "../components/utils";
import variables from "../variables";
import {
    TextAIStoreClass
} from "./TextAIStore";

class GlobalStore {
    isOpen = false;
    reactDetectionOpen = false;
    x = 20;
    y = 20;
    aiX = 0;
    aiY = 0;
    treeExpanded = []; //['position']
    isMinimize = false;
    shareOpen = false;
    summaryOpen = false;
    tab = "editor"; //'editor'//'Comments' // this is the 2 tooggle tabs in the editor section (editor/your changes)
    detectBoxPosition = "right";
    isTakingPrintScreen = 0; //if bigger then 0 it's mean we are taking a print screen
    showRemoveExtension = false;
    userHidExtension = true;
    modalOpen = "";
    hoverIsVisible = false;
    userHaveVSextension = true;
    openReactDetectAfterCloseCanvas = false;
    showPaymanyModal = false;
    showChatSupport = false;
    smallChatSize = true; //false;
    showProductTour = true;

    constructor() {
        this.toggleDetectBox = this.toggleDetectBox.bind(this);
        this.stopToChangeDragPosition = false; //stop to change the drag position after the user changed the drag position

        if (window.chrome && window.chrome.storage && window.chrome.storage.sync) {
            window.chrome.storage.sync.get("treeExpanded", (data) => {
                if (data && data.treeExpanded && data.treeExpanded.length) {
                    this.treeExpanded = data.treeExpanded;
                }
            });
        }

        this.saveParamInLocalStorage();
        $(window).resize(this.screenChanged.bind(this));
        this.detectIfExtensionIsHidden();

        $(document).keyup((e) => {
            if (e.key === "Escape" && this.reactDetectionOpen) {
                this.setReactDetectionOpen(false);
            }
        });

        this.loadControlBarPosition();
        this.checkOpenChatIframe();
    }

    setShowProductTour(bool) {
        this.showProductTour = bool;
        console.log("this.showProductTour", this.showProductTour);
        if (!bool) {
            localStorage.productTourFinished = true;
            trackEvent("Product tour finished");
        }
    }

    checkOpenChatIframe() {
        if (variables.env === "chromeExtension") {
            window.chrome.storage.sync.get("openChatIframe", (data) => {
                if (data && data.openChatIframe && data.openChatIframe.show) {
                    const smallSize = data.openChatIframe.smallSize;
                    this.toggleChat(true, smallSize);
                }
            });
        }
    }

    loadControlBarPosition() {
        if (variables.env === "chromeExtension") {
            window.chrome.storage.sync.get("controlBarPosition", (data) => {
                const position = data.controlBarPosition;
                if (position && position.day === new Date().getDate()) {
                    const aiX = position && position.x ? position.x : null;
                    const aiY = position && position.y ? position.y : null;
                    this.setControlBarPosition(aiX, aiY);
                }
            });
        }
    }

    setControlBarPosition(x, y) {
        if (window.innerHeight + y < 80) {
            y = 60 - window.innerHeight;
        }
        this.aiX = x;
        this.aiY = y;
        if (variables.env !== "web") {
            window.chrome.storage.sync.set({
                    controlBarPosition: {
                        day: new Date().getDate(),
                        x,
                        y
                    }
                },
                function(data) {}
            );
        }
    }
    setShowPaymentModal(bool) {
        this.showPaymanyModal = bool;
    }

    toggleChat(bool, smallSize = false) {
        this.showChatSupport = bool;
        this.smallChatSize = smallSize;

        if (variables.env !== "web") {
            window.chrome.storage.sync.set({
                openChatIframe: {
                    show: bool,
                    smallSize
                },
            });
        }
    }

    setUserHaveVSextension(bool) {
        this.userHaveVSextension = bool;
    }

    setModalOpen(modalName) {
        const url = window.location && window.location.toString();
        trackEvent(
            `${modalName ? "Open" : "Close"} modal - ${
        modalName ? modalName : this.modalOpen
      }`, {
                url
            }
        );
        this.modalOpen = modalName;
    }

    saveParamInLocalStorage() {
        let hasSource = getFromUrl("source");

        if (hasSource) {
            localStorage.source = hasSource;
        }
    }

    detectIfExtensionIsHidden() {
        if (window.chrome && window.chrome.storage && window.chrome.storage.sync) {
            window.chrome.storage.sync.get("isClosed", (response) => {
                let data =
                    response && response.isClosed ? response && response.isClosed : null;
                if (data) {
                    let kind = data.for;
                    let removedDate = data.date;
                    let now = new Date().getTime();

                    if (kind === "1 day") {
                        let returnDate = removedDate + 86400000 * 1;

                        if (returnDate < now) {
                            this.userHidExtension = true;
                        }
                    } else if (kind === "1 week") {
                        let returnDate = removedDate + 86400000 * 7;

                        if (returnDate < now) {
                            this.userHidExtension = true;
                        }
                    }
                    if (kind === "1 month") {
                        let returnDate = removedDate + 86400000 * 30;

                        if (returnDate < now) {
                            this.userHidExtension = true;
                        }
                    }
                } else {
                    this.userHidExtension = false;
                }
            });
        }
    }

    setShowRemoveExtension(bool) {
        this.showRemoveExtension = bool;
    }

    movePosition() {
        this.stopToChangeDragPosition = true;
        if (this.detectBoxPosition === "right") {
            this.detectBoxPosition = "left";
        } else {
            this.detectBoxPosition = "right";
        }
    }

    changeTakingPrintScreen(bool = true) {
        this.isTakingPrintScreen = bool;
    }

    screenChanged() {
        clearTimeout(this.changedTimeout);
        this.changedTimeout = setTimeout(() => {
            this.updateBoxPosition();
        }, 500);
    }

    stopDragPosition() {
        this.stopToChangeDragPosition = true;
    }

    changeTreeExpanded(newTreeExpanded) {
        this.treeExpanded = newTreeExpanded;

        if (
            variables.env !== "web" &&
            window.chrome &&
            window.chrome.storage &&
            window.chrome.storage.sync
        ) {
            window.chrome.storage.sync.set({
                    treeExpanded: newTreeExpanded
                },
                function(data) {}
            );
        }
    }

    changePosition(x, y) {
        if (!this.stopToChangeDragPosition) {
            this.x = x;
            this.y = y;
        }
    }

    updateBoxPosition() {
        let position =
            StyleStoreClass.elm && StyleStoreClass.elm.getBoundingClientRect() ?
            StyleStoreClass.elm.getBoundingClientRect() :
            {
                top: 0,
                left: 0
            };
        let bodyPosition = document.body.getBoundingClientRect() ?
            document.body.getBoundingClientRect() :
            {
                top: 0,
                left: 0
            };
        let left = position.left - bodyPosition.left;
        let x = window.innerWidth - 346;

        if (StyleStoreClass.elm) {
            if (
                left + StyleStoreClass.elm.offsetWidth > window.innerWidth - 346 &&
                left > 346
            ) {
                x = 10;
                if (!this.stopToChangeDragPosition) {
                    this.detectBoxPosition = "left";
                }
            } else if (
                left + StyleStoreClass.elm.offsetWidth < window.innerWidth - 346 &&
                left < 346
            ) {
                x = window.innerWidth - 346;
                if (!this.stopToChangeDragPosition) {
                    this.detectBoxPosition = "right";
                }
            }
        }

        this.changePosition(x, 10);
    }

    showHover(bool) {
        this.hoverIsVisible = bool;
    }

    toggleDetectBox(newValue) {
        this.showHover(newValue);
        this.isOpen = newValue !== undefined ? newValue : !this.isOpen;
        if (!this.isOpen) {
            CommentsStoreClass.deleteAllComments();

            MeasuresStoreClass.clear(); //remove all the rullers
            InspectStoreClass.toggleDetect(false); //remove the inspect box
            removeListener(); //remove the drag area

            $("#superDeveloper_detectArea111").remove();

            if (
                variables.env === "chromeExtension" &&
                window.chrome &&
                window.chrome.runtime &&
                window.chrome.runtime.sendMessage
            ) {
                window.chrome.runtime.sendMessage({
                    to: "Inspect",
                    openHover: false,
                    sendEvent: false,
                });
            }
        } else if (this.isOpen) {
            this.updateBoxPosition();
            HistoryStoreClass.getHistoriesFromServer();
            CommentsStoreClass.checkIfNeedToOpenOldComments();
        }
    }

    setIsMinimize(bool) {
        this.isMinimize = bool;
    }

    setTab(newTab, sendEvent = true) {
        this.tab = newTab;

        if (newTab === "summary") {
            this.summaryOpen = true;
        } else if (newTab === "editor") {
            this.summaryOpen = false;
        }

        if (newTab === "history") {
            HistoryStoreClass.updateTime();
        }
    }

    toggleShareOpen(bool, sendEvent = true) {
        if (bool && !UserStoreClass.session) {
            this.setTab("signup");
        }
        this.shareOpen = bool;
    }

    setReactDetectionOpen(bool, openAfterCloseCanvas = false) {
        if (bool !== undefined) {
            this.reactDetectionOpen = bool;
        } else {
            this.reactDetectionOpen = !this.reactDetectionOpen;
        }

        var event = new CustomEvent("setIsReactDetectOpen", {
            detail: {
                reactDetectionOpen: this.reactDetectionOpen,
                isAiHover: false
            },
        });
        document.dispatchEvent(event);

        if (openAfterCloseCanvas && !bool) {
            this.openReactDetectAfterCloseCanvas = true;
        } else {
            this.openReactDetectAfterCloseCanvas = false;
        }
    }
}

decorate(GlobalStore, {
    isOpen: observable,
    x: observable,
    y: observable,
    aiX: observable,
    aiY: observable,
    treeExpanded: observable,
    isMinimize: observable,
    tab: observable,
    shareOpen: observable,
    detectBoxPosition: observable,
    summaryOpen: observable,
    reactDetectionOpen: observable,
    isTakingPrintScreen: observable,
    hoverIsVisible: observable,
    showProductTour: observable,
    showRemoveExtension: observable,
    userHaveVSextension: observable,
    showPaymanyModal: observable,
    smallChatSize: observable,
    modalOpen: observable,
    showChatSupport: observable,
    setReactDetectionOpen: action,
    setTab: action,
    setIsMinimize: action,
    changeTreeExpanded: action,
    toggleDetectBox: action,
    stopDragPosition: action,
    toggleShareOpen: action,
    movePosition: action,
    setControlBarPosition: action,
    setShowRemoveExtension: action,
});

export let GlobalStoreClass = new GlobalStore();
export default createContext(GlobalStoreClass);