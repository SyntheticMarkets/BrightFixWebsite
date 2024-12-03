import {
    createContext
} from "react";
import {
    decorate,
    observable,
    action,
    toJS
} from "mobx";
import {
    StyleStoreClass
} from "./StyleStore";
import $ from "jquery";
import cssPath from "css-path";
import * as utils from "../components/utils";
import {
    HistoryStoreClass
} from "./HistoryStore";
import shortid from "shortid";
import {
    GlobalStoreClass
} from "./GlobalStore";
import CreateEditWrapper from "../components/CreateEditWrapper.js";
// import PrintScreen from "../PrintScreen";
import variables from "../variables";

class CommentsStore {
    comments = [];
    emptyFromComments = true; // if there isn't any comments
    hideAll = false;
    saveImagesStatus = {
        status: "notWorking",
        saved: 0,
        needToSave: 0
    }; //the status of the save
    oldComments = [];
    undoArray = [];
    beforeAddingToUndo = [];

    constructor() {
        // this.historyId = shortid.generate()

        if (variables.env === "web") {
            this.comments = [];
        }

        setTimeout(() => {
            this.findPositionOfComments();
        }, 1);

        // document.addEventListener('keydown', (event) =>{
        //   if ((event.ctrlKey || event.metaKey) && event.key === 'z' && GlobalStoreClass.isOpen) {
        //     this.undo()
        //   }
        // });
    }

    undo() {
        if (this.undoArray.length && this.undoArray[this.undoArray.length - 1]) {
            this.undoArray[this.undoArray.length - 1].forEach((item) => {
                let from = item.from;
                let key = item.key;
                let commentId = item.commentId;

                this.updateCode(key, from, null, commentId);
            });

            this.undoArray.pop();
            StyleStoreClass.setElement(StyleStoreClass.elm, "");
        }
    }

    findComment(element, commentId) {
        if (!element && !element !== "none" && !commentId && commentId !== "none") {
            return false;
        }

        if (element && element.getAttribute("fixMeCommentId")) {
            //try to find with the commentId
            commentId = element.getAttribute("fixMeCommentId");
            let find = this.comments.find((comment) => {
                return comment.id === commentId;
            });

            if (find) {
                return find;
            }
        } else if (element) {
            let title = this.getSelector(element); //try to find with the title

            let find = this.comments.find((comment) => {
                return comment.title === title;
            });

            return find;
        } else if (commentId) {
            let find = this.comments.find((comment) => {
                return comment.id === commentId;
            });

            return find;
        }

        return false;
    }

    checkIfNeedToOpenOldComments() {
        if (this.oldComments && this.oldComments.length) {
            this.comments = this.oldComments;

            this.updateStyles(this.comments);
        }
    }

    updateElementId(elm, commentId) {
        if (!commentId || !elm) {
            return;
        }

        if (elm.getAttribute("fixMeCommentId") !== undefined) {
            elm.setAttribute("fixMeCommentId", commentId);
        }
    }

    async checkIfLoadComments() {
        let historyId = utils.getHashValue("FixMeId"); // check if there is something on the url
        let shareSession = utils.getHashValue("shareSession"); // check if there is something on the url

        if (!historyId && !shareSession) {
            return;
        }

        // if (!UserStoreClass.session) {
        //   //if the user is not login ask him to signup
        //   // GlobalStoreClass.toggleDetectBox(true); //open the detect box
        //   GlobalStoreClass.setTab("summary", false);
        //       // return;
        // }

        let data = await this.getCommentsFromServer(historyId, shareSession); //check if the id exists

        if (!data && (!shareSession || shareSession === "null")) {
            //the user don't have permission for this historyId
            window.location.hash = ""; //remove the hash
            return;
        }
        if (!data) {
            return;
        }

        let comments = data.commentsData;
        let history = data.historyData;

        if (!comments || !data.commentsData) {
            return;
        }

        HistoryStoreClass.historyId = historyId;
        if (
            data &&
            data.historyData &&
            data.historyData[0] &&
            data.historyData[0].shareSession
        ) {
            HistoryStoreClass.shareSession = data.historyData[0].shareSession;
        }

        this.comments = comments;
        this.emptyFromComments = false;

        if (variables.env === "chromeExtension") {
            window.chrome.runtime.sendMessage({
                to: "Inspect",
                openHover: true,
                sendEvent: false,
            });
        }
        GlobalStoreClass.toggleDetectBox(true); //open the detect box
        HistoryStoreClass.setHistory(history); //update the history store
        // GlobalStoreClass.setTab("Comments", false); //move to the comments tab

        GlobalStoreClass.setTab("summary", false);
        this.updateStyles(comments);
    }

