import {
    createContext
} from "react";
import {
    decorate,
    observable,
    toJS
} from "mobx";
import {
    saveProperties,
    deleteProperty
} from "../components/Canvas/CanvasAll";
import {
    CanvasStoreClass
} from "./CanvasStore";
import {
    CanvasPropertiesStoreClass
} from "./CanvasPropertiesStore";
import {
    api,
    removeLocalStorage
} from "../components/utils";
import {
    UserStoreClass
} from "./UserStore";
import {
    getMySDKComponents,
    updateComponent
} from "../components/Canvas/JinnoConnector";

class EditPropertyStore {
    allowToEdit = false;
    showSaveButton = false;
    myComponentsPermissions = [];
    isSuperAdmin = true;
    deleteFields = [];

    async getMyPermissions() {
        return
        let res = [];
        try {
            res = await api("userInfo/getMyComponentsPermissions");
        } catch (e) {
            console.log(e);
            if (e === "session is not valid" && !window.isAws) {
                UserStoreClass.logout();
            }
        }

        if (res && res.isSuperAdmin) {
            //if the user is super admin
            UserStoreClass.setIsSuperAdmin(true);
        } else {
            //if the user have regular permissions
            let sdkComponents = getMySDKComponents().map((item) => {
                return {
                    componentId: item.typeId
                };
            });
            this.myComponentsPermissions = res ?
                res.concat(sdkComponents) :
                sdkComponents;
        }

        this.checkAllowToEditPermission();
    }

    addComponentPermission(componentId) {
        this.myComponentsPermissions.push({
            componentId
        });
        this.checkAllowToEditPermission();
    }

    checkAllowToEditPermission() {
        return
        if (UserStoreClass.isSuperAdmin) {
            //if the user have permissions for all components
            this.allowToEdit = true;
            return;
        }

        let selectedComponentId =
            CanvasStoreClass.components &&
            CanvasStoreClass.components[0] &&
            CanvasStoreClass.components[0].typeId ?
            CanvasStoreClass.components[0].typeId :
            null;

        let find = this.myComponentsPermissions.find(
            (comp) => comp.componentId === selectedComponentId
        );

        this.allowToEdit = find ? true : false;
    }

    updateComponentApi(data) {
        api("components/updateComponent", data);
        if (data.title) {
            updateComponent(data.clientId, "title", data.title);
        }

        if (data.npm) {
            updateComponent(data.clientId, "npm", data.npm);
        }
    }

    addField() {
        let allProperties = CanvasStoreClass.selectedProperties;
        let name = "default";
        let numberOfDefault = 0;

        allProperties.forEach((item) => {
            if (item.id && item.id.includes("default")) {
                numberOfDefault++;
            }
        });

        if (numberOfDefault) {
            name += numberOfDefault;
        }

        const field = {
            type: "inputText",
            id: name,
            label: name,
            name: "",
            desc: "",
            newField: true,
        };

        CanvasStoreClass.addProperty(field);
    }

    deleteField() {
        removeLocalStorage("cacheData"); //try to find if we have cache data
        let propertyId = CanvasPropertiesStoreClass.editPropertyId;
        CanvasStoreClass.deleteProperty(propertyId);
        let component =
            CanvasStoreClass.components && CanvasStoreClass.components[0];
        let componentId = component && component.typeId;
        let fieldId =
            CanvasPropertiesStoreClass.editPropertyData &&
            CanvasPropertiesStoreClass.editPropertyData.fieldId ?
            CanvasPropertiesStoreClass.editPropertyData.fieldId :
            null;

        CanvasPropertiesStoreClass.setEditPropertyData(false);
        this.showSaveButton = true;
        deleteProperty(componentId, propertyId);

        this.deleteFields.push({
            componentId,
            fieldId
        });
    }

    emptyDeleteFields() {
        this.deleteFields = [];
    }

    setShowSaveButton(bool) {
        this.showSaveButton = bool;
    }

    saveFields() {
        removeLocalStorage("cacheData"); //try to find if we have cache data

        this.setShowSaveButton(false);
        let newFields = toJS(CanvasStoreClass.selectedProperties);
        let newFieldsStringify = JSON.stringify(newFields);
        let deleteFields = JSON.stringify(toJS(this.deleteFields));

        let clientId =
            CanvasStoreClass.components &&
            CanvasStoreClass.components[0] &&
            CanvasStoreClass.components[0].typeId;

        saveProperties(clientId, newFields); //save on client side

        //save on server
        api("components/saveFields", {
            fields: newFieldsStringify,
            clientId,
            deleteFields,
        });

        let newProperties = CanvasStoreClass.selectedProperties.map((item) => {
            if (item.newField) {
                item.newField = false;
            }
            return item
        });

        CanvasStoreClass.setAllProperties(newProperties);
    }
}

decorate(EditPropertyStore, {
    canEdit: observable,
    showSaveButton: observable,
});

export let EditPropertyStoreClass = new EditPropertyStore();
export default createContext(EditPropertyStoreClass);