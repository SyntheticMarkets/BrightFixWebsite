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
    SearchStoreClass
} from "./SearchStore";
import {
    InspectStoreClass
} from "./InspectStore";
import shortid from "shortid";
import {
    checkUrl,
    getFromUrl,
    getPosition,
    trackEvent,
    api,
} from "../components/utils";
import {
    StyleStoreClass
} from "./StyleStore.js";
import CreateEditWrapper from "../components/CreateEditWrapper.js";
import {
    GlobalStoreClass
} from "./GlobalStore";
import {
    UserStoreClass
} from "./UserStore";
import {
    PageDataStoreClass
} from "./PageDataStore.js";
import getAllComponent, {
    saveProperties,
} from "../components/Canvas/CanvasAll";
import {
    Hover
} from "../components/Hover/Hover";
import {
    CanvasPropertiesStoreClass
} from "./CanvasPropertiesStore";
import {
    EditPropertyStoreClass
} from "./EditPropertyStore";
import variables from "../variables";
import {
    getMySDKComponents,
    updateComponent,
} from "../components/Canvas/JinnoConnector";
import BuildCode from "./BuildCode";
import {
    HoverStoreClass
} from "./HoverStore.js";

class CanvasStore {
    components = [];
    layout = [{
        h: 5.6,
        i: "0",
        moved: false,
        static: false,
        w: 56,
        x: 0,
        y: 0
    }]; //[]
    selectedComponentId;
    selectedProperties = [];
    selectedFunctions = [];
    propertyOpacity = 1;
    canvasOpen = false;
    codeOpen = true;
    isLoading = false;
    showControlBar = false;
    toolTipData = {
        top: 0,
        title: "",
        text: "",
        visible: false
    };
    updateCode = 0;
    showInstallSDK = false;
    openComponentFromVsCode = false;

    constructor() {
        setTimeout(() => {
            if (window.isAws) {
                this.setCanvasOpen(true);
                SearchStoreClass.setSearchOpen(true);
            }
        }, 10);

        // if (getEnv() === "development") {
        //   setTimeout(() => {
        //     this.setShowControlBar(true);
        //   }, 10);
        // }

        this.detectIfDevtoolOpen();
    }

    checkIfToOpenComponentFromVsCode(componentId) {
        if (
            this.openComponentFromVsCode &&
            this.openComponentFromVsCode === componentId &&
            !this.canvasOpen &&
            componentId.isDev
        ) {
            this.findComponentInUrl(componentId, true);
        }
    }

    checkIfToOpenSignUp() {
        this.openIfHaveComponent = true;
        if (!UserStoreClass.email && this.openComponentFromVsCode) {
            GlobalStoreClass.setModalOpen("signUp");
        }
    }
    async getComponentFromVsCode() {
        return;
        if (this.canvasOpen) {
            return;
        }
        try {
            let componentId = await api("whatopen", {}, "http://localhost:5463");

            if (componentId && componentId !== "false") {
                let findComponent = getMySDKComponents().find(
                    (comp) => comp.clientId === componentId
                );
                this.openComponentFromVsCode = componentId;

                if (!findComponent || !findComponent.isDev) {
                    if (!UserStoreClass.email && this.openIfHaveComponent) {
                        GlobalStoreClass.setModalOpen("signUp");
                    }
                    return;
                }

                if (findComponent) {
                    this.findComponentInUrl(componentId, true);
                } else if (!UserStoreClass.email) {
                    GlobalStoreClass.setModalOpen("signUp");
                }
            }
        } catch (e) {
            console.error("e");
        }
    }

    deleteProperty(propertyId) {
        this.selectedProperties = this.selectedProperties.filter((item) => {
            if (item.type === "section") {
                item.items = item.items.filter((innerItem) => {
                    return innerItem.id !== propertyId;
                });
            }
            return item.id !== propertyId;
        });

        let component = this.components.find(
            (comp) => comp.id === this.selectedComponentId
        );
        delete component.props[propertyId];
        component.js = this.buildJsCode(component);
    }

    addProperty(property) {
        let newProperties = toJS(this.selectedProperties);
        newProperties.push(property);

        this.selectedProperties = toJS(newProperties);
        EditPropertyStoreClass.setShowSaveButton(true);
    }

    setAllProperties(newProperties) {
        let selectedComponent =
            this.components && this.components[0] ? this.components[0] : {};
        let componentId = selectedComponent.typeId;

        this.selectedProperties = newProperties;
        selectedComponent.properties = newProperties;
        saveProperties(componentId, this.selectedProperties);
        selectedComponent.js = this.buildJsCode(selectedComponent);
    }

