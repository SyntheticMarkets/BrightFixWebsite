import React, {
    useEffect
} from "react";
import {
    EditPropertyStoreClass
} from "../../stores/EditPropertyStore";
import {
    SearchStoreClass
} from "../../stores/SearchStore";
import {
    UserStoreClass
} from "../../stores/UserStore";
import {
    api,
    checkUrl,
    setLocalStorage,
    getLocalStorage
} from "../utils";
import {
    buildPropsForOneChild
} from "./CanvasAll";
import {
    CanvasStoreClass
} from "../../stores/CanvasStore";
import {
    CanvasPropertiesStoreClass
} from "../../stores/CanvasPropertiesStore";
import {
    toJS
} from "mobx";

let mySDKComponents = [];
setTimeout(() => {
    document.dispatchEvent(new CustomEvent("getAllComponents"));
}, 10);

export const getMySDKComponents = () => {
    return mySDKComponents;
};

export const savePropertiesForLocalComponents = (id, properties) => {
    let component = mySDKComponents.find((comp) => comp.clientId === id);

    if (component) {
        component.properties = properties;
        component = buildPropsForOneChild(component);
    }
};

export const updateComponent = (clientId, key, value) => {
    let component = mySDKComponents.find((comp) => comp.clientId === clientId);
    component[key] = value;
};

export const deletePropertyForLocalComponent = (clientId, propertyId) => {
    let component = mySDKComponents.find((comp) => comp.clientId === clientId);
    if (!component) return;
    delete component.props[propertyId];

    if (component.properties) {
        component.properties = component.properties.filter((item) => {
            if (item.type === "section") {
                item.items = item.items.filter((innerItem) => {
                    return innerItem.id !== propertyId;
                });
            }
            return item.id !== propertyId;
        });
    } else {
        component.properties = [];
    }
};

let timeout;
export const saveComponent = async (componentId, component) => {
    if (window.isAws) return;

    component.typeId = componentId;
    component.clientId = componentId;
    buildProps(component, componentId)

    let data = {
        clientId: component.clientId,
        component: JSON.stringify(component),
    };
    let serverProperties = [];
    let serverComponent = {};
    //if the component added from the react detection
    let fromDetectRect =
        component.clientId && component.clientId.includes("DontSaveMe");

    component.notAbleToSave = fromDetectRect;
    component.fromDetectRect = fromDetectRect;
    if (fromDetectRect) {
        // component.height = component.height;
        delete component.height;
        // component.width = component.width;
        delete component.width;
    }

    try {
        //don't save the component if it added from the react detection
        if (!fromDetectRect) {
            serverComponent = await getComponentDataCache(data);
            serverProperties = serverComponent.fields;
        }
    } catch (e) {
        serverComponent = {};
    }

    if (serverComponent && serverComponent.title) {
        component.title = serverComponent.title;
    }

    if (serverComponent && serverComponent.originalJS) {
        component.originalJS = serverComponent.originalJS;
    }

    if (serverComponent && serverComponent.npm) {
        component.npm = serverComponent.npm;
    }

    if (typeof serverProperties === "object") {
        let properties = serverProperties
            .map((item) => {
                let field = {};

                try {
                    field = JSON.parse(item.field);
                    field.fieldId = item.fieldId;
                    if (component.props && field.id && field.value !== undefined) {
                        component.props[field.id] = field.value;
                    }
                } catch (e) {
                    console.error(`can't parse filed`);
                }
                return field;
            })
            .filter((item) => item.id)
            .sort(function(a, b) {
                return parseFloat(a.index) - parseFloat(b.index);
            });
        if (typeof component.properties === "object") {
            component.properties = component.properties.filter((item) => {
                let findInServer = properties.find(
                    (property) => item.id === property.id
                );
                return !findInServer;
            });
            component.properties = component.properties.concat(properties);
        }
    }

    let find = mySDKComponents.find(
        (item) => item.clientId === component.clientId
    );
    if (!find) {
        //check if the component didn't add before
        component.isLocalComponent = true;
        if (component.isReactComponent || true) {
            component.Component = (props) => {
                return ( <
                    ComponentWrapper injectComponentId = {
                        component.props.injectComponentId
                    }
                    hiddenStyle = {
                        component.props.hiddenStyle
                    } { ...props
                    }
                    />
                );
            }; //.bind(componentId);
        } else {
            component.Component = (props) => {
                return ( <
                    div >
                    <
                    div > Error: you can send only React component into Jinno < /div> <
                    /div>
                );
            }; //.bind(componentId);
        }


        mySDKComponents.push(component);
        EditPropertyStoreClass.addComponentPermission(componentId);

        SearchStoreClass.setSearch("", false);

        let param0 =
            typeof checkUrl(0) === "string" ? checkUrl(0).toLowerCase() : "";
        let param1 = checkUrl(1);

        if (param0 === "jinno" && param1 === component.clientId) {
            //if it's from the url
            CanvasStoreClass.findComponentInUrl(component.clientId, true, true);
        } else if (component.fromDetectRect) {
            //if it's from react detect
            //if it's from the react detection open the edit box     
            CanvasStoreClass.findComponentInUrl(component.clientId, true, true);
        } else {
            CanvasStoreClass.getComponentFromVsCode(component.clientId);
        }
    }
};

