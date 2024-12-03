// import Jinno from "jinno";
import React from "react";

/* eslint import/no-webpack-loader-syntax: off */
import {
    GlobalStoreClass
} from "../../stores/GlobalStore";

let counter = 0; //the number of the components we added

document.addEventListener("getComponentData", function(e) {
    //listener after select a component
    if (e && e.detail && e.detail.className) {
        let className = e.detail.className;

        let element = document.getElementsByClassName(className) ?
            document.getElementsByClassName(className)[0] :
            false;
        let props = {};

        try {
            //json parse to the props
            props = e.detail.props ? JSON.parse(e.detail.props) : {};
        } catch (e) {}

        let params = {
            width: e.detail.width,
            height: e.detail.height
        };

        let style = e.detail.style;
        params.fromReactHover = true
        if (element) {
            addToJinno(element, props, params, style);
        }
    }
});

//add the component into jinno
function addToJinno(element, props = {}, params, style = {}) {
    if (!element) {
        return;
    }

    if (params.width) {
        style.width = params.width;
    }
    if (params.height) {
        style.height = params.height;
    }
    props.hiddenStyle = style;
    GlobalStoreClass.setReactDetectionOpen(false, true);

    const ComponentWithHTML = (innerProps) => {
        const element = React.useRef(null);
        React.useEffect(() => {
            if (element && element.current) {
                element.current.appendChild(innerProps.children); //append the html to the component
            }
        }, []);

        return <div ref = {
            element
        }
        style = {
            innerProps.hiddenStyle
        } > < /div>;
    };

    const ComponentWrapper = (innerProps) => {
        //the component with the clone html
        return ( <
            ComponentWithHTML hiddenStyle = {
                innerProps.hiddenStyle
            } > {
                element.cloneNode(true)
            } <
            /ComponentWithHTML>
        );
    };

    counter++;

    // Jinno(ComponentWrapper, '',`DontSaveMe${counter}`, props, params);
}