    onChangeProperty(key, value) {
        let id = CanvasPropertiesStoreClass.editPropertyId; //the property id
        EditPropertyStoreClass.setShowSaveButton(true);

        let findProperty;
        let component = this.components.find(
            (comp) => comp.id === this.selectedComponentId
        );

        this.selectedProperties.forEach((item) => {
            //find the property that we want to change
            if (item.id === id) {
                findProperty = item;
            }

            if (item.type === "section") {
                item.items.forEach((innerItem) => {
                    if (innerItem.id === id) {
                        findProperty = innerItem;
                    }
                });
            }
        });

        if (findProperty) {
            if (key === "id") {
                if (findProperty["id"] && component.props) {
                    delete component.props[findProperty["id"]]; //update the component props key and value
                    if (value) {
                        component.props[value] = findProperty["value"];
                    }
                }

                if (value) {
                    findProperty["id"] = value;
                    findProperty["label"] = value;
                    CanvasPropertiesStoreClass.editPropertyId = value;
                }
            } else if (key === "value") {
                if (!value && value !== false) {
                    delete component.props[findProperty["id"]];
                    delete findProperty[key];
                } else {
                    component.props[findProperty["id"]] = value;
                    findProperty[key] = value;
                }
            } else {
                findProperty[key] = value;
            }
        }

        this.selectedProperties = toJS(this.selectedProperties);
        if (key === "id" || key === "value") {
            this.components = toJS(this.components);
            let js = this.buildJsCode(component); //update the js code
            component.js = js;
            this.components = this.components.map((item) => {
                item.js = js;
                return item;
            });
        }
    }

    findComponentInUrl(
        clientId = null,
        alwaysOpen = false,
        sdkComponent = false
    ) {
        let chooseComponent = clientId ? clientId : checkUrl(1);
        let firstUrl = checkUrl(0);
        firstUrl = typeof firstUrl === "string" ? firstUrl.toLowerCase() : firstUrl;

        if (
            (chooseComponent &&
                variables.env === "web" &&
                (firstUrl === "jinno" || window.isAws)) ||
            (chooseComponent && alwaysOpen)
        ) {
            setTimeout(async () => {
                let allComponents = sdkComponent ? [] : await getAllComponent();
                let mySDKComponents = getMySDKComponents();
                allComponents = allComponents.concat(mySDKComponents);

                let component = allComponents.find((item) => {
                    return item.typeId == chooseComponent;
                });

                if (component) {
                    this.setCanvasOpen(true);
                    component.id = "0";
                    this.addComponent(component, "0", true);
                    this.setCodeOpen(true);

                    this.setSelectComponent("0", chooseComponent);
                }
            }, 10);
        } else {}
    }

    setToolTipData(element, title, text, selected) {
        let top;
        if (element) {
            let offsetHeight = element.offsetHeight; //the element height
            let headerHeight = 43; //the header height
            let elementTop = getPosition(element, true).top; // the element position from top
            top = elementTop - headerHeight + offsetHeight / 2;
        }

        let visible = true;
        if (!text) {
            visible = false;
        }

        this.toolTipData = {
            visible,
            top,
            title,
            text,
            element,
            selected
        };
    }

    detectIfDevtoolOpen() {
        if (variables.env === "chromeExtension") {
            window.chrome.runtime.sendMessage({
                    to: "devtools",
                    message: "isDevtoolOpen"
                },
                (response, a, b) => {
                    setTimeout(() => {
                        if (
                            response &&
                            response.isOpen &&
                            !GlobalStoreClass.userHidExtension
                        ) {
                            this.setShowControlBar(true);
                        }
                    }, 100);
                }
            );

            window.chrome.runtime.onMessage.addListener(this.onMessage.bind(this));
        }
    }

    onMessage(message, sender, sendResponse) {
        if (message.to !== "CanvasStore") {
            return;
        }

        if (message.openControlBar !== undefined) {
            // if the detect mode has changed
            if (message.from === "devtools" && GlobalStoreClass.userHidExtension) {
                return;
            }
            this.setShowControlBar(true, true);

            window.chrome.storage.sync.set({
                isClosed: ""
            });
            GlobalStoreClass.userHidExtension = false;
        }
    }

