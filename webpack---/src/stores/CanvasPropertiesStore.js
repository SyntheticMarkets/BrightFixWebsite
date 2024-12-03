import {
    createContext
} from "react";
import {
    decorate,
    observable,
    toJS
} from "mobx";
import {
    CanvasStoreClass
} from "./CanvasStore";
import {
    checkUrl,
    getPosition
} from "../components/utils";
import getAllComponent from "../components/Canvas/CanvasAll.js";
import {
    GlobalStoreClass
} from "./GlobalStore";
import {
    InspectStoreClass
} from "./InspectStore";
import {
    StyleStoreClass
} from "./StyleStore";
import {
    EditPropertyStoreClass
} from "./EditPropertyStore";

class CanvasPropertiesStore {
    editJson = false;
    fromTop = 200;
    width = 360;
    id;
    selectedTab = "props";
    openDefaultProperty;
    editPropertyData = {};
    editPropertyId;
    editPropertyPosition = {};
    clickOnInput = false;

    constructor() {
        this.checkPropertyInUrl();
    }

    addNewField() {}

    editFieldsFromJinnoConnector(newProps) {
        if (this.lastProps === JSON.stringify(newProps)) {
            return;
        }

        this.lastProps = JSON.stringify(newProps);
        let properties = CanvasStoreClass.selectedProperties;
        let newPropsArray = Object.keys(newProps);
        let updatePropertiesInCanvasStore = false;
        let component =
            CanvasStoreClass.components && CanvasStoreClass.components[0] ?
            CanvasStoreClass.components[0] :
            null;

        //update the canvas props
        newPropsArray.forEach((key) => {
            if (key === "injectComponentId" || key === "hiddenStyle") {
                return;
            }

            let value = newProps[key];

            let find = properties.find((property) => property.id === key);

            if (find) {
                //update the prop
                if (typeof value === "object") {
                    value = JSON.stringify(value);
                }

                if (find) {
                    find.value = value;
                    find.type = findType(value);
                    updatePropertiesInCanvasStore = true;
                    if (component) {
                        component.props[key] = value;
                    }
                }
            } else {
                //add new prop
                properties.push({
                    type: findType(value),
                    id: key,
                    label: key,
                    value,
                });
                if (component) {
                    component.props[key] = value;
                }
                updatePropertiesInCanvasStore = true;
            }
        });

        //delete canvas props
        let newProperties = properties.filter((item) => {
            let find = newPropsArray.find((prop) => prop === item.id);

            if (!find) {
                if (component) {
                    delete component.props[item.id];
                }
                //if the user has deleted the property
                updatePropertiesInCanvasStore = true;
                return false;
            }
            return true;
        });

        if (updatePropertiesInCanvasStore) {
            //we need to update the properties in the canvasStore
            CanvasStoreClass.selectedProperties = newProperties;
            EditPropertyStoreClass.setShowSaveButton(true);
        }

        function findType(value) {
            if (typeof value === "boolean") {
                return "checkbox";
            } else if (typeof value === "number") {
                return "input";
            } else if (typeof value === "function") {
                return "function";
            } else {
                return "inputText";
            }
        }
    }

    checkIfCloseProperty(fromEditJson, fromInput) {
        if (fromInput) {
            //if the user click on the input cancel the close
            this.clickOnInput = true;
        }

        if (fromEditJson) {
            setTimeout(() => {
                if (!this.clickOnInput) {
                    this.setEditPropertyData(true);
                } else {
                    this.clickOnInput = false;
                }
            }, 100);
        }
    }

    setEditPropertyData(data, elm) {
        setTimeout(() => {
            this.clickOnInput = false;
        }, 50);

        if (data && data !== undefined) {
            //update the data
            this.editPropertyData = data;
            this.editPropertyId = data.id;
        } else {
            //close the editProperty
            this.editPropertyData = {};
            this.editPropertyId = null;
        }

        if (elm) {
            let fromTop;
            let fromLeft;

            //calculate from top
            let offsetHeight = elm.offsetHeight; //the element height
            let headerHeight = 43; //the header height
            let elementTop = getPosition(elm, true).top; // the element position from top
            fromTop = elementTop - headerHeight + offsetHeight / 2 + 2;

            //calculate left
            let position = getPosition(elm, true);
            fromLeft = position.left + 164;

            this.editPropertyPosition = {
                top: `${fromTop}px`,
                left: fromLeft
            };
        }
    }

    setSelectedTab(newTab) {
        this.selectedTab = newTab;
        InspectStoreClass.toggleDetect(
            newTab === "design" ? true : false,
            newTab === "design" ? true : false
        );
        StyleStoreClass.removeSelector("");
    }

    checkPropertyInUrl() {
        setTimeout(() => {
            this.openDefaultProperty = checkUrl(2);
            if (this.openDefaultProperty && CanvasStoreClass.selectedFunctions) {
                let findFunc = CanvasStoreClass.selectedFunctions.find(
                    (item) => item.id === this.openDefaultProperty
                );

                if (findFunc) {
                    GlobalStoreClass.changeTreeExpanded(["functions"]);
                }
            }
        }, 1000);
    }

