import $ from "jquery";
import * as utils from "./utils";
import {
    StyleStoreClass
} from "../stores/StyleStore";
import {
    CommentsStoreClass
} from "../stores/CommentsStore";
import {
    Hover
} from './Hover/Hover'
import {
    MeasuresStoreClass
} from "../stores/MeasuresStore";
import {
    CanvasStoreClass
} from "../stores/CanvasStore";

export default function createElementAroundTheDiv(element, createDragAndDropEvents = true) {
    if (createDragAndDropEvents) {
        createDragAndDrop(element);
    }
    const position = utils.getPosition(element, true, true); // elm && this.elm.getBoundingClientRect() ? this.elm.getBoundingClientRect() : {top:0,left:0}

    let inspectStyle = {
        width: `${position.width}px`,
        height: `${position.height}px`,
        top: `${position.top}px`,
        left: `${position.left}px`,
        position: position.position
    }

    MeasuresStoreClass.updateInspectStyle(inspectStyle)
}

let lastElement;
let zIndexCounter = 10;

function createDragAndDrop(element) {
    if (lastElement === element || !element) {
        // delete me
        return;
    }

    if (lastElement) {
        removeListener();
    }

    computedStyle = window.getComputedStyle(element);
    lastElement = element;
    $(element).addClass("removeAttributes11");

    $(element)[0].addEventListener("mousedown", mousedown);
    $(element)[0].addEventListener("click", onClick);
    $(document)[0].addEventListener("mouseup", mouseup);
    $(document)[0].addEventListener("mousemove", mousemove1);
}

function onkeydown(e) {
    if (e.which >= 37 && e.which <= 40) {
        updateStartPosition()
        e.preventDefault();
    }

    let move = e.shiftKey ? 10 : 1

    if (e.which === 37) { //left
        const x = startLeft - move
        changeX = x

        // lastElement.style.left = `${x}px`;
        // lastElement.style.position = position;
        StyleStoreClass.onChange({
            id: "left",
            type: "input"
        }, x, "px", true, startLeft);
        StyleStoreClass.onChange({
            id: "position",
            type: "select"
        }, position, "px", true, position);
    } else if (e.which === 38) { //up
        const y = startTop - move;
        changeY = y

        // lastElement.style.top = `${y}px`;
        StyleStoreClass.onChange({
            id: "top",
            type: "input"
        }, y, "px", true, startTop);
        StyleStoreClass.onChange({
            id: "position",
            type: "select"
        }, position, "px", true, position);
    } else if (e.which === 39) { //right
        const x = startLeft + move
        changeX = x

        // lastElement.style.left = `${x}px`;
        // lastElement.style.position = position;
        StyleStoreClass.onChange({
            id: "left",
            type: "input"
        }, x, "px", true, startLeft);
        StyleStoreClass.onChange({
            id: "position",
            type: "select"
        }, position, "px", true, position);
    } else if (e.which === 40) { //down
        const y = startTop + move;
        changeY = y

        // lastElement.style.top = `${y}px`;
        StyleStoreClass.onChange({
            id: "top",
            type: "input"
        }, y, "px", true, startTop);
        StyleStoreClass.onChange({
            id: "position",
            type: "select"
        }, position, "px", true, position);
    }

    if (e.which >= 37 && e.which <= 40) {
        createElementAroundTheDiv(lastElement, false);
        MeasuresStoreClass.updateMeasurement();
        Hover.updateElementPosition(lastElement)
    }
};

export function removeListener() {
    if (lastElement) {
        lastElement.removeEventListener("mousedown", mousedown);
        lastElement.removeEventListener("click", onClick);
        $(lastElement).removeClass("removeAttributes11");
    }

    document.removeEventListener("mouseup", mouseup);
    document.removeEventListener("mousemove", mousemove1);
    // document.removeEventListener("keydown", onkeydown);

    lastElement = null;
}

let isDragging = false;
let startX;
let startY;
let startLeft;
let startTop;
let position = "relative";
let computedStyle;

let changeX = false
let changeY = false
var onClick = function(e) {
    e.stopPropagation();
    e.preventDefault();
};

function updateStartPosition() {
    startLeft = parseInt(computedStyle.left) ? parseInt(computedStyle.left) : 0;
    startTop = parseInt(computedStyle.top) ? parseInt(computedStyle.top) : 0;

    position = computedStyle.position && computedStyle.position !== "static" ? computedStyle.position : position;
}

var mousedown = function(e) {
    e.stopPropagation();
    e.preventDefault();

    isDragging = true;
    startX = e.pageX;
    startY = e.pageY;

    updateStartPosition()

    CommentsStoreClass.setHideAll(true);

    zIndexCounter++;
    lastElement.style.zIndex = zIndexCounter;
};

var mouseup = function(e) {
    isDragging = false;

    const x = startLeft + e.pageX - startX;
    const y = startTop + e.pageY - startY;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        if (changeX || changeY) {
            StyleStoreClass.onChange({
                id: "position",
                type: "select"
            }, position, "px", true, position);
        }

        if (changeX) {
            StyleStoreClass.onChange({
                id: "left",
                type: "input"
            }, x, "px", true, startLeft);
        }

        if (changeY) {
            StyleStoreClass.onChange({
                id: "top",
                type: "input"
            }, y, "px", true, startTop);
        }

        changeX = false
        changeY = false

        CommentsStoreClass.setHideAll(false);

    }, 10);
};

let timeout;
var mousemove1 = function(e) {
    if (isDragging) {
        const x = startLeft + e.pageX - startX;
        const y = startTop + e.pageY - startY;

        changeY = y
        changeX = x
        createElementAroundTheDiv(lastElement, false);
        lastElement.style.left = `${x}px`;
        lastElement.style.top = `${y}px`;
        lastElement.style.position = position;

        Hover.updateElementPosition()

        // clearTimeout(timeout);
        // timeout = setTimeout(() => {
        // StyleStoreClass.onChange({ id: "position", type: "select" }, position, "px", true, position);
        // StyleStoreClass.onChange({ id: "left", type: "input" }, x, "px", true, startLeft);
        // StyleStoreClass.onChange({ id: "top", type: "input" }, y, "px", true, startTop);
        // }, 100);
    }
};