    setShowControlBar(bool, openByClick = false) {
        if (bool !== undefined) {
            this.showControlBar = bool;
        } else {
            this.showControlBar = !this.showControlBar;
        }

        if (bool && openByClick) {
            this.hideJinnoForPeriod("remove");
            const url = window.location && window.location.toString();

            trackEvent("jinno opened by click", {
                url
            });
        }

        document.body.classList.remove("fixMe_addMarginBottom");
        var event = new CustomEvent("JinnoVisabilitiyChanged", {
            detail: {
                open: this.showControlBar
            },
        });
        document.dispatchEvent(event);

        if (this.showControlBar) {
            this.init();

            document.body.classList.add("fixMe_addMarginBottom");
            PageDataStoreClass.findReactOnPage();
            setTimeout(() => {
                PageDataStoreClass.findReactOnPage();
                UserStoreClass.getUserDetails();
            }, 1000);

        } else {
            if (bool === false) {
                this.hideControlBarOnce = true;
            }

            GlobalStoreClass.setReactDetectionOpen(false);
            HoverStoreClass.setIsHovering(false);

            GlobalStoreClass.setControlBarPosition(0, 0);
        }
    }

    hideJinnoForPeriod(period) {
        const today = new Date();
        const todayTime = today.getTime();
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
        window.chrome.storage.sync.set({
            openChatIframe: {
                show: false,
                smallSize: false
            },
        });

        let addtionTime = 1;
        if (period === "day") {
            addtionTime = 1;
        } else if (period === "week") {
            addtionTime = 7;
        } else if (period === "month") {
            addtionTime = 30;
        }

        const time =
            period === "remove" ? 0 : todayTime + addtionTime * oneDayInMilliseconds;

        window.chrome.storage.sync.set({
            hideJinnoUntil: {
                time
            }
        });
    }

    setCodeOpen(bool) {
        let component =
            this.components && this.components[0] ? this.components[0] : {};
        component.js = this.buildJsCode(component);
        if (bool !== undefined) {
            this.codeOpen = bool;
        } else {
            this.codeOpen = !this.codeOpen;
        }

        StyleStoreClass.removeSelector();
    }

    async init() {
        if (this.alreadyStarted) {
            return;
        }
        this.alreadyStarted = true; //all the api's here should call only one time

        await UserStoreClass.userLoadedTrigger();
        EditPropertyStoreClass.getMyPermissions();
        await SearchStoreClass.loadMyComponents();
        SearchStoreClass.setSearch("", false);
    }

    async setCanvasOpen(bool) {
        if (bool !== undefined) {
            this.canvasOpen = bool;
        } else {
            this.canvasOpen = !this.canvasOpen;
        }

        if (!this.canvasOpen) {
            StyleStoreClass.removeSelector("");
            GlobalStoreClass.toggleDetectBox(false);
            InspectStoreClass.toggleDetect(false);
            CanvasPropertiesStoreClass.setSelectedTab("props");
        } else if (this.canvasOpen) {
            Hover.startFullStory();
            this.init();
        }

        if (!this.canvasOpen && GlobalStoreClass.openReactDetectAfterCloseCanvas) {
            GlobalStoreClass.setReactDetectionOpen(true);
        }

        if (!this.canvasOpen) {
            this.sendCloseEvent();
        }

        this.toggleHotReload(this.canvasOpen);
    }
    async sendCloseEvent() {
        //send close event to visual studio
        try {
            await api("close", {}, "http://localhost:5463");
        } catch (e) {}
    }

    toggleHotReload(bool) {
        var event = new CustomEvent("toggleHotReload", {
            detail: {
                hotReloadStatus: bool
            },
        });
        document.dispatchEvent(event);
    }
    convertParamFromUrl(id, type) {
        let paramFromUrl = getFromUrl(id);

        if (
            type === "checkbox" &&
            (paramFromUrl === "false" || paramFromUrl === "true")
        ) {
            paramFromUrl = JSON.parse(paramFromUrl);
        } else if (type === "number") {
            paramFromUrl = Number(paramFromUrl);
        }

        return paramFromUrl;
    }