    openEditJson(data, element) {
        data = toJS(data);
        CanvasStoreClass.setToolTipData(null, null, null);
        let selectedComponent = CanvasStoreClass.components.find(
            (comp) => comp.id === CanvasStoreClass.selectedComponentId
        ); //find the updated data
        selectedComponent.properties &&
            selectedComponent.properties.forEach((property) => {
                if (property.id === data.id) {
                    data = property;
                    this.id = data.id;
                } else if (property.type === "section") {
                    let findItem = property.items.find(
                        (smallProperty) => smallProperty.id === data.id
                    );

                    if (findItem) {
                        this.id = data.id;
                        data = findItem;
                    }
                }
            });

        let items = data.items;
        if (data.value && data.value.length && typeof data.value === "object") {
            //remove it from the edit json
            items = data.value.map((value, index) => {
                let itemsWithValues = items.map((item) => {
                    let copyItem = Object.assign({}, item);
                    copyItem.value = value[item.id];
                    copyItem.index = index;

                    return copyItem;
                });

                return {
                    type: "section",
                    items: itemsWithValues,
                    canDelete: true,
                    index,
                    // id: data.id,
                };
            });
        } else {
            items = [{
                type: "section",
                items,
                canDelete: true,
                index: 0,
                id: data.id
            }, ];
        }

        let top;
        if (element) {
            let offsetHeight = element.offsetHeight; //the element height
            let headerHeight = 48; //the header height
            let elementTop = getPosition(element, true).top; // the element position from top
            top = elementTop - headerHeight + offsetHeight / 2;
            top = 0;
        }
        this.fromTop = top;

        if (data.width) {
            this.width = data.width;
        } else {
            this.width = 360;
        }

        this.editJson = [{
            nodeId: data.id,
            label: data.label,
            data: items,
        }, ];
    }

    getProps() {
        //get the props from the editJson
        if (this.editJson && this.editJson[0] && this.editJson[0].data) {
            return toJS(this.editJson[0].data).map((item) => {
                //build the new data for the props
                let newJson = {};

                item.items.forEach((label) => {
                    newJson[label.id] = label.value;
                });

                return newJson;
            });
        }

        return [];
    }

    removeRow(item) {
        let deleteIndex = item.index;
        if (this.editJson && this.editJson[0] && this.editJson[0].data) {
            this.editJson[0].data = this.editJson[0].data.filter((item, index) => {
                return deleteIndex !== index;
            }); //delete if from the edit box

            let newData = this.getProps();
            let id =
                this.editJson && this.editJson[0] && this.editJson[0].nodeId ?
                this.editJson[0].nodeId :
                "";

            CanvasStoreClass.onChange(id, newData); //delete it from the component props
        }
    }

    onSort(oldIndex, newIndex) {
        let properties = toJS(CanvasStoreClass.selectedProperties);
        if (properties) {
            properties = properties.map((item, index) => {
                //update the index again
                item.index = index;

                if (newIndex > oldIndex && index >= newIndex) {
                    //if element addef before this element
                    item.index--;
                } else if (newIndex < oldIndex && index >= newIndex) {
                    item.index++;
                }

                return item;
            });

            if (properties[oldIndex]) {
                properties[oldIndex].index = newIndex;
            }

            properties = properties.sort(function(a, b) {
                return parseFloat(a.index) - parseFloat(b.index);
            });
        }

        CanvasStoreClass.setAllProperties(properties);
        EditPropertyStoreClass.setShowSaveButton(true);
    }

    onChange(data, newValue) {
        if (
            this.editJson &&
            this.editJson[0] &&
            this.editJson[0].data &&
            this.editJson[0].data[data.index] &&
            this.editJson[0].data[data.index].items
        ) {
            //change it on the editJson list
            this.editJson[0].data[data.index].items.map((item) => {
                if (item.id === data.id) {
                    item.value = newValue;
                }
                return item;
            });

            let id =
                this.editJson && this.editJson[0] && this.editJson[0].nodeId ?
                this.editJson[0].nodeId :
                "";
            CanvasStoreClass.onChange(id, this.getProps()); //change the props of the element
        }
    }

    async addRow() {
        if (this.editJson && this.editJson[0] && this.editJson[0].data) {
            let selectedComponent = CanvasStoreClass.components.find(
                (comp) => comp.id === CanvasStoreClass.selectedComponentId
            ); //find the updated data
            let allComponents = await getAllComponent();
            let oldComponent = allComponents.find(
                (comp) => comp.typeId === selectedComponent.typeId
            ); //find the regular component before that we edit the component
            let items = [];

            let findNodeId = this.editJson[0].nodeId;
            oldComponent.properties.forEach((property) => {
                //find the right property
                if (property.id === findNodeId) {
                    items = property.items;
                } else if (property.type === "section") {
                    let find = property.items.find(
                        (minProperty) => minProperty.id === findNodeId
                    );
                    if (find) {
                        items = find.items;
                    }
                }
            });

            let addJson = {
                type: "section",
                items,
                canDelete: true,
                index: this.editJson[0].data.length,
            };

            let newEditJson = toJS(this.editJson);

            addJson.items = addJson.items.map((item) => {
                item.value = "";
                item.index = this.editJson[0].data.length;

                return item;
            });

            newEditJson[0].data.push(addJson);
            this.editJson = newEditJson;
        }
    }

    closeEditJson() {
        this.editJson = false;
    }
}

decorate(CanvasPropertiesStore, {
    editJson: observable,
    openDefaultProperty: observable,
    selectedTab: observable,
    fromTop: observable,
    width: observable,
    editPropertyData: observable,
    editPropertyId: observable,
    editPropertyPosition: observable,
});

export let CanvasPropertiesStoreClass = new CanvasPropertiesStore();
export default createContext(CanvasPropertiesStoreClass);