    async saveAllComments() {
        for (let i = 0; i < this.comments.length; i++) {
            let comment = this.comments[i];
            await this.setComment(HistoryStoreClass.historyId, comment);
        }
    }

    setComment(historyId, comment) {
        return;
        //todo check from where the id come from
        //decide how to do the comment id
        let url = window.location.origin;
        let sendComment = { ...comment
        };
        delete sendComment.beforeImage;
        delete sendComment.afterImage;

        let data = {
            name: url.replace("https://", "").replace("http://", ""),
            historyId: historyId,
            commentId: sendComment.id,
            shareSession: HistoryStoreClass.shareSession,
            comment: JSON.stringify(sendComment),
            url: url,
            createdDateNum: utils.getUtcTime(),
        };

        clearTimeout(this.saveTimeout);
        return new Promise((resolved) => {
            this.saveTimeout = setTimeout(async () => {
                await utils.api("history/setComment", data, "");

                HistoryStoreClass.checkIfNeedToRefreshHistories(historyId);
                HistoryStoreClass.updateTime();

                resolved();
            }, 700);
        });
    }

    deleteComment(historyId, commentId, shareSession) {
        return;
        let data = {
            historyId: historyId,
            historyCommentId: commentId,
            shareSession,
        };

        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(async () => {
            await utils.api("history/deleteHistoryComments", data, "");
        }, 700);
    }

    updateStyles(comments) {
        if (!comments) {
            return;
        }

        comments.forEach((comment) => {
            if (!comment || !comment.title) {
                return;
            }

            let title = comment.title;
            if (title && comment.rules) {
                comment.rules.forEach((item) => {
                    $(title).css(item.key, item.value);
                });
            }
        });

        this.findPositionOfComments();
    }

    async getCommentsFromServer(historyId, shareSession) {
        return;
        try {
            let data = await utils.api("history/getHistory", {
                id: historyId,
                shareSession,
            });

            if (!data || !data.commentsData) {
                return [];
            }

            data.commentsData = data.commentsData.map((item) => {
                try {
                    let comment = JSON.parse(item.comment);
                    comment.afterImage = JSON.parse(item.afterImage);
                    comment.beforeImage = JSON.parse(item.beforeImage);

                    return comment;
                } catch (e) {
                    console.error("error while parsing a comment");
                    return {};
                }
            });

            return data;
        } catch (e) {}
    }

    deleteAllComments() {
        if (this.comments.length) {
            this.oldComments = toJS(this.comments);

            this.comments.forEach((comment) => {
                this.delete(comment.id, true);
            });
        }
    }

    delete(commentId, onlyClientSide = false) {
        let comment = this.findComment(null, commentId);
        let title = comment.title;

        if (comment && !onlyClientSide) {
            this.deleteComment(
                HistoryStoreClass.historyId,
                comment.id,
                HistoryStoreClass.shareSession
            );
        }

        if (comment.rules) {
            comment.rules.forEach((rule) => {
                $(comment.title).css(rule.key, "");
            });
        }

        this.comments = this.comments.filter((comment) => {
            return comment.title !== title;
        });

        CreateEditWrapper(StyleStoreClass.elm);
    }
    changeVisible(title, bool) {
        this.comments = this.comments.map((item) => {
            if (item.title === title) {
                item.visible = bool;
            }
            return item;
        });
    }

    setOpen(title, newOpen, changeVisible = true) {
        this.comments = this.comments.map((item) => {
            if (title === item.title) {
                item.open = newOpen;
                item.userClickedOnClosed = !newOpen;

                if (changeVisible) {
                    item.visible = newOpen;
                }
            }

            return item;
        });
    }