    setSelectComponent(id, takePropsFromUrl = false) {
        this.selectedComponentId = id;
        if (!id) {
            return;
        }

        EditPropertyStoreClass.emptyDeleteFields();
        EditPropertyStoreClass.setShowSaveButton(false);
        let component = this.components.find((comp) => comp.id === id);
        let properties = component.properties ? component.properties : [];
        let functions = [];

        properties = properties.filter((item) => {
            return item.id !== "hiddenStyle" && item.id !== "injectComponentId";
        });

        if (component.functionsInOtherSection) {
            //split the functions to a different section
            functions = properties.filter((item) => item.type === "function");
            properties = properties.filter((item) => item.type !== "function");

            if (takePropsFromUrl) {
                properties = properties.map((item) => {
                    //take the params from the url
                    if (item.type === "section") {
                        item.items = item.items.map((innerItem) => {
                            let paramFromUrl = this.convertParamFromUrl(
                                innerItem.id,
                                innerItem.type
                            );

                            if (paramFromUrl) {
                                innerItem.value = paramFromUrl;
                                if (component.props) {
                                    component.props[innerItem.id] = paramFromUrl;
                                }
                            }

                            return innerItem;
                        });
                    } else {
                        let paramFromUrl = this.convertParamFromUrl(item.id, item.type);
                        if (
                            item.type === "checkbox" &&
                            (paramFromUrl === "false" || paramFromUrl === "true")
                        ) {
                            paramFromUrl = JSON.parse(paramFromUrl);
                        }

                        if (paramFromUrl) {
                            item.value = paramFromUrl;

                            if (component.props) {
                                component.props[item.id] = paramFromUrl;
                            }
                        }
                    }

                    return item;
                });

                // component.properties = properties;
                component.js = this.buildJsCode(component);
            }
        }

        this.selectedProperties = properties;
        this.selectedFunctions = functions;
        CanvasPropertiesStoreClass.setSelectedTab("props");

        EditPropertyStoreClass.checkAllowToEditPermission();
    }

    addComponent(component, getId, takePropsFromUrl = false) {
        let id = getId ? getId : component.typeId + shortid.generate();
        component.id = id;
        component.js = this.buildJsCode(component);

        this.components = [component];
        this.layout.push({
            i: id,
            x: 0,
            y: 0,
            w: component.width,
            h: component.height / 10,
        });

        GlobalStoreClass.changeTreeExpanded(["properties"]);
        SearchStoreClass.setSearchOpen(false);
        this.setSelectComponent(id, takePropsFromUrl);
    }

    saveCodeInServer() {
        let component =
            this.components && this.components[0] ? this.components[0] : {};
        // component.js = component.changedJsCode;
        component.originalJS = component.changedJsCode;
        let jsCode = component.changedJsCode;

        api("components/updateComponent", {
            jsCode,
            clientId: component.clientId
        });
        updateComponent(component.clientId, "originalJS", jsCode);
    }

    updateComponentStyle(id, width, height) {
        this.layout = this.layout.map((item) => {
            if (item.i === id) {
                item.w = width;
                item.h = height / 10;
            }

            return item;
        });
    }

    onChangeMultiComponent(id) {
        let findComponent = this.components.find(
            (comp) => this.selectedComponentId === comp.id
        );
        findComponent = toJS(findComponent);

        let newProps = findComponent.multiComponent[id] ?
            findComponent.multiComponent[id] :
            {};

        let componentId = findComponent.selectedComponentId ?
            findComponent.selectedComponentId :
            0;

        if (componentId === id) {
            return;
        }

        findComponent.properties = findComponent.properties.map((property) => {
            //update all the props
            if (property.type === "section") {
                property.items = property.items.map((innerProperty) => {
                    if (newProps[innerProperty.id] !== undefined) {
                        //if the value is different
                        innerProperty.value = newProps[innerProperty.id];
                    } else {
                        //change to the default value
                        innerProperty.value = innerProperty.defaultValue;
                    }

                    return innerProperty;
                });
            } else {
                if (newProps[property.id] !== undefined) {
                    //if the value is different
                    property.value = newProps[property.id];
                } else {
                    //change to the default value
                    property.value = property.defaultValue;
                }
            }

            return property;
        });

        findComponent.selectedComponentId = id;
        this.components = this.components.map((
            comp //save the changes in the components list
        ) => (this.selectedComponentId === comp.id ? findComponent : comp));

        this.changePropertiesWithEffect(findComponent.properties); //change the properties with effect
    }

    changePropertiesWithEffect(newProperties) {
        this.propertyOpacity = 0;
        setTimeout(() => {
            this.selectedProperties = [];

            setTimeout(() => {
                this.selectedProperties = newProperties;
                this.propertyOpacity = 1;
            }, 1);
        }, 200);
    }

