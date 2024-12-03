import $ from "jquery";
import {
    UserStoreClass
} from "../stores/UserStore";
import {
    CanvasStoreClass
} from "../stores/CanvasStore";
import variables from "../variables";
import React, {
    useRef,
    useEffect
} from "react";

export function getPosition(
    elm,
    returnInt = false,
    supportPositionFixed = false,
    usePositionFixed = false
) {
    if (!elm || !elm.getBoundingClientRect) {
        //delete this
        return {};
    }

    const position = elm.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(elm);

    const {
        width
    } = position;
    const {
        height
    } = position;

    const elmPosition = computedStyle.position;
    const top =
        (supportPositionFixed && elmPosition === "fixed") || usePositionFixed ?
        position.top :
        getScrollY(elm) + position.y;
    const left =
        (supportPositionFixed && elmPosition === "fixed") || usePositionFixed ?
        position.left :
        window.pageXOffset + position.x;

    return {
        width: returnInt ? width : `${width}px`,
        height: returnInt ? height : `${height}px`,
        top: returnInt ? top : `${top}px`,
        left: returnInt ? left : `${left}px`,
        position: elmPosition === "fixed" ? "fixed" : "absolute",
    };
}

function getScrollY(element) {
    if (!element) {
        return;
    }

    // Check if the element itself has a non-zero scrollTop
    if (element.scrollTop !== 0) {
        return element.scrollTop;
    }

    // If the element has no scrollTop, check its ancestors up to the window
    let currentElement = element;
    while (currentElement.parentElement) {
        currentElement = currentElement.parentElement;
        if (currentElement.scrollTop !== 0) {
            return currentElement.scrollTop;
        }
    }

    // Check the window scroll position as a last resort
    if (window.scrollY !== 0) {
        return window.scrollY;
    }

    // If no element is found with a non-zero scrollTop, return 0
    return 0;
}

export function getPositionForModal(
    elm,
    ModalWidth,
    returnString = false,
    openToBottom = false
) {
    if (!elm) {
        return {};
    }

    let bodyRect = document.body.getBoundingClientRect(),
        elemRect = elm.getBoundingClientRect(),
        top = elemRect.top + getScrollY(elm),
        offsetWidth = getPosition(elm, true) ? getPosition(elm, true).width : 0,
        offsetHeight = getPosition(elm, true) ? getPosition(elm, true).height : 0,
        left = elemRect.left /*- bodyRect.left*/ + offsetWidth + 2,
        right = bodyRect.right /*- elemRect.right*/ + offsetWidth + 6;

    const elementIsTooLong = offsetWidth + ModalWidth > window.innerWidth;

    if (left > window.innerWidth - ModalWidth) {
        //open the element on the right
        left = window.innerWidth - ModalWidth - right;
    }

    if (elementIsTooLong || left < 0) {
        left = window.innerWidth - ModalWidth;
        top += offsetHeight;
    }

    if (openToBottom) {
        top = offsetHeight + top;

        left = elemRect.left - ModalWidth / 3;
    }

    if (returnString) {
        return {
            top: `${top}px`,
            left: `${left}px`
        };
    }

    return {
        top,
        left
    };
}

export function getFromUrl(param) {
    var url_string = window.location.href.toString();
    var url = new URL(url_string);

    var c = url.searchParams.get(param);

    return c;
}

export function setLocalStorage(id, data) {
    let jinno = {};
    if (!localStorage.jinno) {
        try {
            jinno = JSON.parse(localStorage.jinno);
        } catch (e) {}
    }

    jinno[id] = data;
    localStorage.jinno = JSON.stringify(jinno);
}

export function getLocalStorage(id) {
    let jinno = {};

    if (localStorage.jinno) {
        try {
            jinno = JSON.parse(localStorage.jinno);
        } catch (e) {}
    }

    return jinno && jinno[id] ? jinno[id] : null;
}

export function removeLocalStorage(id) {
    let jinno = {};
    try {
        jinno = JSON.parse(localStorage.jinno);
    } catch (e) {}

    delete jinno[id];

    localStorage.jinno = JSON.stringify(jinno);
}

export function trackEvent(event, params = {}) {
    if (!CanvasStoreClass.canvasOpen &&
        !CanvasStoreClass.showControlBar &&
        event !== "Page load with debug source1" &&
        event !== "Jinno opened by default" &&
        event !== "Page load with localhost react and without debug source" &&
        event !== "Page load with localhost react and nextJS"
    ) {
        return;
    }

    if (variables.env === "web") {
        return;
    }
    window.chrome.runtime.sendMessage({
        to: "mixpanel",
        track: event,
        params,
    });
}

export function buildFunc(params) {
    let func = "(";
    params &&
        params.forEach((param, index) => {
            if (index) {
                func += ", ";
            }

            if (param.name) {
                func += param.name;
            }
        });
    func += ")";

    return func;
}

