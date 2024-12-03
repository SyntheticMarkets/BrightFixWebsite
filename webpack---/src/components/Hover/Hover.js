import $ from "jquery";
import * as utils from "../utils";
import {
    StyleStoreClass
} from "../../stores/StyleStore";
// import { createMeasurements } from "./Measure";
import {
    MeasuresStoreClass
} from "../../stores/MeasuresStore";
import {
    GlobalStoreClass
} from "../../stores/GlobalStore";
import {
    InspectStoreClass
} from "../../stores/InspectStore";
import {
    CanvasStoreClass
} from "../../stores/CanvasStore";
import variables from "../../variables";

class HoverClass {
    constructor() {
        this.lastElement = null;
        this.isDetectMode = true;
        this.fullStoryStarted = false;
        this.isDev = null;

        this.detectRightClick();

        $(document).mousemove(this.mouseMove.bind(this));

        setTimeout(() => {
            if (window.chrome && window.chrome.runtime) {
                if (window.chrome.runtime.onMessage) {
                    window.chrome.runtime.onMessage.addListener(
                        this.onMessage.bind(this)
                    );
                }

                if (
                    window.chrome.runtime.sendMessage &&
                    variables.env === "chromeExtension"
                ) {
                    window.chrome.runtime.sendMessage({
                            to: "background",
                            message: "what env?"
                        },
                        (data) => {
                            this.isDev = data.env === "development";
                        }
                    );
                }
            }
        }, 1);

        $(document).keyup((e) => {
            if (e.key === "Escape" && this.isDetectMode) {
                InspectStoreClass.toggleDetect(false);
                GlobalStoreClass.toggleDetectBox(false);
            }
        });
    }

    clickedOnFixMeRightClick() {
        MeasuresStoreClass.setContextMenuOpen(false);
        InspectStoreClass.chooseElement(null, this.lastRightClick, true);
    }
    detectRightClick() {
        window.addEventListener("mousedown", (e) => {
            if (e.which === 3 || e.button === 2) {
                let url = window.location.href.toString();

                if (
                    url.includes("docs.google.com") ||
                    url.includes("figma.com") ||
                    url.includes("webflow.com")
                ) {
                    return;
                }

                if (e.target.id !== "fixMeDetectBox") {
                    this.lastRightClick = e.target;
                }

                let sX = e.clientX;
                let sY = e.clientY;

                this.canHideContext = false;

                let open = "right";
                if (e.clientY > window.innerHeight / 2) {
                    open = "left";
                } else {
                    open = "right";
                }

                if (open === "right" && sX > window.innerWidth - 260) {
                    sX = window.innerWidth - 260;
                } else if (open === "left" && sX < 255) {
                    sX = 255;
                }

                MeasuresStoreClass.setContextMenuOpen(true, sX, sY, open);
            }
        });

        document.addEventListener("mouseout", (e) => {
            let t = e.relatedTarget || e.toElement;

            let isFixMe =
                e && e.target && e.target.id && e.target.id === "fixMeDetectBox" ?
                true :
                false;

            if (MeasuresStoreClass.contextMenuOpen && !t && !isFixMe) {
                MeasuresStoreClass.setContextMenuOpen(false);
            }
        });
    }

    changeDetectMode(bool) {
        this.isDetectMode = bool;
    }

    onMessage(message, sender, sendResponse) {
        if (message.to !== "Hover") {
            return;
        }

        if (message.isDetectMode !== undefined) {
            // if the detect mode has changed
            this.isDetectMode = message.isDetectMode;

            if (this.isDetectMode) {
                this.startFullStory();
            }

            if (this.isDetectMode) {
                if (message.sendEvent !== false) {
                    // utils.trackEvent(
                    //   `Start hovering${
                    //     message.sendEvent === "fromBackground"
                    //       ? " from background icon"
                    //       : ""
                    //   }`
                    // );
                }
            } else {
                if (message.sendEvent !== false) {
                    // utils.trackEvent("Stop hovering");
                }
                this.hide(true);
            }
        }
    }