    onChange(data, newValue) {
        if (typeof data === "object") {
            data.value = newValue;
        }

        let id = typeof data === "string" ? data : data.id;
        let newProperties = [];
        this.components = this.components.map((comp) => {
            if (this.selectedComponentId === comp.id) {
                comp.props = toJS(comp.props);

                if (!newValue && data.removeOnDelete) {
                    //if it's empty remove the props
                    // comp.props[id] = null;
                    delete comp.props[id];
                } else {
                    comp.props[id] = newValue;
                }
                let multiComponentId = comp.selectedComponentId ?
                    comp.selectedComponentId :
                    0;

                if (comp.multiComponent && comp.multiComponent[multiComponentId]) {
                    if (!newValue && data.removeOnDelete) {
                        // comp.multiComponent[multiComponentId][id] = null;
                        delete comp.multiComponent[multiComponentId][id];
                    } else {
                        comp.multiComponent[multiComponentId][id] = newValue;
                    }
                }
                comp.js = this.buildJsCode(comp);
                comp.properties &&
                    comp.properties.forEach((property) => {
                        if (property.id === id) {
                            property.value = newValue;
                        }
                    });
                newProperties = toJS(comp.properties);
            }

            return comp;
        });
        debugger;
        if (StyleStoreClass.elm) {
            setTimeout(() => {
                CreateEditWrapper(StyleStoreClass.elm);
            }, 10);
        }
    }

    findSpaces(code, str = "{...props}") {
        let i = 1;
        let spaces = "";
        while (
            code[code.indexOf(str) - i] === " " ||
            code[code.indexOf(str) - i] === "\t"
        ) {
            spaces += code[code.indexOf(str) - i];
            i++;
        }

        return spaces;
    }

    buildValueReplacement(key) {
        let value;
        let valueReplacement;
        if (key === undefined) {
            return [null, null];
        }

        if (typeof key == "object") {
            //build the value
            value = `{${JSON.stringify(key)}}`;
            valueReplacement = `${JSON.stringify(key)}`;
        } else if (typeof key === "number" || typeof key === "boolean") {
            value = `{${key}}`;
            valueReplacement = `${key}`;
        } else {
            value = `"${key}"`;
            valueReplacement = `"${key}"`;
        }
        return [value, valueReplacement];
    }

    buildPropsCode(component, componentProps, isPropsJson, jsCode, spaces) {
        //build all the props code
        //build all the props
        let props = ``;
        let firstRow = true;
        let valueReplacement;
        let propsArray = Object.keys(componentProps) //sort the props
            .map((item) => {
                return {
                    value: item
                };
            })
            .map((item) => {
                let findIndex =
                    component.properties &&
                    component.properties.find((prop) => prop.id === item.value); //if the item have an index

                if (findIndex && findIndex.index !== undefined) {
                    item.index = findIndex.index;
                }
                return item;
            })
            .sort(function(a, b) {
                return parseFloat(a.index) - parseFloat(b.index);
            })
            .map((item) => item.value);

        propsArray.forEach((key, index) => {
            if (key === "injectComponentId") {
                return;
            }

            let value = "";
            [value, valueReplacement] = this.buildValueReplacement(
                componentProps[key]
            );

            if (isPropsJson) {
                value = valueReplacement;
            }

            let findReplacement = false;
            if (component.replacements) {
                component.replacements.forEach((item) => {
                    if (item.props === key) {
                        if (
                            item.multiKey !== undefined &&
                            component.multiComponent &&
                            component.multiComponent[item.multiKey]
                        ) {
                            [value, valueReplacement] = this.buildValueReplacement(
                                component.multiComponent[item.multiKey][key]
                            );
                        }

                        if (item.ifTrue && componentProps[key] === true) {
                            valueReplacement = item.ifTrue;
                        }
                        if (item.ifFalse === false && componentProps[key] === false) {
                            findReplacement = true;
                            return;
                        }
                        findReplacement = true;
                        if (valueReplacement) {
                            jsCode = jsCode.replace(item.key, valueReplacement);
                        }
                    }
                });
            }

            if (!findReplacement) {
                if (!firstRow) {
                    //for first child add enter and tab
                    props += spaces;
                }
                firstRow = false;

                props += `${key}${isPropsJson ? ": " : "="}${value}`;

                if (index !== Object.keys(component.props).length - 1) {
                    //if it's the last child don't add enter
                    if (isPropsJson) {
                        props += `,`;
                    }
                    props += `\n`;
                }
            }
        });

        if (props[props.length - 1] === "\n") {
            props = props.substring(0, props.length - 1);
        }
        return [props, jsCode];
    }

    saveCode(newCode) {
        let component =
            this.components && this.components[0] ? this.components[0] : {};
        component.changedJsCode = newCode;
    }

