// import "jquery/dist/jquery.min";
import "mobx-react-lite/batchingForReactDom";
import "./assets/css/Changes.css";
import ReactDOM from "react-dom";
import React from "react";
import "./App.css";
import "./components/colors.css";
import "./assets/css/style.css";
import "./stores/UserStore";
import "./stores/PageDataStore";
import "./components/HoverReact/HoverReact";
import WrappedJssComponent from "./components/WrappedJssComponent/WrappedJssComponent";
import variables from "./variables";

window.isChromeExtension = true;

if (window.isChromeExtension) {
    function injectScript(src) {
        const s = document.createElement("script");
        s.src = chrome.runtime.getURL(src);
        s.type = "module"; // <-- Add this line for ESM module support
        s.onload = () => s.remove();
        (document.head || document.documentElement).append(s);
    }

    injectScript("inject/JinnoHelpers.js");
    injectScript("inject/HoverReactInjected.js");
    injectScript("inject/HoverReactDetectOnPage.js");
    injectScript("inject/CatchErrors.js");
    injectScript("inject/ElementsStore.js");
    injectScript("inject/PathClass.js");
    injectScript("inject/CodeSnapshot.js");
}

window.onload = () => {
    load();
};

if (document.readyState === "complete") {
    load();
}

function load() {
    let url = window.location.href.toString();
    if (!url.includes("http://localhost:3000/share/") &&
        !url.includes("http://fixme.us-east-1.elasticbeanstalk.com") &&
        !url.includes("jinno.io")
    ) {
        const rootEl = document.createElement("span");
        rootEl.id = "superDeveloper111";

        document.body.appendChild(rootEl);
        ReactDOM.render( <
            WrappedJssComponent / > ,
            document.getElementById("superDeveloper111")
        );

        const installPixel = document.createElement("span");
        installPixel.id = "jinnoInstalled";

        document.body.appendChild(installPixel);
        if (document.getElementById("jinno_install_extension") !== null) {
            document.getElementById("jinno_install_extension").remove(); //remove the install popup
        }
    }
}
if (variables.isEditor) {
    document.documentElement.style.setProperty("--xx-bg-blur", "rgb(64, 65, 77)");

    document.documentElement.style.setProperty(
        "--xx-bg-shadow",
        "0 0px 15px rgba(0, 0, 0, 0.2), 0 0px 15px rgba(50, 50, 50, 0.3)"
    );
}