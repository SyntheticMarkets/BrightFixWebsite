import {
    createContext
} from "react";
import {
    decorate,
    observable,
    action
} from "mobx";
import {
    getTimeDiff,
    getUtcTime,
    trackEvent
} from "../components/utils";
import shortid from "shortid";
import {
    api
} from "../components/utils";
import {
    UserStoreClass
} from "./UserStore";
import variables from "../variables";

class HistoryStore {
    histories = [];

    constructor() {
        this.historyId = shortid.generate();
        this.shareSession = shortid.generate();
        this.histories = [];
        this.shareMode = false; // if you are not the admin and someone has shared with you the changes
        if (variables.env === "chromeExtension" && false) {
            this.histories = [{
                    name: "google",
                    url: "https://www.google.com/",
                    comments: [{
                            title: "#hplogo",
                            visible: false,
                            open: false,
                            rules: [{
                                    key: "left",
                                    value: "-5px"
                                },
                                {
                                    key: "position",
                                    value: "relative"
                                },
                                {
                                    key: "top",
                                    value: "322px"
                                },
                            ],
                            messages: ["Please move it to be above the textarea"],
                            commentWrapper: {
                                top: "20px",
                                left: "100px",
                                height: "30px",
                                width: "60px",
                            },
                        },
                        {
                            title: "#SIvCob",
                            visible: false,
                            open: false,
                            rules: [{
                                    key: "left",
                                    value: "-5px"
                                },
                                {
                                    key: "font-weight",
                                    value: "700"
                                },
                                {
                                    key: "position",
                                    value: "relative"
                                },
                                {
                                    key: "top",
                                    value: "30px"
                                },
                            ],
                            messages: ["Please move it to be above the textarea"],
                            commentWrapper: {
                                left: "-4px",
                                top: "17px",
                                "font-weight": "700",
                            },
                        },
                    ],
                    id: 5,
                    createdDateNum: 1594293454640,
                    shareWith: ["mor@zloof.co.il", "agam@gmail.com"],
                },
                // {name:'google.com',url:'ynet.co.il',comments:[], id:6, createdDateNum:1594293454640, shareWith:['mor@zloof.co.il','agam@gmail.com']},
                // {name:'stackoverflow.com',url:'http://stackoverflow.com/',comments:[], id:7, createdDateNum:1594293454640, shareWith:['mor@zloof.co.il','agam@gmail.com']},
            ];
            this.updateTime();
        }

        this.getHistoriesFromServer();
        setTimeout(() => {
            // this.checkIfLoadComments()
        });
    }

    setHistory(data) {
        let historyAdmin =
            data && data[0] && data[0].admin ? data[0].admin : data.admin;
        if (historyAdmin !== UserStoreClass.email) {
            this.shareMode = true;
        } else {
            this.shareMode = false;
        }
    }

    async getHistoriesFromServer() {
        return;
    }

    openHistory(id) {
        let history = this.histories.find((item) => {
            return item.id === id;
        }); //check if the id exists
        if (!history) {
            return;
        }

        let url = history.url;

        if (url.includes("#")) {
            window.open(`${url}&FixMeId=${id}`, "_blank");
        } else {
            window.open(`${url}#FixMeId=${id}`, "_blank");
        }
    }

    checkIfNeedToRefreshHistories(historyId) {
        //if we don't find this history id get all the histories from the server
        let findHistory = this.histories.find((history) => {
            return history.id === historyId;
        });
        if (!findHistory) {
            this.getHistoriesFromServer();
        }
    }

    updateTime() {
        let now = getUtcTime();
        this.histories = this.histories.map((item) => {
            item.createdDate =
                typeof item.createdDateNum === "number" ?
                getTimeDiff(now, item.createdDateNum) :
                item.createdDateNum;

            return item;
        });

        if (this.histories && this.histories.length) {
            this.histories = this.histories.sort(function(x, y) {
                return y.createdDateNum - x.createdDateNum;
            });
        }
    }

    deleteHistory(id) {
        return;
        this.histories = this.histories.filter((history) => {
            return history.id !== id;
        });

        api("history/deleteHistory", {
            historyId: id
        });
    }

    share(email) {
        return;
        let data = {
            shareWith: email,
            historyId: this.historyId,
            fixMeDev: variables.env === "web",
        };

        api("history/shareHistory", data);
    }
}

decorate(HistoryStore, {
    historyId: observable,
    shareSession: observable,
    histories: observable,
    shareMode: observable,
    deleteHistory: action,
});

export let HistoryStoreClass = new HistoryStore();
export default createContext(HistoryStoreClass);