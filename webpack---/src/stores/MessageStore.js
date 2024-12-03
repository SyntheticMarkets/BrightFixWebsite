import {
    decorate,
    observable
} from "mobx";
import {
    toJS
} from "mobx";
import shortid from "shortid";
import {
    api,
    getEnv,
    trackEvent
} from "../components/utils";
import {
    TextAIStoreClass
} from "./TextAIStore";
import {
    UserStoreClass
} from "./UserStore";

class MessageStore {
    uuid;
    text;
    from;
    startStream = false;

    constructor(from, text, properties = {}) {
        this.uuid = properties.uuid ? properties.uuid : shortid.generate();
        this.from = from;
        this.text = text;
        this.properties = properties;
        // window.chrome.runtime.onMessage.addListener(this.onMessage.bind(this));

        // this.startStreamResults();
    }

    setText(newText) {
        this.text = newText;
    }

    setStrimFinished(bool) {
        this.strimFinished = bool;
    }

    showRevetCodeButton() {
        this.properties.showRevetCodeButton = true;
    }
    onMessage = (message, sender, sendResponse) => {
        const taskId = this.properties.taskId;
        const session = this.properties.session;

        if (message.to !== "MessageStore") {
            return;
        } else if (message.sendEvent == "updateMessageText" && this.from === "AI") {
            if (message.taskId === taskId && message.session === session) {
                this.text = message.planString;
            }

            this.codeDifMessage = '';
            if (message.planDone && !this.planDone) {
                this.planDone = message.planDone;

                const propertiesForMessages = {
                    oldCode: this.properties.oldCode,
                    newCode: message.codeString,
                    componentName: this.properties.componentName,
                    token: TextAIStoreClass.token,
                    source: TextAIStoreClass.elementSource,
                    chat_id: TextAIStoreClass.chat_id,
                    loading: true,
                };

                this.codeDifMessage = TextAIStoreClass.addMessage(
                    "",
                    "CodeDiff",
                    propertiesForMessages
                );

                // setTimeout(() => {
                //   this.codeDifMessage.stopLoading();
                //   propertiesForMessages.loading = false;
                // }, 3000);
            }

            this.codeDifMessage.setNewCode(message.codeString);
        }
    };

    setNewCode(newCode) {
        this.properties.newCode = newCode;
    }

    stopLoading() {
        this.properties.loading = false;
    }

    setProgressBar(percentage) {
        this.properties.percentage = percentage;
    }

    createManualMessage(filePath) {
        const componentName = this.getComponentName(filePath);
        this.text = null;
        this.from = "default";

        if (componentName) {
            this.properties = {
                componentName
            };
        }
    }

    getComponentName = (filePath) => {
        const splitedFilePaths = filePath ? filePath.split("/") : [];
        if (splitedFilePaths && splitedFilePaths.length) {
            const splitedFile = splitedFilePaths[splitedFilePaths.length - 1];
            return splitedFile;
        }
        return "";
    };

    getCodeChanges() {
        if (this.properties) {
            return {
                oldCode: this.properties.oldCode,
                newCode: this.properties.newCode,
                componentName: this.properties.componentName,
            };
        }
        return {};
    }

    async revertCode() {
        if (!this.properties) {
            return;
        }

        const properties = this.properties;
        const oldCode = properties.oldCode;
        const source = properties.source;
        await api(
            "edit_file", {
                source: source,
                newCode: oldCode
            },
            "http://localhost:5463"
        );
        trackEvent(`AI - click revert code`);

        this.properties.codeReverted = true;

        TextAIStoreClass.addMessage("", "CodeReverted");

        await api("AI/saveRevertCodeAnswer", {
            revert_code: true,
            chat_id: this.properties.chat_id,
        });
    }

    getAttributesAsJSON() {
        let attributes = {};

        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== "function") {
                attributes[key] = toJS(this[key]);
            }
        }

        return JSON.stringify(attributes);
    }
}

decorate(MessageStore, {
    uuid: observable,
    text: observable,
    from: observable,
    properties: observable,
});
export default MessageStore;