export function convertToCodeName(type) {
    if (type === "checkbox") {
        return "Boolean";
    } else if (type === "number") {
        return "Number";
    } else if (type === "list" || type === "inputText" || type === "Buttons") {
        return "String";
    } else if (type === "Json") {
        return "Array";
    }

    return type;
}
export function scrollTo(selector) {
    if ($(selector).length && !isScrolledIntoView($(selector))) {
        $([document.documentElement, document.body]).animate({
                scrollTop: $(selector).offset().top + -(window.innerHeight / 2),
            },
            300
        );
    }

    function isScrolledIntoView(elem) {
        const docViewTop = $(window).scrollTop();
        const docViewBottom = docViewTop + $(window).height();

        const elemTop = $(elem).offset().top;
        const elemBottom = elemTop + $(elem).height();

        return elemBottom <= docViewBottom && elemTop >= docViewTop;
    }
}

export function checkUrl(index) {
    // if (window.isAws) {
    index = index + 1;
    // }

    if (!window.location ||
        !window.location.pathname ||
        variables === "chromeExtension"
    ) {
        return false;
    }

    let pathName =
        window.location.pathname && window.location.pathname.toString();
    let pathArray = pathName.split("/");

    if (pathArray && pathArray[index]) {
        return pathArray[index];
    }

    return false;
}

export function isDev() {
    if (variables.env === "chromeExtension") {
        return true;
    } else {
        return false;
    }
}
export function copy(str) {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
}

export function OutsideClickHandler({
    children,
    onOutsideClick
}) {
    const ref = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onOutsideClick();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onOutsideClick]);

    return <div ref = {
        ref
    } > {
        children
    } < /div>;
}

