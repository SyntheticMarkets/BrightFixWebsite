import {
    decorate,
    observable,
    action
} from "mobx";
import {
    TextAIStoreClass
} from "./TextAIStore";
import $ from "jquery";
import {
    checkIfItsFixMeDiv,
    trackEvent
} from "../components/utils";
import {
    createContext
} from "react";
import {
    api,
    getPositionForModal
} from "../components/utils";
import {
    GlobalStoreClass
} from "./GlobalStore";
import {
    PageDataStoreClass
} from "./PageDataStore";
import variables from "../variables";
import {
    SearchStoreClass
} from "./SearchStore";

class HoverStore {
    isHovering = false;
    hoverType = ""; // magic/detectInVSCode/editor
    promptPosition = {};
    lastElement = "";

    constructor() {
        this.detectClickOnEscape();
        this.detectChooseElement();
        this.handlePageClick = this.clickOnPage.bind(this);

        document.addEventListener("findComponentSource", (e) => {
            if (variables.env !== "web") {
                window.chrome.runtime.sendMessage({
                        to: "FindComponentLocation",
                        type: "findSource",
                        useDebugger: e.detail.useDebugger,
                    },
                    (result) => {
                        let event = new CustomEvent("elementUrlFounded", {
                            detail: {
                                url: result.url
                            },
                        });
                        document.dispatchEvent(event);
                    }
                );
            }
        });
    }

    detectChooseElement() {
        document.addEventListener(
            "chooseElement",
            (e) => {
                const elementSource = e.detail ? e.detail.source : {};
                const className = e.detail ? e.detail.className : null;
                const componentProps = e.detail ? e.detail.componentProps : null;

                const dontRemoveConversation = e.detail ?
                    e.detail.dontRemoveConversation :
                    null;

                this.lastElement = document.getElementsByClassName(className) ?
                    document.getElementsByClassName(className)[0] :
                    null;

                if (!PageDataStoreClass.canUseJinnoAI() && !variables.isEditor) {
                    this.setIsHovering(false, true);
                    if (!GlobalStoreClass.userHaveVSextension) {
                        GlobalStoreClass.setModalOpen("installVScode");
                    } else {
                        GlobalStoreClass.setModalOpen("pageSupportModal");
                    }
                    return;
                }

                if (this.hoverType === "detectInVSCode") {
                    this.setIsHovering(false);
                    this.openInVSCode(elementSource, className);
                } else {
                    this.setIsHovering(false, false);
                    TextAIStoreClass.setElement(
                        className,
                        elementSource,
                        dontRemoveConversation
                    );
                }

                setTimeout(() => {
                    document.addEventListener("click", this.handlePageClick);
                }, 100);
            },
            false
        );
    }

    async openInVSCode(ElementSource, elementClassName) {
        clearTimeout(this.hidePromptTimeout);
        const elm = document.getElementsByClassName(elementClassName) ?
            document.getElementsByClassName(elementClassName)[0] :
            null;

        const position = getPositionForModal(elm, 290);
        this.promptPosition = {
            top: position && position.top,
            left: position && position.left,
        };

        this.hidePromptTimeout = setTimeout(() => {
            this.promptPosition = {
                top: 0,
                left: 0,
            };
        }, 4000);

        await api("navigate_to_code", ElementSource, "http://localhost:5463");
        trackEvent("Choose file to open in VS code");

        const filePath = ElementSource ? ElementSource.fileName : null;
        const vsCodeUri = `vscode://file/${filePath}`;
        if (filePath) {
            window.location.href = vsCodeUri;
        }
    }

    clickOnPage(e) {
        if (
            TextAIStoreClass.elementPosition &&
            TextAIStoreClass.elementPosition.top &&
            !checkIfItsFixMeDiv(e.target) &&
            document.contains(e.target)
        ) {
            if (e.target === this.lastElement) {
                return;
            }
            TextAIStoreClass.closeComment();

            this.setIsHovering(true, true);
        }
    }

    detectClickOnEscape() {
        $(document).keyup((e) => {
            if (!variables.isEditor &&
                e.key === "Escape" &&
                (HoverStoreClass.isHovering || TextAIStoreClass.elementPosition.top)
            ) {
                TextAIStoreClass.closeComment();
                this.setIsHovering(true, true);
                TextAIStoreClass.closeComment();
                HoverStoreClass.setIsHovering(false);
            }
        });
    }

    setIsHovering(bool, removeSelectedElement = true, type = "magic") {
        if (variables.isEditor) {
            type = "editor";
        }

        if (type !== "editor") {
            this.isHovering = bool;
        }
        this.hoverType = type;

        if (bool) {
            document.removeEventListener("click", this.handlePageClick);
            if (variables.env !== "web") {
                // window.chrome.runtime.sendMessage({
                //   to: "FindComponentLocation",
                //   type: "attachDebugger",
                // });
            }
        }

        var event = new CustomEvent("setIsReactDetectOpen", {
            detail: {
                reactDetectionOpen: bool,
                isAiHover: true,
                removeSelectedElement,
                type,
            },
        });
        document.dispatchEvent(event);

        if (bool) {
            TextAIStoreClass.setElement(null);
        }
    }
}
decorate(HoverStore, {
    isHovering: observable,
    promptPosition: observable,
    hoverType: observable,
    setIsHovering: action,
});

export let HoverStoreClass = new HoverStore();
export default createContext(HoverStoreClass);