    startComment() {
        let title = this.getSelector();

        this.comments = this.comments.filter((oldComments) => {
            if (
                oldComments.title !== title &&
                (!oldComments.messages ||
                    (oldComments.messages.length === 1 &&
                        oldComments.messages[0] === "")) &&
                (!oldComments.rules || oldComments.rules.length === 0)
            ) {
                return false;
            }

            return true;
        });

        let find = this.findComment(StyleStoreClass.elm);

        if (!find) {
            let commentId = shortid.generate();

            this.updateElementId(StyleStoreClass.elm, commentId);
            this.comments.push({
                title,
                id: commentId,
                elm: StyleStoreClass.elm
            });
        }

        // PrintScreen(StyleStoreClass.elm);
        this.findPositionOfComments();
    }

    findPositionOfComments() {
        this.comments = this.comments.map((item) => {
            if (!item || !item.title) {
                return {};
            }
            let elm = $(item.title);

            if (elm && elm[0]) {
                let position = utils.getPosition(elm[0]);

                item.top = parseInt(position.top) + "px";
                item.left = parseInt(position.left) + parseInt(position.width) + "px";
                item.position = position.position;

                let openToLeft = false;
                let openToBottom = false;
                if (
                    parseInt(item.left) + 254 >
                    window.innerWidth -
                    (GlobalStoreClass.detectBoxPosition === "right" ? 360 : 0)
                ) {
                    //if there is no space at the right
                    openToLeft = true;
                    item.left = parseInt(position.left) - 254;

                    if (parseInt(item.left) < 254) {
                        //if there is also no space at the left
                        openToLeft = false;
                        item.left = position.left;

                        if (
                            parseInt(position.top) + parseInt(position.height) + 200 <
                            window.innerHeight
                        ) {
                            //if there is space at the bottom
                            item.top =
                                parseInt(position.top) + parseInt(position.height) + "px"; //put the icon at the bottom
                        } else {
                            //if there is enough space at the top
                            item.top = parseInt(position.top) - 20 + "px"; //put the icon at the bottom
                            openToBottom = true;
                        }
                    }
                }

                item.open =
                    false &&
                    elm[0] === StyleStoreClass.elm /*&& !item.userClickedOnClosed*/ ?
                    true :
                    false;
                // alert(elm[0] === StyleStoreClass.elm)
                item.commentWrapper = {
                    height: parseInt(position.height) + "px",
                    width: parseInt(position.width) + "px",
                    top: parseInt(position.top) + "px",
                    left: parseInt(position.left) + "px",
                    position: position.position,
                    display: elm[0] === StyleStoreClass.elm ? "none" : "block",
                    openToLeft,
                    openToBottom,
                };
            }

            return item;
        });
    }

    getSelector(elm) {
        let element = elm ? elm : StyleStoreClass.elm;
        //try to find one selector that he is in one place in the page
        if (!element) {
            console.error("element is not selected");
            return "";
        }

        let id = element.id;
        let classList = element.classList;

        if (id) {
            //if there is an id take him
            return `#${id}`;
        } else if (classList) {
            //if there is a className check if he is the only className in the page
            for (let i = 0; i < element.classList.length; i++) {
                let className = element.classList[i];

                if (
                    $(`.${className}`).length === 1 &&
                    className !== "removeAttributes11"
                ) {
                    //if this classname exsits only on one child use him
                    return `.${className}`; //if it's the only className this will be the path
                }
            }
        }

        // if (classList){
        //   for (let i = 0; i < element.classList.length; i++) {
        //     let className = element.classList[i];

        //     if (className !== "removeAttributes11") {//find better path of elements
        //       let numOfElements = $(`.${className}`).length
        //       for (let g = 0; g < numOfElements; g++) {
        //         let tryToFind = $(`.${className}:nth-child(${g})`)

        //         if(tryToFind.length===1 && tryToFind[0]===element){
        //           return `.${className}:nth-child(${g})`
        //         }
        //       }
        //       //if this classname exsits only on one child use him
        //       // return `.${className}`; //if it's the only className this will be the path
        //     }
        //   }
        // }

        return cssPath(element).replace(".removeAttributes11", ""); //if we didn't found anything
    }

    setHideAll(bool) {
        this.hideAll = bool;
    }