export function calculateDistance(pos1, pos2) {
    const deltaX = pos1.left - pos2.left;
    const deltaY = pos1.top - pos2.top;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

export function getBaseUrl(versionTwo) {
    const env = process.env.NODE_ENV || "development";

    if ( /*env === "development" ||*/ localStorage.useLocalhost) {
        if (versionTwo) {
            return "http://localhost:3002";
        } else if (!versionTwo) {
            return "http://localhost:3000";
        }
    }

    return "https://api.jinno.app";
}

export function getEnv() {
    return process.env.NODE_ENV || "development";
}

async function getApiBaseUrl() {
    const env = process.env.NODE_ENV || "development";

    if (
        env !== "development" &&
        variables.env === "chromeExtension" &&
        !variables.isAws
    ) {
        return "https://jinno.io";
    }

    if (
        variables.env === "chromeExtension" &&
        !window.isAws &&
        !window.location.href.toString().includes("jinno.io")
    ) {
        return "http://localhost:3000";
    }

    if (
        env === "development" &&
        !window.isAws &&
        !window.location.href.toString().includes("jinno.io")
    ) {
        return "http://localhost:3000";
    }

    if (!window.location.href.toString().includes("https")) {
        if (window.location.hostname.includes("localhost")) {
            return "http://localhost:3000";
        } else {
            return "http://" + window.location.hostname;
        }
    }

    return "https://" + window.location.hostname;
}

export async function api(
    url,
    data,
    overwriteBaseUrl = false,
    versionTwo = false
) {
    if (!UserStoreClass.session &&
        !url.includes("userInfo") &&
        !url.includes("getHistory") &&
        !url.includes("getComponents") &&
        !overwriteBaseUrl
    ) {
        return;
    }

    if (!data) {
        data = {};
    }
    if (UserStoreClass.session) {
        data.session = UserStoreClass.session;
    }

    let baseUrl;
    if (overwriteBaseUrl) {
        const baseUrl = overwriteBaseUrl;
        url = `${baseUrl}/${url}`;
    } else if (versionTwo) {
        baseUrl = getBaseUrl(versionTwo);
        url = `${baseUrl}/v2/${url}`;
    } else {
        baseUrl = getBaseUrl(versionTwo);
        url = `${baseUrl}/api/${url}`;
    }

    if (variables.env === "chromeExtension") {
        return new Promise((resolved, reject) => {
            window.chrome.runtime.sendMessage({
                    to: "background",
                    message: "api",
                    data,
                    url
                },
                (result) => {
                    if (typeof result === "string" && overwriteBaseUrl) {
                        resolved(result);
                    }
                    if (result.error) {
                        reject(result);
                    } else {
                        resolved(versionTwo ? result : result.success);
                    }
                }
            );
        });
    }

    return new Promise(async (resolved, reject) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.session}`,
                    DNT: "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data),
            });

            const responseJSON = await response.json();
            if (typeof responseJSON === "object") {
                responseJSON.status = response.status;
            }

            if (responseJSON.error) {
                reject(responseJSON);
            } else {
                resolved(versionTwo ? responseJSON : responseJSON.success);
            }
        } catch (e) {
            return new Promise((resolved) => {
                resolved({
                    error: "unone"
                });
            });
        }
    });
}

let planString = "";
let codeString = "";
let errorString = "";
let lastTaskId = null;
let lastSessionTask = null;
export function buildStreaming(data) {
    if (data.taskId !== lastTaskId || data.sessionTask !== lastSessionTask) {
        planString = "";
        codeString = "";
        errorString = "";
        lastSessionTask = data.sessionTask;
        lastTaskId = data.taskId;
    }
    let planDone = false;
    let codeDone = false;
    const events = data.events ? data.events : [];
    events.forEach((event) => {
        if (event.trim() !== "") {
            const lines = event.split("\n");
            let eventData = {};

            lines.forEach((line) => {
                const [field, ...rest] = line.split(":");
                if (field && rest.length) {
                    eventData[field.trim()] = rest.join(":").trim();
                }
            });

            let data = eventData.data;

            if (data) {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    console.error("Error parsing JSON:", e);
                }
            }

            if (data && data.content) {
                if (eventData.event === "plan") {
                    planString += data.content;
                } else if (eventData.event === "code") {
                    codeString += data.content;
                }
            }
            if (eventData.event === "error" && typeof data == "string") {
                errorString += data;
            }

            if (data && data.finished) {
                if (eventData.event === "plan-completed") {
                    planDone = true;
                } else if (eventData.event === "code-completed") {
                    codeDone = true;
                }
            }
        }
    });

    return {
        sessionTask: data.sessionTask,
        taskId: data.taskId,
        planString,
        codeString,
        planDone,
        codeDone,
        errorString,
    };
}

export function startStream(
    token,
    session,
    taskId,
    isMock = true,
    useLocalServer = false
) {
    const sseUrl = `${
    !useLocalServer ? "https://api.jinno.app" : "http://localhost:3002"
  }/v2/code-assistant/sessions/${session}/tasks/${taskId}/stream${
    isMock ? "?mock=true" : ""
  }`;

    fetch(sseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Cache-Control": "no-cache",
                Accept: "text/event-stream",
            },
        })
        .then((response) => {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            function read() {
                reader
                    .read()
                    .then(({
                        done,
                        value
                    }) => {
                        if (done) {
                            console.log("Stream closed");
                            return;
                        }

                        const decodedValue = decoder.decode(value, {
                            stream: true
                        });
                        const events = decodedValue.split("\n\n");

                        sendStringToTab(session, taskId, events);

                        read();
                        return;
                    })
                    .catch((error) => {
                        console.error("Error reading stream:", error);
                    });
            }

            read();
        })
        .catch((error) => {
            console.error("Error fetching SSE:", error);
        });

    function sendStringToTab(session, taskId, events) {
        const data = {
            to: "TextAI",
            sendEvent: "updateMessageText",
            events,
            sessionTask: session,
            taskId,
        };

        // Dispatch the custom event
        var event = new CustomEvent("updateStreamResults", {
            detail: data,
        });
        document.dispatchEvent(event);
    }
}

export function checkIfItsFixMeDiv(elm, useDebuge = false) {
    if ($(".CodeMeCanvas").find(elm).length) {
        return false;
    }

    if (
        $("#fixMeDetectBox").find(elm).length ||
        $("#superDeveloper111").find(elm).length ||
        $("#fixMe123123132").find(elm).length ||
        $("#superDeveloperComments").find(elm).length ||
        $(elm).is("body") ||
        $("#menu-").find(elm).length
    ) {
        return true;
    }

    return false;
}

export function rgbToHex(color) {
    color = `${color}`;
    if (!color || color.indexOf("rgb") < 0) {
        return color;
    }

    if (color.charAt(0) === "#") {
        return color;
    }

    const nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color);

    if (!nums) {
        return color;
    }
    const r = parseInt(nums[2], 10).toString(16);
    const g = parseInt(nums[3], 10).toString(16);
    const b = parseInt(nums[4], 10).toString(16);

    return `#${
    (r.length === 1 ? `0${r}` : r) +
    (g.length === 1 ? `0${g}` : g) +
    (b.length === 1 ? `0${b}` : b)
  }`;
}

export function getUtcTime() {
    const now = new Date();
    const utc_timestamp = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
        now.getUTCMilliseconds()
    );

    return utc_timestamp;
}
export function getTimeDiff(join, lastSeen, now = false) {
    const t1 = new Date(join).getTime();
    let t2 = new Date(lastSeen).getTime();
    let milliseconds = 0;
    let time = "";
    if (now) t2 = Date.now();
    if (isNaN(t1) || isNaN(t2)) return "";
    if (t1 < t2) milliseconds = t2 - t1;
    else milliseconds = t1 - t2;
    const days = Math.floor(milliseconds / 1000 / 60 / (60 * 24));
    const date_diff = new Date(milliseconds);

    if (days > 0) time += `${days} days ago `;
    else if (date_diff.getUTCHours() > 0)
        time += `${date_diff.getUTCHours()} hours ago `;
    else if (date_diff.getUTCMinutes() > 0)
        time += `${date_diff.getUTCMinutes()} minutes ago `;
    else if (date_diff.getUTCSeconds() > 0)
        time += `${date_diff.getUTCSeconds()} seconds ago `;
    else time = "now";

    return time;
}

export function getHashValue(key) {
    const matches = window.location.hash.match(new RegExp(`${key}=([^&]*)`));
    return matches ? matches[1] : null;
}

export async function sha256() {
    const date = new Date();
    // encode as UTF-8
    const msgBuffer = new TextEncoder("utf-8").encode(date);

    // hash the message
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray
        .map((b) => `00${b.toString(16)}`.slice(-2))
        .join("");
    return hashHex;
}