    async startFullStory() {
        if (
            this.fullStoryStarted /*|| this.isDev*/ ||
            utils.isDev() ||
            variables.env !== "chromeExtension"
        ) {
            return;
        }

        this.fullStoryStarted = true;

        const script = document.createElement("script");
        script.textContent = `
        window['_fs_debug'] = false;
        window['_fs_host'] = 'fullstory.com';
        window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
        window['_fs_org'] = 'WB80F';
        window['_fs_namespace'] = 'FS';
        (function(m,n,e,t,l,o,g,y){
            if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
            g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
            o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
            y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
            g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
            g.anonymize=function(){g.identify(!!0)};
            g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
            g.log = function(a,b){g("log",[a,b])};
            g.consent=function(a){g("consent",!arguments.length||a)};
            g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
            g.clearUserCookie=function(){};
            g._w={};y='XMLHttpRequest';g._w[y]=m[y];y='fetch';g._w[y]=m[y];
            if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};
            g._v="1.2.0";
        })(window,document,window['_fs_namespace'],'script','user');
        `;
        (document.head || document.documentElement).appendChild(script);
        script.remove();
    }

    mouseMove(e) {
        if (
            MeasuresStoreClass.contextMenuOpen &&
            e.target &&
            e.target.id !== "fixMeDetectBox"
        ) {
            if (!this.canHideContext) {
                // setTimeout(()=>{
                this.canHideContext = true;
                // },500)
            } else if (this.canHideContext) {
                MeasuresStoreClass.setContextMenuOpen(false);
            }
        }

        if (!e || !e.target || !this.isDetectMode) {
            return;
        }

        const elm = e.target;
        const {
            className
        } = elm;

        if (
            this.lastElement !== elm &&
            typeof className === "string" &&
            !className.includes("zloof")
        ) {
            const fixMeDiv = utils.checkIfItsFixMeDiv(elm);

            if (fixMeDiv || elm === StyleStoreClass.elm) {
                MeasuresStoreClass.toggleShowHover(false);
            } else if (!GlobalStoreClass.isTakingPrintScreen) {
                MeasuresStoreClass.toggleShowHover(true);
            }

            if (InspectStoreClass.isDetectMode && StyleStoreClass.elm && elm) {
                MeasuresStoreClass.setShowRulers(false);

                if (!CanvasStoreClass.canvasOpen) {
                    MeasuresStoreClass.createMeasurements({
                        $anchor: StyleStoreClass.elm,
                        $target: elm,
                    });
                }
            }

            if (fixMeDiv) {
                return;
            }

            this.lastElement = elm;
            this.updateElementPosition(elm);
        }
    }

    updateElementPosition(elm) {
        elm = elm ? elm : this.lastElement;
        const cssPosition = this.getPosition(elm, true, true); // get the position of the css
        const cssPositionForHover = this.getPosition(elm, true, false); // get the position of the css

        MeasuresStoreClass.updateHoverStyle(cssPositionForHover);

        MeasuresStoreClass.setShowRulers(true);
        MeasuresStoreClass.updateRuler("left", `${cssPosition.left}px`);
        MeasuresStoreClass.updateRuler(
            "right",
            `${cssPosition.left + cssPosition.width - 1}px`
        );
        MeasuresStoreClass.updateRuler("top", `${cssPosition.top}px`);
        MeasuresStoreClass.updateRuler(
            "bottom",
            `${cssPosition.top + cssPosition.height - 1}px`
        );
    }

    hide(removeBorder) {
        if (removeBorder) {
            MeasuresStoreClass.setShowRulers(false);
            // $(`.${styles.border}`).hide()
        }

        MeasuresStoreClass.toggleShowHover(false);
        // $(`.${styles.hover}, .ruler11`).hide();
        $(`.ruler11`).hide();
    }

    getPosition(elm, returnInt, usePositionFixed = false) {
        const position = utils.getPosition(elm, returnInt, false, usePositionFixed); // elm.getBoundingClientRect()

        return {
            width: position.width,
            height: position.height,
            top: position.top,
            left: position.left,
        };
    }
}
export const Hover = new HoverClass();