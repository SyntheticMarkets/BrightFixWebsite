import {
    createContext
} from "react";
import {
    decorate,
    observable,
    action
} from "mobx";
import * as treeJson from "../components/Tree/treeJson";
import {
    GlobalStoreClass
} from "./GlobalStore";
import {
    CommentsStoreClass
} from "./CommentsStore";
import {
    ParserCss
} from "../components/ParserCss";
import CreateEditWrapper from "../components/CreateEditWrapper.js";
import {
    MeasuresStoreClass
} from "./MeasuresStore";
import {
    InspectStoreClass
} from "./InspectStore.js";

class StyleStore {
    spacingData = [];
    sizeData = [];
    positionData = [];
    typographyData = [];
    backgroundData = [];
    borderData = [];
    shadowData = [];
    elm = null;

    constructor() {
        this.onChange = this.onChange.bind(this);
    }

    removeSelector() {
        MeasuresStoreClass.updateInspectStyle("");
        this.elm = null;
    }

    onChangeFontKinds(newArray) {
        let newValuesArray = [];
        if (newArray.includes("underline")) {
            CommentsStoreClass.updateCode("text-decoration", "underline");
            newValuesArray.push("underline");
        } else {
            CommentsStoreClass.updateCode("text-decoration", "none");
        }

        if (newArray.includes("italic")) {
            CommentsStoreClass.updateCode("font-style", "italic");
            newValuesArray.push("italic");
        } else {
            CommentsStoreClass.updateCode("font-style", "normal");
        }

        if (newArray.includes("bold")) {
            CommentsStoreClass.updateCode("font-weight", "700");
            newValuesArray.push("bold");

            this.typographyData = this.typographyData.map((item) => {
                if (item.id === "font-weight") {
                    item.value = "700";
                }
                return item;
            });
        } else {
            if (window.getComputedStyle(this.elm).fontWeight) {
                CommentsStoreClass.updateCode("font-weight", "300");

                this.typographyData = this.typographyData.map((item) => {
                    if (item.id === "font-weight") {
                        item.value = "300";
                    }
                    return item;
                });
            }
        }

        this.typographyData = this.typographyData.map((item) => {
            if (item.id === "fontKinds") {
                item.value = newValuesArray;
            }
            return item;
        });
    }

    onChange(item, newValue, newKind, updateCode = true, startValue) {
        let id = item.id;

        let kind = newKind ? newKind : item.kind;
        let value = newValue ? newValue : item.value;

        if (item.type !== "input") {
            kind = "";
        } else if (newKind) {
            kind = newKind;
            item.kind = newKind;
        } else {
            kind = item.kind;
        }

        if (newValue !== undefined && newValue !== null) {
            value = newValue;
            item.value = newValue;
        } else {
            value = item.value;
        }

        this.changedSpecificId(id, newValue);

        let theNewValue =
            kind === "none" || kind === "auto" || kind === "normal" ?
            kind :
            value + kind;

        if (updateCode) {
            CommentsStoreClass.updateCode(id, theNewValue, startValue);
        }

        CreateEditWrapper(this.elm);
    }

    changedSpecificId(id, newValue) {
        if (id === "position") {
            //change the pointer of the json so the component will render again
            this.positionData = this.positionData.map((item) => {
                return item;
            }); //make sure that the render will happened
        } else if (id === "border-width" || id === "border-color") {
            let borderStyle;
            let borderWidth;
            this.borderData.forEach((item) => {
                if (item.id === "border-style") {
                    borderStyle = item;
                } else if (item.type === "section") {
                    item.items.forEach((innerItem) => {
                        if (innerItem.id === "border-style") {
                            borderStyle = innerItem;
                        } else if (innerItem.id === "border-width") {
                            borderWidth = innerItem;
                        }
                    });
                }
            });
            if (borderWidth.value === 0) {
                this.onChange(borderWidth, 1);
            }
            if (borderStyle.value === "none") {
                this.onChange(borderStyle, "solid");
            }
        } else if (id === "font-weight") {
            this.typographyData = this.typographyData.map((item) => {
                if (item.id === "fontKinds") {
                    item.value = item.value.filter((copyItem) => {
                        return copyItem !== "bold";
                    });

                    if (newValue === "700") {
                        item.value.push("bold");
                    }
                }
                return item;
            });
        }
    }

    setElement(elm, rules) {
        this.lastRules = rules;

        this.elm = elm;
        let parsedRules = ParserCss(rules, elm);

        let computedStyle = elm ? window.getComputedStyle(elm) : {};

        this.spacingData = treeJson.calculateSpacingData(
            parsedRules,
            computedStyle
        );
        this.sizeData = treeJson.calculateSizeData(parsedRules, computedStyle);
        this.positionData = treeJson.calculatePositionData(
            parsedRules,
            computedStyle
        );
        this.typographyData = treeJson.calculateTypographyData(
            parsedRules,
            computedStyle
        );
        this.backgroundData = treeJson.calculateBackgroundData(
            parsedRules,
            computedStyle
        );
        this.borderData = treeJson.calculateBorderData(parsedRules, computedStyle);
        this.shadowData = treeJson.calculateShadowData(parsedRules, computedStyle);

        if (InspectStoreClass.isDetectMode) {
            GlobalStoreClass.toggleDetectBox(true);
            GlobalStoreClass.setIsMinimize(false);
        }

        CreateEditWrapper(this.elm);
    }
}

decorate(StyleStore, {
    spacingData: observable,
    sizeData: observable,
    positionData: observable,
    typographyData: observable,
    backgroundData: observable,
    borderData: observable,
    shadowData: observable,
    elm: observable,
    onChange: action,
});

export let StyleStoreClass = new StyleStore();
export default createContext(StyleStoreClass);

export let rules =
    '#testMe .a{font-weight:400;font-size:20px;color:rgb(255,255,255);} #testMe{font-style:italic; text-decoration:underline;color:rgb(200,200,200);width:333%} .jhp input[type="submit"], .sbdd_a input, .gbqfba { border-color:red;border-width:2px;border-style:solid;font-weight:500;background-image: -webkit-linear-gradient(top, rgb(245, 245, 245), rgb(241, 241, 241)); padding:10px 0%; user-select: none; background-color: rgb(242, 242, 242); border: 1px solid rgb(242, 242, 242); border-radius: 4px; color: rgb(95, 99, 104); cursor: pointer; font-family: arial, sans-serif; font-size: 14px; margin: 11px 4px;position:fixed;top:1px;right:2px;bottom:3px;left:4px; min-width: 54px;min-height:2%;max-height:3px;max-width:4px;width:44px;overflow:hidden; padding: 0px 16px; text-align: center; }.jhp input[type="submit"], .gbqfba { height: 36px; line-height: 27px; }.tfB0Bf input[type="submit"], .gbqfba { background-image: -webkit-linear-gradient(top, rgb(245, 245, 245), rgb(241, 241, 241)); background-color: rgb(242, 242, 242); border: 1px solid rgb(242, 242, 242); border-radius: 4px; color: rgb(95, 99, 104); font-family: arial, sans-serif; font-size: 14px; margin: 11px 4px; padding: 0px 16px; line-height: 27px; height: 36px; min-width: 54px; text-align: center; cursor: pointer; user-select: none; }';

// setTimeout(() => {
//   InspectStoreClass.toggleDetect(true);
//   StyleStoreClass.setElement(document.getElementById("testMe1"), rules);
// }, 100);