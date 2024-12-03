import {
    createContext
} from "react";
import {
    decorate,
    observable,
    action
} from "mobx";
import {
    api,
    getEnv,
    getPositionForModal,
    getPosition,
    trackEvent,
    calculateDistance,
} from "../components/utils";
import {
    GlobalStoreClass
} from "./GlobalStore";
import {
    UserStoreClass
} from "./UserStore";
import {
    PageDataStoreClass
} from "./PageDataStore";
import {
    HoverStoreClass
} from "./HoverStore";
import {
    CanvasStoreClass
} from "./CanvasStore";
import MessageStore from "./MessageStore";
import shortid from "shortid";
import variables from "../variables";
import {
    startStream,
    buildStreaming
} from "../components/utils";
import {
    CodeStoreClass
} from "./CodeStore";

class TextAIStore {
    inputValue = "";
    loading = false;
    element = null;
    reactCode = null;
    elementSource = {};
    elementClassName = "";
    listenToErrors = false;
    weHadAnError = false; //if we have detect an error after 1.5 seconds after we updated the code
    elementPosition = {};
    token = "";
    showCodeDiffID = null;
    conversation = [];
    sessionTask = "";
    streamUpdates = 0;

    constructor() {
        const env = getEnv();
        this.isMock = env === "development" && false ? true : false;
        if (variables.env === "chromeExtension") {
            window.chrome.runtime.onMessage.addListener(this.onMessage.bind(this));
        }
        document.addEventListener("updateStreamResults", (event) => {
            this.onMessage(event.detail);
        });
        this.listenToErrorsEvents();

        document.addEventListener("injectedCodeLoaded", async (e) => {
            setTimeout(() => {
                this.loadPreviousConversations();
            }, 50);
        });

        // setTimeout(() => {
        //   if (env === "development") {
        //     this.createDefaultConverstaionForTesting();
        //   }
        // }, 50);
    }

    startStreamResults() {
        const session = this.sessionTask;
        const taskId = this.taskId;

        if (session && taskId) {
            if (variables.env === "chromeExtension") {
                this.startStream = true;
                window.chrome.runtime.sendMessage({
                        to: "background",
                        message: "startStreamResults",
                        userLoginSession: UserStoreClass.session,
                        taskId,
                        session,
                        useLocalServer: localStorage.useLocalhost,
                        isMock: this.isMock,
                    },
                    (res) => {}
                );
            } else {
                startStream(UserStoreClass.session, session, taskId, this.isMock);
            }
        }
    }

    loadPreviousConversations() {
        if (!GlobalStoreClass.userHaveVSextension ||
            this.loadConversationsOnlyOnce
        ) {
            return;
        }
        this.loadConversationsOnlyOnce = true;
        let data = {};
        try {
            data = localStorage.saveLastModification ?
                JSON.parse(localStorage.saveLastModification) :
                {};
        } catch (e) {}

        const saveLastModification = data && data.date ? data.date : null;

        const timeDifferent = (new Date().getTime() - saveLastModification) / 1000;

        if (
            timeDifferent < 3 &&
            data &&
            data.previousConversation &&
            data.previousConversation.conversationStringify
        ) {
            CanvasStoreClass.setShowControlBar(true);

            const oldClassName = data.className;
            const position = JSON.parse(data.position);

            this.taskId = data.taskId;
            this.sessionTask = data.sessionTask;

            this.conversation = data.previousConversation.conversationStringify.map(
                (item) => {
                    try {
                        const itemJson = JSON.parse(item);
                        return new MessageStore(
                            itemJson.from,
                            itemJson.text,
                            itemJson.properties
                        );
                    } catch (e) {
                        console.error(`We wasn't able to parsed one of the messages`);
                        return {};
                    }
                }
            );

            this.startListenToErrors();
            const findElement = this.findOldElementPosition(oldClassName, position);
            if (!findElement) {
                this.elementPosition = {
                    top: "20px",
                    right: "0px",
                };
                trackEvent(`Failed to load old conversation - element wasnt found`);
            }
        }
    }

