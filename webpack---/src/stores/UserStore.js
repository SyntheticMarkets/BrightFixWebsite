import {
    createContext
} from "react";
import {
    decorate,
    observable,
    action
} from "mobx";
import * as utils from "../components/utils";
import {
    CanvasStoreClass
} from "./CanvasStore";
import variables from "../variables";
import {
    PageDataStoreClass
} from "./PageDataStore";
import {
    GlobalStoreClass
} from "./GlobalStore";
import {
    TabsStoreClass
} from "./TabsStore";

class UserStore {
    email = "";
    session = "";
    distinctId = "";
    isSuperAdmin = false;
    userLoaded = false;
    isNewUser = false;
    streamFeatureEnabled = true;
    openExtensionByDefault = false;
    runQueries = 0; //the number of queries that the user already run
    limitQueries = 0; //the limit of queries that he can run without pay
    plan = "free";
    loadUserOnce = true;

    constructor() {
        setTimeout(() => {
            this.loadDistinctId();
        }, 10);
        this.loadUserData();

        if (variables.env === "chromeExtension") {
            window.chrome.runtime.sendMessage({
                    to: "background",
                    message: "isNewUser"
                },
                (res) => {
                    if (res) {
                        this.isNewUser = true;
                    }
                }
            );
        }

        if (typeof window.vscode !== "undefined") {
            this.listenToVsMessages();
        }

        if (variables.env === "chromeExtension") {
            window.chrome.runtime.onMessage.addListener(this.onMessage.bind(this));
        }

        this.listenToSignup();
    }

    listenToVsMessages() {
        window.addEventListener("message", (event) => {
            const data = event.data ? event.data : {};
            if (data.to === "UserStore") {
                if (data.type === "setCredentials") {
                    const session = data.session;
                    const email = data.email;

                    this.setUser(session, email);
                }
            }
        });
    }

    sendSessionToWebste = () => {
        if (variables.env === "chromeExtension") {
            window.chrome.storage.sync.get("session", async (sessionData) => {
                const mixpanelDistinctId =
                    sessionData && sessionData.session ? sessionData.session : null;

                window.postMessage({
                        type: "from_extension",
                        message: "return_session",
                        isLogin: this.session ? true : false,
                        mixpanelDistinctId,
                    },
                    "*"
                );
            });
        }
    };

    listenToSignup = () => {
        window.addEventListener("message", (event) => {
            if (
                event.source == window &&
                event.data.type &&
                event.data.type == "from_website"
            ) {
                if (event.data.message == "get_session") {
                    this.sendSessionToWebste();
                } else if (event.data.message == "login") {
                    const session = event.data.session;
                    const email = event.data.email;

                    UserStoreClass.setUser(session, email);
                }
            }
        });
    };

    getUserDetails = async () => {
        if (!this.session) {
            return;
        }
        try {
            const queries = await utils.api("userInfo/getUserDetails");

            if (!queries) {
                return;
            }

            if (queries.streamFeatureEnabled) {
                this.streamFeatureEnabled = queries.streamFeatureEnabled;
            }
            if (queries.limit) {
                this.limitQueries = queries.limit;
            }

            if (queries.open_extension_by_default !== undefined) {
                this.openExtensionByDefault = queries.open_extension_by_default;
                if (variables.env !== "web") {
                    await window.chrome.storage.sync.set({
                        lastJinnoPermission: {
                            day: new Date().getDate(),
                            openExtensionByDefault: this.openExtensionByDefault,
                        },
                    });
                }
            }

            if (queries.queries) {
                this.runQueries = queries.queries;
            }

            if (queries.plan) {
                this.plan = queries.plan;
            }
        } catch (e) {
            if (e.status === 401) {
                this.logout(false);
            }
        }
    };

    onMessage = (message) => {
        if (message.to !== "UserStore") {
            return;
        } else if (message.sendEvent == "logOut") {
            this.logout(false);
        } else if (message.sendEvent === "tryToLogin") {
            this.loadUserData();
        }
    };

    loadUserData() {
        if (variables.env === "web" && localStorage.email && localStorage.session) {
            //if the user login
            this.email = localStorage.email;
            this.session = localStorage.session;
            this.userLoaded = true;
            this.sendSessionToWebste();
        } else if (window.chrome && window.chrome.storage) {
            window.chrome.storage.sync.get("userProfile", (data) => {
                this.email =
                    data && data.userProfile && data.userProfile.email ?
                    data.userProfile.email :
                    "";

                this.session =
                    data && data.userProfile && data.userProfile.session ?
                    data.userProfile.session :
                    "";

                this.userLoaded = true;

                this.sendSessionToWebste();

                if (variables.env !== "web") {
                    window.chrome.runtime.sendMessage({
                        to: "background",
                        message: "setUser",
                        data: {
                            email: this.email,
                            updateAllTabs: false
                        },
                    });
                }
            });

            if (this.loadUserOnce) {
                this.loadUserOnce = false;
                PageDataStoreClass.checkOpenJinnoByDefault();
            }
        }

        if (
            variables.env === "web" &&
            window.chrome &&
            window.chrome.storage &&
            window.chrome.storage.sync
        ) {
            window.chrome.storage.sync.get("session", async function(data) {
                if (data && data.session && data.session.session) {
                    this.session = data.session.session;
                }
            });
        } else if (localStorage.session && variables.env !== "chromeExtension") {
            this.session = localStorage.session;
        }

        TabsStoreClass.startLoadTabs();
    }

    userLoadedTrigger() {
        //return after the userLoaded
        let interval;
        return new Promise((resolved) => {
            interval = setInterval(() => {
                if (this.userLoaded) {
                    resolved();
                    clearInterval(interval);
                }
            }, 100);
        });
    }

    setIsSuperAdmin(bool) {
        this.isSuperAdmin = bool;
    }

    async loadDistinctId() {
        if (variables.env !== "web") {
            const data = await window.chrome.storage.sync.get("session");

            const distinct_id = data && data.session ? data.session : null;
            this.distinctId = distinct_id;
        } else if (localStorage.distinctId) {
            this.distinctId = localStorage.distinctId;
        }
    }

    setUser(session, email) {
        if (!email || !session) {
            return;
        }

        if (variables.env === "web") {
            localStorage.email = email;
            localStorage.session = session;
        } else if (
            window.chrome &&
            window.chrome.storage &&
            window.chrome.storage.sync &&
            variables.env === "chromeExtension"
        ) {
            window.chrome.storage.sync.set({
                    userProfile: {
                        session,
                        email
                    }
                },
                function(data) {
                    window.chrome.runtime.sendMessage({
                        to: "background",
                        message: "setUser",
                        data: {
                            email,
                            updateAllTabs: true
                        },
                    });
                }
            );
        }
        this.email = email;
        this.session = session;

        this.sendSessionToWebste();

        this.getUserDetails();
    }

    logout(sendEvent = true) {
        if (variables.env === "web") {
            localStorage.email = "";
            localStorage.session = "";
        } else {
            window.chrome.storage.sync.set({
                    userProfile: {
                        session: "",
                        email: ""
                    }
                },
                function(data) {}
            );
        }

        CanvasStoreClass.setCanvasOpen(false);
        if (sendEvent) {
            utils.trackEvent("logout");
        }
        this.email = "";
        this.session = "";
    }
}

decorate(UserStore, {
    session: observable,
    email: observable,
    userLoaded: observable,
    isNewUser: observable,
    limitQueries: observable,
    plan: observable,
    streamFeatureEnabled: observable,
    runQueries: observable,
    setUser: action,
    logout: action,
});

export let UserStoreClass = new UserStore();
export default createContext(UserStoreClass);