function buildProps(component, componentId) {
    try {
        let props = component.props ? JSON.parse(component.props) : {};
        component.props =
            props && typeof props === "object" && !Array.isArray(props) ? props : {}; //if it's a array/string/number it will make a bug so we will remove the props in this case

        if (component.width) {
            component.widthDemo = component.width;
        }

        if (component.height) {
            component.widthHeight = component.height;
        }

        component.title = component.title ? component.title : "Edit title";
        component.props.injectComponentId = component.injectComponentId;

        component.properties =
            component.props &&
            Object.keys(component.props)
            .map((key) => {
                let value = component.props[key];

                let json = {
                    id: key,
                    label: key,
                    newField: true,
                    value,
                };

                //if it's boolean
                if (value === true || value === false) {
                    json.type = "checkbox";
                    //if it's a number
                } else if (!isNaN(value)) {
                    json.type = "number";
                    //string
                } else {
                    json.type = "inputText";
                }
                return json;
            })
            .filter((item) => item.id !== "injectComponentId");
    } catch (e) {
        component.props = {
            injectComponentId: component.injectComponentId
        };
    }
}

async function getComponentDataCache(data) {
    let updatedTime =
        new Date().getDate().toString() + new Date().getHours().toString();
    let cacheData = getLocalStorage("cacheData"); //try to find if we have cache data
    if (!cacheData) {
        cacheData = {};
    }

    let clientId = data.clientId;
    let cacheDataItem = cacheData[clientId]; //check if we have cache of this clientId
    if (cacheDataItem && cacheDataItem.updatedTime === updatedTime) {
        return cacheDataItem;
    } else {
        let res = await api("components/getComponent", data); //add the server properties and props
        cacheData = getLocalStorage("cacheData"); //try to find if we have cache data
        if (!cacheData) {
            cacheData = {};
        }

        if (clientId) {
            res.updatedTime = updatedTime;
            cacheData[clientId] = res;
        }
        setLocalStorage("cacheData", cacheData); //save it in the localStorage
        return res;
    }
}

function ComponentWrapper(props) {
    useEffect(() => {
        let data = {
            id: props.injectComponentId,
            props: JSON.stringify(props),
            hiddenStyle: JSON.stringify(props.hiddenStyle),
        };

        // delete props.hiddenStyle
        var event = new CustomEvent("sendDataToJino", {
            detail: {
                function: "RenderComponent",
                data
            },
        });

        CanvasPropertiesStoreClass.editFieldsFromJinnoConnector(props);
        document.dispatchEvent(event);
    }, [props]);

    return ( <
        div id = {
            props.injectComponentId
        }
        style = {
            props.hiddenStyle ? toJS(props.hiddenStyle) : {}
        } >
        Loading <
        /div>
    );
}

// if (module.hot) {
//   module.hot.accept("../Input/Input.js", function () {
//     console.log("Accepting the updated printMe module!");
//     console.log("ComponentDemo", Input);
//   });
// }

let startToAddComponent = [];
var addAfterLogin = [];
document.addEventListener(
    "saveComponent",
    function(e) {
        //listener on changed nodeId
        if (e && e.detail && e.detail) {
            let componentElementId = e.detail.clientId;
            let params = e.detail.params;

            let find = startToAddComponent.find((item) => item === params.clientId);

            if (!find) {
                //if we still didn't add this component
                if (true || UserStoreClass.email) {
                    startToAddComponent.push(params.clientId);
                    saveComponent(componentElementId, params);
                } else {
                    addAfterLogin.push({
                        componentElementId,
                        params
                    });
                    CanvasStoreClass.checkIfToOpenSignUp();
                }
            }
        }
    },
    false
);

document.addEventListener(
    "jinnoOpenCanvas",
    function(e) {
        //check if we need to open the canvas
        if (e && e.detail && e.detail) {
            let clientId = e.detail.clientId;
            CanvasStoreClass.getComponentFromVsCode(clientId);

        }
    },
    false
);


// var hasExtension = false;

// window.chrome.runtime.sendMessage(
//   "afahajnoehghleaabbakgpaiejegoaak",
//   { message: "version" },

//   function (reply) {
//     if (reply) {
//       console.log("a", reply);
//       if (reply.version) {
//         if (reply.version >= requiredVersion) {
//           console.log("t");
//           hasExtension = true;
//         }
//       }
//     } else {
//       console.log("f");
//       hasExtension = false;
//     }
//   }
// );