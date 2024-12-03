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
import variables from "../variables";
import {
    HoverStoreClass
} from "./HoverStore";

class CodeStore {
    hoverLineFromHTML = null;
    hoverLineFromCode = null;
    isCssFile = false;
    componentFilePath = "";

    constructor() {
        document.addEventListener("updateHoverElement", async (e) => {
            if (e.detail && e.detail.debugSource && e.detail.debugSource.lineNumber) {
                const lineOfCode = Number(e.detail.debugSource.lineNumber);
                this.setHoverLineFromHTML(lineOfCode);
            }
        });

        this.listenToEventsFromEditor();

        setTimeout(() => {
            if (variables.isEditor) {
                HoverStoreClass.setIsHovering(true, true, "editor");
            }
        }, 1000);

        // setTimeout(() => {
        //   var event1 = new CustomEvent("message", {
        //     detail: {
        //       to: "CodeStore",
        //       type: "updateComponentPath",
        //       path: "/Users/morzloof/Documents/Jinno/CodeMe/web/src/Component1.js",
        //     },
        //   });
        //   window.dispatchEvent(event1);

        //   var event = new CustomEvent("message", {
        //     detail: {
        //       to: "CodeStore",
        //       type: "markHtmlCode",
        //       lineOfCode: "4",
        //     },
        //   });
        //   window.dispatchEvent(event);
        // }, 2000);
    }

    listenToEventsFromEditor() {
        window.addEventListener("message", (event) => {
            let data = event && event.detail ? event.detail : false;
            data = !data && event && event.data ? event.data : {};
            if (!data || !data.to || data.to !== "CodeStore") {
                return;
            }

            if (data.type === "updateComponentPath") {
                const path = data.path;
                this.isCssFile = data.isCssFile;

                this.setComponentCode(path);
            } else if (data.type === "markHtmlCode" && !this.isCssFile) {
                this.setHoverLineFromCode(data.lineOfCode, data.lineEndOfComponent);
            }
        });
    }

    async setComponentCode(filePath) {
        this.componentFilePath = filePath;
        // const response = await api(
        //   "get_file_code",
        //   { source: { fileName: filePath } },
        //   "http://localhost:5463"
        // );
        // this.componentCode = response.code;
    }

    async getCode(source) {
        return await api("get_file_code", {
            source
        }, "http://localhost:5463");
    }

    setHoverLineFromHTML(lineCode) {
        this.hoverLineFromHTML = lineCode;

        if (typeof window.vscode !== "undefined") {
            window.vscode.postMessage({
                command: "hoverOnCode",
                lineCode,
            });
        }
    }

    setHoverLineFromCode(lineOfCode, lineEndOfComponent) {
        this.hoverLineFromCode = lineOfCode;

        let event = new CustomEvent("setHtmlHover", {
            detail: {
                lineOfCode: this.hoverLineFromCode,
                lineEndOfComponent: lineEndOfComponent,
                filePath: toJS(this.componentFilePath),
            },
        });
        document.dispatchEvent(event);
    }
}
decorate(CodeStore, {
    hoverLineFromHTML: observable,
    componentCode: observable,
    isCssFile: observable,
});
export let CodeStoreClass = new CodeStore();
export default createContext(CodeStoreClass);