    findOldElementPosition(selector, position) {
        if (!selector) {
            return;
        }
        const elements = document.querySelectorAll(selector);

        let closestElement = null;
        let closestDistance = Infinity;
        if (!elements || !elements.length) {
            return false;
        }
        elements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const elementPosition = {
                height: rect.height,
                left: rect.left,
                top: rect.top,
                width: rect.width,
            };

            const distance = calculateDistance(position, elementPosition);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestElement = element;
            }
        });
        closestElement.classList.add("findMeJinno1000");

        let event = new CustomEvent("chooseElementForReact", {
            detail: {
                selector: ".findMeJinno1000"
            },
        });
        document.dispatchEvent(event);

        return closestElement;
    }

    createDefaultConverstaionForTesting() {
        if (getEnv() !== "development") {
            return;
        }
        const message = new MessageStore("CodeDiff", "", {
            componentName: "DashboardHeaderCard.js",
            oldCode: `
    const a = 10
    const b = 10
    const c = () => console.log('foo')

    if(a > 10) {
      console.log('bar')
    }

    console.log('done')
    `,
            newCode: `const a = 10
    const boo = 10

    if(a === 10) {
      console.log('bar')
    }`,
            loading: true,
            percentage: 80,
        });

        const message1 = new MessageStore("user", "Text text text", {
            loading: true,
        });

        this.sessionTask = "Jr9XKHqI3";
        this.taskId = "1";
        this.conversation = [message, message1];

        let counter = 80;
        setInterval(() => {
            counter++;
            message.setProgressBar(counter);
        }, 1000);

        this.elementPosition = {
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
        };
    }

    hideCodeDiff() {
        this.showCodeDiffID = null;
    }

    setShowCodeDiff(message_id) {
        this.showCodeDiffID = message_id;
    }

    getMessage(messageId) {
        const message = this.conversation.find(
            (message) => message.uuid === messageId
        );
        return message ? message : {};
    }

    listenToErrorsEvents() {
        document.addEventListener(
            "raisedError",
            (e) => {
                if (this.listenToErrors) {
                    this.weHadAnError = true;
                }
            },
            false
        );
    }

    onMessage = (data, sender, sendResponse) => {
        if (data.to !== "TextAI") {
            return;
        } else if (data.sendEvent == "codeChanged") {
            this.reactCode = data.newCode.code;
        } else if (data.sendEvent === "updateMessageText") {
            const builtData = buildStreaming(data);

            this.updateMessageText(builtData);
        }
    };

    updateMessageText(data) {
        if (!this.taskId) {
            return;
        }
        const planMessage = this.conversation.find((message) => {
            const properties = message.properties;
            return (
                properties.taskId == this.taskId &&
                properties.session === this.sessionTask
            );
        });
        if (data.sessionTask !== this.sessionTask || data.taskId !== this.taskId) {
            return;
        }
        this.streamUpdates += 1;

        const currentFilePath = this.elementSource ?
            this.elementSource.fileName :
            "";

        if (this.lastFilePath != currentFilePath) {
            trackEvent(`AI - element has been changed`, {
                token: this.token,
                chat_id: this.chat_id,
                sessionTask: this.sessionTask,
                taskId: this.taskId,
            });
            return;
        }

        this.updatePlanText(data, planMessage);
        this.updateCodeText(data);
        this.updateError(data);
    }

    updateError(data) {
        if (data.errorString) {
            clearTimeout(this.errorTimeout);
            this.errorTimeout = setTimeout(() => {
                alert(data.errorString);
                trackEvent(`AI failed - server error`, {
                    taskId: this.taskId,
                    sessionTask: this.sessionTask,
                });
            }, 1000);
        }
    }

    updateCodeText(data) {
        const codeMessage = this.conversation.find((message) => {
            const properties = message.properties;
            return (
                properties.taskId == this.taskId &&
                properties.session === this.sessionTask &&
                message.from === "CodeDiff"
            );
        });

        const newCode = data.codeString;
        if (codeMessage) {
            codeMessage.setNewCode(newCode);
        }
        try {
            if (this.afterTimePassed) {
                this.afterTimePassed = false;

                const oldCode = codeMessage.properties ?
                    codeMessage.properties.oldCode :
                    false;

                const pecentage = Math.floor((newCode.length / oldCode.length) * 100);

                if (pecentage < 95) {
                    codeMessage.setProgressBar(pecentage);
                }
                setTimeout(() => {
                    this.afterTimePassed = true;
                });
            }
        } catch (e) {}

        if (data.codeDone && !codeMessage.strimFinished) {
            codeMessage.setStrimFinished(true);
            codeMessage.showRevetCodeButton();

            if (this.codeDifMessage) {
                this.codeDifMessage.stopLoading();
            }
            this.setPreviouseCode();
            this.setLoading(false);
            api(
                "edit_file", {
                    source: this.elementSource,
                    newCode
                },
                "http://localhost:5463"
            );

            trackEvent(`AI - update code finished`, {
                taskId: this.taskId,
                sessionTask: this.sessionTask,
            });
            this.startListenToErrors();
        }
    }

    updatePlanText(data, message) {
        if (message) {
            const newPlan = data.planString;
            message.setText(newPlan);
        }

        if (data.planDone && !message.strimFinished) {
            this.afterTimePassed = true;
            message.setStrimFinished(true);
            const propertiesForMessages = {
                oldCode: message.properties.oldCode,
                newCode: "",
                componentName: message.properties.componentName,
                token: this.token,
                source: this.elementSource,
                taskId: this.taskId,
                session: this.sessionTask,
                percentage: 0,
                loading: true,
            };

            this.codeDifMessage = TextAIStoreClass.addMessage(
                "",
                "CodeDiff",
                propertiesForMessages
            );

            trackEvent(`AI - update plan finished`, {
                taskId: this.taskId,
                sessionTask: this.sessionTask,
            });
        }
    }

    changeAIinputValue = (newText) => {
        this.inputValue = newText;
    };

    hideInstallVsCodeQuestion = () => {
        this.closeComment();
    };

    showVsInstalltion = () => {
        this.closeComment();
        HoverStoreClass.setIsHovering(false);
        this.hideInstallVsCodeQuestion();
        if (
            PageDataStoreClass.pageHaveReact &&
            (!this.elementSource || !this.elementSource.fileName)
        ) {
            GlobalStoreClass.setModalOpen("pageSupportModal");
        }
    };

    getRealWidth(element) {
        // Get the width of the element including padding and border
        var widthWithPaddingAndBorder = element.offsetWidth;

        // Get the left and right margin of the element
        var computedStyle = window.getComputedStyle(element);
        var marginLeft = parseInt(
            computedStyle.getPropertyValue("margin-left"),
            10
        );
        var marginRight = parseInt(
            computedStyle.getPropertyValue("margin-right"),
            10
        );

        // Calculate the total width including padding, border, and margin
        var realWidth = widthWithPaddingAndBorder + marginLeft + marginRight;

        return realWidth;
    }

    setElement(className, elementSource, dontRemoveConversation = false) {
        this.setLoading(false);

        this.elementSource = elementSource;
        const elm =
            className && document.getElementsByClassName(className) ?
            document.getElementsByClassName(className)[0] :
            null;

        if (elm) {
            this.element = elm;
            trackEvent(`AI - select element`);

            if (!dontRemoveConversation) {
                this.sessionTask = "";
                this.conversation = [];
            }

            const position = getPositionForModal(
                elm,
                420,
                true,
                HoverStoreClass.hoverType === "editor"
            );

            this.elementPosition = {
                top: position.top,
                left: position.left
            };
            this.elementClassName = className;
        }

        this.chooseWhereToOpenMessages();
    }

    chooseWhereToOpenMessages() {
        if (!this.element || this.conversation.length) {
            return;
        }

        const boundingElement = this.element.getBoundingClientRect();
        const y = boundingElement.y;

        if (window.innerHeight - y < 430) {
            if (y > 430) {
                //scroll the user down
            }
            //open on top
        } else {
            //open on bottom
        }
    }

    setLoading(loading) {
        this.loading = loading;

        if (!loading) {
            this.conversation.forEach((message) => {
                message.stopLoading();
                message.setProgressBar(undefined);
            });
        }
    }

    closeComment = () => {
        this.elementPosition = {};
    };

    getCode = async (source) => {
        try {
            const codeFile = await api(
                "get_file_code", {
                    source
                },
                "http://localhost:5463"
            );

            if (codeFile.code === "error") {
                trackEvent("Error in pulling code from VS code", source);
            }
            return codeFile.code;
        } catch (e) {
            trackEvent("get code from vs code has failed");
        }
    };

    addMessage = (text, from, props = {}) => {
        const Message = new MessageStore(from, text, props);
        this.conversation.push(Message);

        return Message;
    };

    getComponentName = (filePath) => {
        const splitedFilePaths = filePath.split("/");
        if (splitedFilePaths && splitedFilePaths.length) {
            const splitedFile = splitedFilePaths[splitedFilePaths.length - 1];
            return splitedFile;
        }
        return "";
    };

    runTask = async (properties) => {
        // if (UserStoreClass.streamFeatureEnabled) {
        if (properties.request) {
            properties.userTask = properties.request;
        }
        if (properties.code) {
            properties.userCode = properties.code;
        }
        if (properties.source) {
            properties.sourceInfo = properties.source;
        }

        properties.addScreenShot = this.isMock ? false : true;
        properties.actionName = "BeforeTask";
        properties.sessionId = this.sessionTask;

        trackEvent("AI - Magic sent to server");
        let response;
        if (this.sessionTask) {
            response = await api(
                `code-assistant/sessions/${this.sessionTask}/tasks`,
                properties,
                false,
                true
            );

            this.taskId = response.taskNumber;
        } else {
            response = await api(
                "code-assistant/sessions", {
                    task: properties
                },
                false,
                true
            );
            this.sessionTask = response.sessionId;
            this.taskId = response.taskNumber;
        }

        const oldCode = properties.userCode;
        this.addMessage("", "AI", {
            oldCode: decodeURIComponent(oldCode),
            newCode: "",
            session: this.sessionTask,
            taskId: this.taskId,
        });
        this.startStreamResults();

        return response;
    };

    submit = async () => {
        trackEvent(`AI - submit magic`);
        if (this.loading) {
            this.setLoading(false);
            this.taskId = "";
            return;
        }
        this.token = shortid.generate();

        this.setLoading(true);

        let elementSource;
        let elementSourceForAI;

        if (
            variables.isEditor &&
            (!this.elementSource ||
                this.elementSource.fileName !== CodeStoreClass.componentFilePath)
        ) {
            this.elementSource = {
                fileName: CodeStoreClass.componentFilePath
            };
            elementSource = {
                fileName: CodeStoreClass.componentFilePath
            };
            elementSourceForAI = {};
        } else {
            elementSource = JSON.parse(JSON.stringify(this.elementSource)); //create a new pointer for the source
            elementSourceForAI = elementSource;
        }

        const filePath = this.elementSource ? this.elementSource.fileName : "";
        this.lastFilePath = filePath;

        let codeFile = await this.getCode(this.elementSource);

        if (!this.element && !variables.isEditor) {
            this.setLoading(false);

            return;
        }

        let code = encodeURIComponent(codeFile);
        this.chooseWhereToOpenMessages();

        this.addMessage(this.inputValue, "user");
        const Message = this.addMessage();
        Message.createManualMessage(filePath);
        let loadingForOldFlow;

        if (code === "error" || !code) {
            alert(
                `This element's code could not be found. Try selecting another element. We can help you resolve this issue if you contact our support.`
            );
            trackEvent(`Error we didn't find the code of the selected element`);
            this.closeComment();
            this.setLoading(false);
            HoverStoreClass.setIsHovering(true, true);

            return;
        }

        try {
            let response = await this.runTask({
                request: this.inputValue,
                code,
                code_language: "react",
                token: this.token,
                elementClassName: this.elementClassName,
                url: window && window.location ? window.location.href.toString() : null,
                addScreenShot: true,
                use_mock_data: this.isMock,
                find_source: elementSource && elementSource.fileName ? true : false,
                source: elementSourceForAI,
                page_code_type: PageDataStoreClass.pageHaveReact ? "react" : "html",
            });

            if (response.status === 402) {
                throw response;
            }

            if (response && response.chart_id) {
                this.chart_id = response.chart_id;
            }

            this.inputValue = "";
        } catch (e) {
            if (e.status === 402) {
                alert(
                    "You have reached the maximum of 7 queries per day. Purchase a premium subscription to have an unlimited amount of queries"
                );
                trackEvent(`AI failed - need to purchase a premium plan`, {
                    token: this.token,
                });
                GlobalStoreClass.setShowPaymentModal(true);
            } else {
                trackEvent(`AI failed - server error`, {
                    token: this.token
                });
                if (typeof e === "string") {
                    alert(e);
                } else {
                    alert("invalid error");
                }
            }
            this.setLoading(false);
        }
    };

    removeMessage(removeUuid) {
        this.conversation = this.conversation.filter(
            (message) => message.uuid !== removeUuid
        );
    }

    setPreviouseCode(elementSource) {
        const conversationStringify = this.conversation.map((message) => {
            return message.getAttributesAsJSON();
        });

        const previousConversation = {
            source: elementSource,
            conversationStringify,
        };

        let classNames = this.element ? this.element.classList : [];
        let classNamesString = "";
        classNames.forEach((className) => {
            if (className.startsWith("findMeJinno")) {
                return;
            }

            classNamesString += `.${className}`;
        });

        localStorage.saveLastModification = JSON.stringify({
            url: window.location.href.toString(),
            className: classNamesString,
            position: JSON.stringify(getPosition(this.element, true, true)),
            previousConversation,
            taskId: this.taskId,
            sessionTask: this.sessionTask,
            date: new Date().getTime(),
        });
    }

    startListenToErrors = () => {
        const env = getEnv();
        if (env === "development") {
            return;
        }
        this.listenToErrors = true;
        setTimeout(() => {
            this.listenToErrors = false;
            let error = false;
            if (
                this.weHadAnError || //detect devtool errors
                document.getElementById("webpack-dev-server-client-overlay") //detect webpack error
            ) {
                error = true;
            }
            this.weHadAnError = false;

            api("AI/saveClientSideErrors", {
                chat_id: this.chat_id,
                addScreenShot: true,
                token: this.token,
                client_side_error: error,
                actionName: "AfterTask",
                taskId: this.taskId,
                sessionId: this.sessionTask,
            });
        }, 2500);
    };
}

decorate(TextAIStore, {
    inputValue: observable,
    loading: observable,
    conversation: observable,
    showCodeDiffID: observable,
    element: observable,
    hideInstallVsCode: observable,
    elementPosition: observable,
    streamUpdates: observable,
    changeAIinputValue: action,
    closeComment: action,
    revertCode: action,
});

export let TextAIStoreClass = new TextAIStore();
export default createContext(TextAIStoreClass);