    changeComment(title, newMessage) {
        // let comment;
        this.emptyFromComments = false;
        this.comments = this.comments.map((item) => {
            if (title === item.title) {
                item.messages = [newMessage];
                // comment = item;

                if (item.beforeImage && !item.afterImage && newMessage) {
                    item.afterImage = item.beforeImage;
                }
            }

            return item;
        });

        // if (comment) {
        //   this.setComment(HistoryStoreClass.historyId, toJS(comment));
        // }
    }

    checkIfBeforeImageExists(element) {
        let commentId = element.getAttribute("fixMeCommentId");
        let title = this.getSelector(element);
        let find = this.comments.find((comment) => {
            if (commentId) {
                return comment.id === commentId && comment.beforeImage;
            }
            return comment.title === title && comment.beforeImage;
        });

        return find;
    }

    updateImage(element, base64, before = true, fromRight, fromLeft, fromTop) {
        // let title = this.getSelector(element);

        // let find = this.comments.find((comment) => {
        //   return comment.title === title;
        // });
        let find = this.findComment(element);
        if (!find) {
            return;
        }

        let data = {
            canvas: base64,
            fromRight,
            fromLeft,
            fromTop,
            saved: false
        };

        if (before) {
            find.beforeImage = data;
        } else {
            find.afterImage = data;
        }
    }

    async saveAllImagesInServer() {
        return;
        this.saveImagesStatus = {
            status: "loading",
            saved: 0,
            needToSave: this.comments.length,
        };

        for (let i = 0; i < this.comments.length; i++) {
            let comment = this.comments[i];

            let promiseArray = [];

            if (
                comment &&
                comment.beforeImage &&
                typeof comment.beforeImage === "object"
            ) {
                let beforeImage = comment.beforeImage;

                beforeImage.commentId = comment.id;
                beforeImage.beforeImage = true;
                if (beforeImage.saved === false && beforeImage.canvas) {
                    beforeImage.saved = true;
                    promiseArray.push(
                        new Promise((resolved) => {
                            return resolved(utils.api("history/setImage", beforeImage, ""));
                        })
                    );
                }
            }

            if (
                comment &&
                comment.afterImage &&
                typeof comment.afterImage === "object"
            ) {
                let afterImage = comment.afterImage;

                afterImage.commentId = comment.id;
                afterImage.beforeImage = false;

                if (afterImage.saved === false && afterImage.canvas) {
                    afterImage.saved = true;
                    promiseArray.push(
                        new Promise((resolved) => {
                            return resolved(utils.api("history/setImage", afterImage, ""));
                        })
                    );
                }
            }

            await Promise.all(promiseArray);

            this.saveImagesStatus = {
                status: "loading",
                saved: i + 1,
                needToSave: this.comments.length,
            };
        }

        this.saveImagesStatus = {
            status: "complete",
            saved: this.comments.length,
            needToSave: this.comments.length,
        };
    }

    removeRuleFromComment(key, commentId) {
        this.comments.forEach((item) => {
            if (item.id === commentId) {
                item.rules = item.rules.filter((rules) => {
                    return rules.key !== key;
                });
            }
        });
    }