    resetCode() {
        let component =
            this.components && this.components[0] ? this.components[0] : {};

        if (!component.originalJS) {
            component.changedJsCode = "";
            component.originalJS = this.buildJsCode(component);
        }
        component.changedJsCode = component.originalJS;
        component.js = component.originalJS;

        this.updateCode++;
    }

    buildJsCode(component, buildOnlyIfEmpty = false) {
        if (component.componentCode) {
            return component.componentCode;
        }
        let jsCode = component.originalJS ?
            component.originalJS.replace(
                "// eslint-disable-next-line react-hooks/exhaustive-deps",
                ""
            ) :
            "";

        if (component.editable) {
            let theCode = BuildCode(component);
            this.updateCode++;

            return theCode;
        }

        if (!jsCode) {
            let componentName = component.clientId ? component.clientId : "Component";
            jsCode = `(props) => {
  return (
    <>
      ${
        component.properties && component.properties.length
          ? `<${componentName} \n\t{...props}/>`
          : `<${componentName} {...props}/>`
      }
    </>
  )
}`;
        }

        let isPropsJson = component.isPropsJson;
        let changeString = isPropsJson ? "...props" : "{...props}";
        let spaces = this.findSpaces(jsCode, changeString);

        if (jsCode.includes("/*remove*/")) {
            // eslint-disable-next-line
            let i = 0;

            while (jsCode.indexOf("/*remove*/") > 0) {
                let indexCounter = jsCode.indexOf("/*remove*/", 0);
                let firstCode = jsCode.slice(0, indexCounter);
                i += 3;

                let endCode = jsCode.slice(
                    jsCode.indexOf("/*remove*/", indexCounter + 1) + 11
                );

                jsCode = firstCode + endCode;
            }
        }

        let props = [];
        if (component.props) {
            let componentProps = component.props;
            let selectedMultiComponentId = component.selectedComponentId ?
                component.selectedComponentId :
                0;

            if (
                component.multiComponent &&
                component.multiComponent[selectedMultiComponentId]
            ) {
                component.multiComponent.forEach((item, index) => {
                    componentProps = item;
                    let itemProps;

                    changeString = isPropsJson ?
                        `...props${index}` :
                        `{...props${index}}`;
                    spaces = this.findSpaces(jsCode, changeString);

                    [itemProps, jsCode] = this.buildPropsCode(
                        //build the props on the code
                        component,
                        componentProps,
                        isPropsJson,
                        jsCode,
                        spaces
                    );
                    props.push(itemProps);
                });
            } else {
                let itemProps;
                [itemProps, jsCode] = this.buildPropsCode(
                    //build the props on the code
                    component,
                    componentProps,
                    isPropsJson,
                    jsCode,
                    spaces
                );
                props.push(itemProps);
            }
        }

        if (component.replacements) {
            component.replacements.forEach((item) => {
                if (!item.props) {
                    let spaces = this.findSpaces(jsCode, item.key);

                    jsCode = jsCode.replace(
                        "\n" + spaces + item.key,
                        item.value ? item.value : ""
                    );

                    jsCode = jsCode.replace(item.key, item.value ? item.value : "");
                }
            });
        }

        if (isPropsJson) {
            props.forEach((innerProps) => {
                jsCode = jsCode.replace("...props", innerProps);
            });

            return jsCode;
        }

        props.forEach((innerProps, index) => {
            if (component.multiComponent && component.multiComponent.length) {
                let str = `{...props${index}}`;
                jsCode = jsCode.replace(str, innerProps);
            } else {
                jsCode = jsCode.replace(/{...props}/g, innerProps);
            }
        });

        return jsCode;
    }

    setLayout(newLayout) {
        this.layout = newLayout;
    }

    setIsLoading(bool) {
        this.isLoading = bool;
    }

    setShowInstallSdk(bool) {
        this.showInstallSdk = bool;
    }
}

decorate(CanvasStore, {
    components: observable,
    selectedComponentId: observable,
    layout: observable,
    selectedProperties: observable,
    selectedFunctions: observable,
    showControlBar: observable,
    codeOpen: observable,
    canvasOpen: observable,
    propertyOpacity: observable,
    toolTipData: observable,
    updateCode: observable,
    isLoading: observable,
    showInstallSdk: observable,
    setShowInstallSdk: action,
    setIsLoading: action,
    setLayout: action,
    setSelectComponent: action,
    addComponent: action,
    setCodeOpen: action,
    updateComponentStyle: action,
});

export let CanvasStoreClass = new CanvasStore();
export default createContext(CanvasStoreClass);