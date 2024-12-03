import {
    createContext
} from "react";
import {
    decorate,
    observable
} from "mobx";
import getAllComponent from "../components/Canvas/CanvasAll.js";
import {
    StyleStoreClass
} from "./StyleStore";
import {
    api
} from "../components/utils";
import {
    InspectStoreClass
} from "./InspectStore.js";
import {
    getMySDKComponents
} from "../components/Canvas/JinnoConnector";
import variables from "../variables";
import React from "react";
import {
    CanvasStoreClass
} from "./CanvasStore.js";
import {
    HoverStoreClass
} from "./HoverStore.js";
import {
    CodeStoreClass
} from "./CodeStore.js";

class SearchStore {
    componentsList = [];
    myComponentsListOfIds = [];
    myComponentsList = [];
    timeout = null;
    searchOpen = false;
    searchValue = "";
    constructor() {
        // setTimeout(this.test.bind(this), 1000);
    }

    addToMyComponents(componentId) {
        return;
        api("usersComponents/addComponent", {
            id: componentId,
        });

        let addedComponent = this.componentsList.find(
            (comp) => comp.typeId === componentId
        );

        if (addedComponent) {
            this.myComponentsList.push(addedComponent);
        }
    }
    removeFromMyComponents(componentId) {
        return;
        api("usersComponents/removeComponent", {
            id: componentId,
        });

        this.myComponentsList = this.myComponentsList.filter(
            (comp) => comp.typeId !== componentId
        );
    }

    async loadMyComponents() {
        return;
        if (this.myComponentsListOfIds.length) {
            return this.myComponentsListOfIds;
        }

        let myComponentIds = [];
        try {
            myComponentIds = await api("usersComponents/getUserComponents", {});
        } catch (e) {}

        if (myComponentIds) {
            this.myComponentsListOfIds = myComponentIds.map(
                (item) => item.componentId
            );
        }
    }

    async resetSearch() {
        let allComponents = await getAllComponent();

        this.componentsList = allComponents
            .filter((item) => !item.hideFromMainScreen)
            .map((component) => {
                //convert all the tags to lower case
                if (component.tags) {
                    component.tagsLowerCase = component.tags.map((item) =>
                        item.toLowerCase()
                    );
                }
                return component;
            });
    }

    setSearchOpen(bool) {
        if (bool !== undefined) {
            this.searchOpen = bool;
        } else {
            this.searchOpen = !bool;
        }

        if (this.searchOpen) {
            InspectStoreClass.toggleDetect(false);
        }

        if (!this.searchOpen) {
            this.resetSearch();
        }

        StyleStoreClass.removeSelector();
    }

    async search(newValue, myComponents) {
        let newValueLowerCase = newValue.toLowerCase();
        let allComponents = await getAllComponent();
        if (myComponents) {
            //add the sdk components
            let mySDKComponents = getMySDKComponents();
            let mySdkIds = mySDKComponents.map((item) => item.typeId);

            allComponents = allComponents.concat(mySDKComponents);
            myComponents = myComponents.concat(mySdkIds);
        }

        //if the component is already in my components we will remove it from here
        return allComponents
            .filter((component) => {
                if (!myComponents &&
                    this.myComponentsListOfIds.includes(component.typeId)
                ) {
                    return false;
                }

                return true;
            })
            .filter((component) => {
                if (
                    component.hideFromOtherUsers &&
                    variables.env === "chromeExtension"
                ) {
                    return false;
                }

                let ifItMyComponent = !myComponents ||
                    (myComponents && myComponents.includes(component.typeId)); //if it's a search on my components

                if (
                    (!newValue && ifItMyComponent) ||
                    (component.title &&
                        component.title.toLowerCase().includes(newValueLowerCase) &&
                        ifItMyComponent)
                ) {
                    //if we found the tag inside the tiel
                    return true;
                } else if (component.tagsLowerCase && ifItMyComponent) {
                    // if we found it in one of the tags
                    let tag = component.tagsLowerCase.find((tag) =>
                        tag.includes(newValueLowerCase)
                    );
                    if (tag) {
                        return true;
                    }
                }

                return false;
            });
    }

    async setSearch(newValue, openSearch = true) {
        this.searchValue = newValue;

        if (newValue === undefined && openSearch) {
            this.setSearchOpen(false);
            return;
        }

        if (openSearch) {
            this.setSearchOpen(true);
        }

        this.componentsList = await this.search(newValue);
        // this.myComponentsList = await this.search(
        //   newValue,
        //   this.myComponentsListOfIds
        // );

        StyleStoreClass.removeSelector();
    }
}

decorate(SearchStore, {
    componentsList: observable,
    myComponentsList: observable,
    searchOpen: observable,
    searchValue: observable,
});

export let SearchStoreClass = new SearchStore();
export default createContext(SearchStoreClass);