    updateCode(key, value, startValue, changeCommentId) {
        if (!StyleStoreClass.elm) {
            return;
        }

        this.emptyFromComments = false;
        let beforeValue =
            startValue !== undefined ?
            startValue :
            window.getComputedStyle(StyleStoreClass.elm)[key];
        beforeValue =
            typeof beforeValue === "number" ? beforeValue + "px" : beforeValue;

        let commentId;

        let titleExists = this.findComment(!changeCommentId ? StyleStoreClass.elm : null,
            changeCommentId
        );

        let title = this.getSelector();
        if (changeCommentId) {
            title = titleExists.title;
        }

        // let titleExists = this.comments.find((item) => {
        //   return item.title === title;
        // }); //if the title is already exists

        if (key.includes("shadow")) {
            let distanceTop;
            let distanceLeft;
            let blur;
            StyleStoreClass.shadowData.forEach((item) => {
                if (item.type === "section") {
                    item.items.forEach((innerItem) => {
                        if (innerItem.id === "shadow-distance-top") {
                            distanceTop = innerItem;
                        } else if (innerItem.id === "shadow-distance-left") {
                            distanceLeft = innerItem;
                        } else if (innerItem.id === "shadow-blur") {
                            blur = innerItem;
                        }
                    });
                }
            });
            distanceTop.value = !distanceTop.value ? 2 : distanceTop.value;
            distanceTop = `${distanceTop.value}${distanceTop.kind}`;

            distanceLeft.value = !distanceLeft.value ? 2 : distanceLeft.value;
            distanceLeft = `${distanceLeft.value}${distanceLeft.kind}`;

            blur.value = !blur.value ? 6 : blur.value;
            blur = `${blur.value}${blur.kind}`;

            let size = StyleStoreClass.shadowData.find((item) => {
                return item.id === "shadow-size";
            });
            size.value = !size.value ? 4 : size.value;
            size = `${size.value}${size.kind}`;

            let color = StyleStoreClass.shadowData.find((item) => {
                return item.id === "shadow-color";
            });
            color.value = !color.value ? "rgb(230,230,230)" : color.value;
            color = color.value;

            key = "box-shadow";
            value = `${distanceLeft} ${distanceTop} ${blur} ${size} ${color}`;
        }

        if (titleExists) {
            commentId = titleExists.id;
            if (!titleExists.rules) {
                titleExists.rules = [];
            }
            if (!titleExists.beforeRules) {
                titleExists.beforeRules = [];
            }

            let keyExists = titleExists.rules.find((item) => {
                return item.key === key;
            });

            if (keyExists) {
                //if the key is already exists
                let findBeforeRule =
                    titleExists.beforeRules &&
                    titleExists.beforeRules.find((item) => {
                        return item.key === key;
                    });

                if (findBeforeRule && findBeforeRule.value === value) {
                    this.removeRuleFromComment(key, commentId);
                } else {
                    keyExists.value = value;
                }
            } else {
                // let beforeValue = startValue !== undefined ? startValue : window.getComputedStyle(StyleStoreClass.elm)[key]
                titleExists.rules.push({
                    key,
                    value
                });
                titleExists.beforeRules.push({
                    key,
                    value: beforeValue
                });
            }

            // this.setComment(HistoryStoreClass.historyId, titleExists);
        } else {
            // let beforeValue = startValue  !== undefined ? startValue : window.getComputedStyle(StyleStoreClass.elm)[key]

            commentId = shortid.generate();
            this.comments.push({
                title: title,
                rules: [{
                    key,
                    value
                }],
                beforeRules: [{
                    key,
                    value: beforeValue
                }],
                path: cssPath(StyleStoreClass.elm),
                open: false,
                id: commentId,
            });
            this.updateElementId(StyleStoreClass.elm, commentId);
        }

        if (!changeCommentId) {
            this.pushToUndo(key, beforeValue, value, commentId);
            StyleStoreClass.elm.style[key] = value;
        } else {
            $(title)[0].style[key] = value;
        }

        this.findPositionOfComments();

        clearTimeout(this.elementChanged);
        // PrintScreen(StyleStoreClass.elm, false);
    }

    pushToUndo(key, from, to, commentId) {
        let json = {
            key,
            from,
            to,
            commentId
        };
        this.beforeAddingToUndo.push(json);

        clearTimeout(this.addToUndoTimeout);
        this.addToUndoTimeout = setTimeout(() => {
            let itemChanged = {};

            this.beforeAddingToUndo = this.beforeAddingToUndo.filter((item) => {
                if (!itemChanged[item.key]) {
                    itemChanged[item.key] = true;
                    return true;
                } else {
                    return false;
                }
            });
            this.undoArray.push(this.beforeAddingToUndo);
            this.beforeAddingToUndo = [];
        }, 500);
    }
}

decorate(CommentsStore, {
    emptyFromComments: observable,
    comments: observable,
    hideAll: observable,
    saveImagesStatus: observable,
    setOpen: action,
    changeVisible: action,
    updateCode: action,
    changeComment: action,
    delete: action,
    updateImage: action,
});

export let CommentsStoreClass = new CommentsStore();
export default createContext(CommentsStoreClass);

// $(document).ready(function () {
//   CommentsStoreClass.updateStyles(CommentsStoreClass.comments);
// });