import {
    createContext
} from "react";
import {
    decorate,
    observable
} from "mobx";
import {
    GlobalStoreClass
} from "./GlobalStore";
import {
    trackEvent
} from "../components/utils";
import {
    CanvasStoreClass
} from "./CanvasStore";
import {
    UserStoreClass
} from "./UserStore";
import variables from "../variables";

class PageDataStore {
    pageHaveReact;
    pageHaveDebugSource = false;
    constructor() {
        this.enableListener();
    }

    enableListener() {
        document.addEventListener("pageHaveReactCallback", async (e) => {
            if (e && e.detail && e.detail.pageData) {
                const pageData = e.detail.pageData;
                const url = window.location && window.location.toString();

                if (pageData.haveReact !== undefined) {
                    this.pageHaveReact = pageData.haveReact;
                }

                if (pageData.haveDebugSource !== undefined) {
                    if (pageData.haveDebugSource) {
                        trackEvent("Page load with debug source1", {
                            url
                        });
                    }
                    this.pageHaveDebugSource = pageData.haveDebugSource;
                }

                if (
                    this.pageHaveReact &&
                    !this.pageHaveDebugSource &&
                    window.location.href.toString().includes("localhost")
                ) {
                    if (document.querySelector('script[src*="/_next/"]')) {
                        trackEvent("Page load with localhost react and nextJS", {
                            url
                        });
                    } else {
                        trackEvent(
                            "Page load with localhost react and without debug source", {
                                url
                            }
                        );
                    }
                }

                await this.checkOpenJinnoByDefault(true);
            }
        });

        if (variables.env === "web") {
            setTimeout(() => {
                CanvasStoreClass.setShowControlBar(true);
            }, 100);
        }
    }

    async checkOpenJinnoByDefault() {
        setTimeout(async () => {
            let openJinno = await this.canOpenJinnoByDefault();
            if (!openJinno) {
                let openJinnoWithoutUserPermission = await this.canOpenJinnoByDefault(
                    true
                );

                if (openJinnoWithoutUserPermission) {
                    //check if the user have permission to open jinno by default
                    const data = await window.chrome.storage.sync.get(
                        "lastJinnoPermission"
                    );

                    if (!data ||
                        !data.lastJinnoPermission ||
                        data.lastJinnoPermission.day !== new Date().getDate()
                    ) {
                        try {
                            await UserStoreClass.getUserDetails();
                        } catch (e) {}
                    } else if (
                        data &&
                        data.lastJinnoPermission &&
                        data.lastJinnoPermission.openExtensionByDefault !== undefined
                    ) {
                        this.cacheOpenJinnoForThisUser =
                            data.lastJinnoPermission.openExtensionByDefault;
                    }
                    openJinno = await this.canOpenJinnoByDefault();
                }
            }

            if (openJinno && CanvasStoreClass.hideControlBarOnce !== true) {
                const url = window.location && window.location.toString();

                trackEvent("Jinno opened by default", {
                    url
                });
                CanvasStoreClass.setShowControlBar(true);
            }
        }, 200);
    }

    canUseJinnoAI() {
        return (
            this.pageHaveDebugSource &&
            this.pageHaveReact &&
            GlobalStoreClass.userHaveVSextension
        );
    }

    async canOpenJinnoByDefault(onlyForLogin = false, skipControlBar = false) {
        if (variables.env === "web") {
            return true;
        }
        const hideJinnoUntilSaved = await window.chrome.storage.sync.get(
            "hideJinnoUntil"
        );

        const openJinnoWithoutLogin = await window.chrome.storage.sync.get(
            "openJinnoWithoutLogin"
        );

        const openJinnoWithoutLoginResults =
            openJinnoWithoutLogin.openJinnoWithoutLogin &&
            openJinnoWithoutLogin.openJinnoWithoutLogin.open ?
            openJinnoWithoutLogin.openJinnoWithoutLogin.open :
            false;

        const hideJinnoUntil =
            hideJinnoUntilSaved &&
            hideJinnoUntilSaved.hideJinnoUntil &&
            hideJinnoUntilSaved.hideJinnoUntil.time ?
            hideJinnoUntilSaved.hideJinnoUntil.time :
            0;

        const openJinnoForThisUser =
            typeof UserStoreClass !== "undefined" &&
            UserStoreClass.email &&
            UserStoreClass.openExtensionByDefault;

        return (
            this.pageHaveDebugSource &&
            this.pageHaveReact &&
            (skipControlBar || !CanvasStoreClass.showControlBar) &&
            new Date().getTime() > hideJinnoUntil &&
            (onlyForLogin ||
                openJinnoForThisUser ||
                this.cacheOpenJinnoForThisUser ||
                openJinnoWithoutLoginResults)
        );
    }

    findReactOnPage() {
        if (this.pageHaveReact) {
            return;
        }

        var event = new CustomEvent("pageHaveReact", {
            detail: {},
        });
        document.dispatchEvent(event);
    }
}

decorate(PageDataStore, {
    pageHaveReact: observable,
    pageHaveDebugSource: observable,
});

export let PageDataStoreClass = new PageDataStore();
export default createContext(PageDataStoreClass);