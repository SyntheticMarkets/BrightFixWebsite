import {
    createContext
} from "react";
import {
    decorate,
    observable,
    toJS
} from "mobx";
import {
    api
} from "../components/utils";
import {
    HoverStoreClass
} from "./HoverStore";
import {
    CodeStoreClass
} from "./CodeStore";
import {
    CanvasStoreClass
} from "./CanvasStore";
import variables from "../variables";
import {
    UserStoreClass
} from "./UserStore";
import {
    GlobalStoreClass
} from "./GlobalStore";

class TabsStore {
    tabs = [];
    isJinnoActive = true;
    editActiveTab = null;
    resetBackgroundTabsCache = true;
    startGetTabs = false;
    constructor() {
        document.addEventListener("jinno_getComponentCode", async (e) => {
            if (e.detail && e.detail) {
                const data = e.detail;

                try {
                    await api("set_component_code", data, "http://localhost:5463");
                } catch (e) {}
            }
        });
    }

    startLoadTabs() {
        if (!this.startGetTabs) {
            this.startGetTabs = true;
            setInterval(() => {
                if (CanvasStoreClass.showControlBar && !variables.isEditor) {
                    this.getTabs();
                }
            }, 500);
        }
    }

    async getTabs() {
        if (!this.isJinnoActive || !CanvasStoreClass.showControlBar) {
            return;
        }

        if (variables.env === "web") {
            try {
                const response = await fetch(
                    "http://localhost:5463/get_opened_tabs", {}
                );

                const data = await response.json();
                let tabsHasChanged = false;
                if (data && data.success && data.success.tabs) {
                    if (this.tabs.length !== data.success.tabs.length) {
                        tabsHasChanged = true;
                    }

                    this.tabs = data.success.tabs.map((tab, index) => {
                        if (!this.tabs ||
                            !this.tabs[index] ||
                            this.tabs[index].path != tab.filePath
                        ) {
                            tabsHasChanged = true;
                        }

                        if (tab.isActive && index !== this.editActiveTab) {
                            tabsHasChanged = true;
                            this.editActiveTab = index;
                        }

                        return {
                            id: index,
                            name: tab.label,
                            path: tab.filePath,
                            active: tab.isActive,
                        };
                    });

                    if (tabsHasChanged) {
                        this.setTabs();
                    }
                }
            } catch (e) {}
        } else {
            window.chrome.runtime.sendMessage({
                    to: "backgroundTabs",
                    resetBackgroundTabsCache: this.resetBackgroundTabsCache,
                    userCretendials: {
                        session: UserStoreClass.session,
                        distinctId: UserStoreClass.distinctId,
                        email: UserStoreClass.email,
                    },
                },
                (response) => {
                    if (response && response.tabsHasChanged) {
                        this.resetBackgroundTabsCache = false;
                        this.tabs = response.tabs;
                        this.setTabs();
                        GlobalStoreClass.setUserHaveVSextension(true);
                    } else if (response && response.error) {
                        GlobalStoreClass.setUserHaveVSextension(false);
                    }
                }
            );
        }
    }

    setTabs() {
        let event = new CustomEvent("jinno_setNewTabs", {
            detail: {
                tabs: toJS(this.tabs)
            },
        });
        document.dispatchEvent(event);
    }

    getTab(id) {
        let tab = this.tabs.find((tab) => tab.id === id);
        return tab ? tab : {};
    }

    getActiveTab() {
        let activeTab = this.getTab(this.activeTab);
        return activeTab ? activeTab : {};
    }

    setSelectedTab(id, scrollToElement = false) {
        if (id === this.activeTab) {
            return;
        }

        const tab = this.getTab(id);

        tab.active = true;
        HoverStoreClass.setIsHovering(true, true, "component");

        var event = new CustomEvent("xxxyyy_chooseTab", {
            detail: {
                tab: toJS(tab),
                scrollToElement,
            },
        });

        document.dispatchEvent(event);
    }

    setIsJinnoActive(bool) {
        this.isJinnoActive = bool;

        if (!this.isJinnoActive) {
            const event = new CustomEvent("xxxyyy_chooseTab", {
                detail: {
                    tab: {
                        id: "website"
                    },
                },
            });
            HoverStoreClass.setIsHovering(false);

            document.dispatchEvent(event);
        }
    }
}

decorate(TabsStore, {
    tabs: observable,
    activeTab: observable,
    isJinnoActive: observable,
});
export let TabsStoreClass = new TabsStore();
export default createContext(TabsStoreClass);

// tabs = [
//   {
//     id: "website",
//     name: "Your website",
//   },
//   {
//     id: 1,
//     name: "MiniStatistics.js",
//     path: "/Users/morzloof/Documents/React/horizon-ui-chakra/src/components/card/MiniStatistics.js",
//     active: true,
//   },
//   {
//     id: 2,
//     name: "TotalSpent.js",
//     path: "/Users/morzloof/Documents/React/horizon-ui-chakra/src/views/admin/default/components/TotalSpent.js",
//     active: false,
//   },
//   {
//     id: 3,
//     name: "CheckTable.js",
//     path: "/Users/morzloof/Documents/React/horizon-ui-chakra/src/views/admin/default/components/CheckTable.js",
//     active: false,
//   },
// ];