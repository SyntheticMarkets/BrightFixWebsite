import {
    createContext
} from "react";
import {
    decorate,
    observable,
    action
} from "mobx";
import {
    checkIfItsFixMeDiv
} from "../components/utils";

class MeasuresStore {
    divStyles = [];

    constructor() {
        this.state = {
            distances: [],
            target: null,
            hoverStyle: {},
            showHover: false,
            rulerLeft: 0,
            rulerRight: 0,
            rulerTop: 0,
            rulerBottom: 0,
            showRulers: false,
            inspectStyle: {},
            contextMenuOpen: false,
            contextX: 0,
            contextY: 0,
            contextOpenPosition: "left",
        };
    }

    setContextMenuOpen(bool, x, y, openPosition) {
        this.contextX = x;
        this.contextY = y;
        this.contextOpenPosition = openPosition;
        this.contextMenuOpen = bool;
    }

    setShowRulers(bool) {
        this.showRulers = bool;
    }

    updateInspectStyle(newStyle) {
        this.inspectStyle = newStyle;
    }

    updateRuler(kind, newValue) {
        if (kind === "left") {
            this.rulerLeft = newValue;
        } else if (kind === "right") {
            this.rulerRight = newValue;
        } else if (kind === "top") {
            this.rulerTop = newValue;
        } else if (kind === "bottom") {
            this.rulerBottom = newValue;
        }
    }
    clear() {
        this.divStyles = [];
    }

    updateHoverStyle(newCss) {
        this.hoverStyle = newCss;
    }

    toggleShowHover(bool) {
        this.showHover = bool;
    }

    updateMeasurement() {
        this.createMeasurements({
            $anchor: this.lastAnchor,
            $target: this.state.target,
        });
    }

    createMeasurements({
        $anchor,
        $target
    }) {
        if (this.state.target === $target && this.state.distances.length) return;
        if (checkIfItsFixMeDiv($target)) {
            this.setShowRulers(false);
            this.clear();
            return;
        }
        this.state.target = $target;
        this.lastAnchor = $anchor;

        const anchorBounds = $anchor.getBoundingClientRect();
        const targetBounds = $target.getBoundingClientRect();

        const measurements = [];

        // right
        if (anchorBounds.right < targetBounds.left) {
            measurements.push({
                x: window.pageXOffset + anchorBounds.right,
                y: window.pageYOffset + anchorBounds.top + anchorBounds.height / 2 - 3,
                d: targetBounds.left - anchorBounds.right,
                q: "right",
                v: true,
            });
        }
        if (
            anchorBounds.right < targetBounds.right &&
            anchorBounds.right > targetBounds.left
        ) {
            measurements.push({
                x: window.pageXOffset + anchorBounds.right,
                y: anchorBounds.top + anchorBounds.height / 2 - 3,
                d: targetBounds.right - anchorBounds.right,
                q: "right",
            });
        }

        // left
        if (anchorBounds.left > targetBounds.right) {
            measurements.push({
                x: window.pageXOffset + window.innerWidth - anchorBounds.left,
                y: window.pageYOffset + anchorBounds.top + anchorBounds.height / 2 - 3,
                d: anchorBounds.left - targetBounds.right,
                q: "left",
                v: true,
            });
        }
        if (
            anchorBounds.left > targetBounds.left &&
            anchorBounds.left < targetBounds.right
        ) {
            measurements.push({
                x: window.pageXOffset + window.innerWidth - anchorBounds.left,
                y: window.pageYOffset + anchorBounds.top + anchorBounds.height / 2 - 3,
                d: anchorBounds.left - targetBounds.left,
                q: "left",
            });
        }

        // top
        if (anchorBounds.top > targetBounds.bottom) {
            measurements.push({
                x: window.pageXOffset + anchorBounds.left + anchorBounds.width / 2 - 3,
                y: window.pageYOffset + targetBounds.bottom,
                d: anchorBounds.top - targetBounds.bottom,
                q: "top",
                v: true,
            });
        }
        if (
            anchorBounds.top > targetBounds.top &&
            anchorBounds.top < targetBounds.bottom
        ) {
            measurements.push({
                x: window.pageXOffset + anchorBounds.left + anchorBounds.width / 2 - 3,
                y: window.pageYOffset + targetBounds.top,
                d: anchorBounds.top - targetBounds.top,
                q: "top",
                v: true,
            });
        }

        // bottom
        if (anchorBounds.bottom < targetBounds.top) {
            measurements.push({
                x: window.pageXOffset + anchorBounds.left + anchorBounds.width / 2 - 3,
                y: window.pageYOffset + anchorBounds.bottom,
                d: targetBounds.top - anchorBounds.bottom,
                q: "bottom",
                v: true,
            });
        }
        if (
            anchorBounds.bottom < targetBounds.bottom &&
            anchorBounds.bottom > targetBounds.top
        ) {
            measurements.push({
                x: window.pageXOffset + anchorBounds.left + anchorBounds.width / 2 - 3,
                y: window.pageYOffset + anchorBounds.bottom,
                d: targetBounds.bottom - anchorBounds.bottom,
                q: "bottom",
                v: true,
            });
        }

        // inside left/right
        if (
            anchorBounds.right > targetBounds.right &&
            anchorBounds.left < targetBounds.left
        ) {
            measurements.push({
                x: window.pageXOffset + window.innerWidth - anchorBounds.right,
                y: window.pageYOffset + anchorBounds.top + anchorBounds.height / 2 - 3,
                d: anchorBounds.right - targetBounds.right,
                q: "left",
            });
            measurements.push({
                x: window.pageXOffset + anchorBounds.left,
                y: window.pageYOffset + anchorBounds.top + anchorBounds.height / 2 - 3,
                d: targetBounds.left - anchorBounds.left,
                q: "right",
            });
        }

        // inside top/right
        if (
            anchorBounds.top < targetBounds.top &&
            anchorBounds.bottom > targetBounds.bottom
        ) {
            measurements.push({
                x: window.pageXOffset + anchorBounds.left + anchorBounds.width / 2 - 3,
                y: window.pageYOffset + anchorBounds.top,
                d: targetBounds.top - anchorBounds.top,
                q: "bottom",
                v: true,
            });
            measurements.push({
                x: window.pageXOffset + anchorBounds.left + anchorBounds.width / 2 - 3,
                y: window.pageYOffset + targetBounds.bottom,
                d: anchorBounds.bottom - targetBounds.bottom,
                q: "top",
                v: true,
            });
        }

        this.divStyles = [];

        measurements
            .map((measurement) =>
                Object.assign(measurement, {
                    d: Math.round(measurement.d.toFixed(1) * 100) / 100,
                })
            )
            .forEach((measurement) => {
                const $measurement = document.createElement("visbug-distance");

                $measurement.position = {
                    line_model: measurement,
                    node_label_id: this.state.distances.length,
                };
                let lineStyle = {
                    innerStyle: {},
                    wrapperStyle: {}
                };
                lineStyle.text =
                    measurement.d && typeof measurement.d === "number" ?
                    Math.round(measurement.d) :
                    measurement.d;
                if (measurement.q === "top" || measurement.q === "bottom") {
                    lineStyle.innerStyle.marginTop = "-12px";
                    lineStyle.innerStyle.top = "50%";
                }
                lineStyle.wrapperStyle[
                    `border${
            measurement.q === "left" || measurement.q === "right"
              ? "Top"
              : "Left"
          }`
                ] = "1px rgba(210,210,210,1) solid";
                lineStyle.wrapperStyle[
                    `${measurement.q === "bottom" && false ? "bottom" : "top"}`
                ] = `${measurement.y}px`;
                lineStyle.wrapperStyle[
                    `${measurement.q === "left" ? "right" : "left"}`
                ] = `${measurement.x}px`;
                lineStyle.wrapperStyle[`width`] = `${
          measurement.q === "left" || measurement.q === "right"
            ? measurement.d
            : "0"
        }px`;
                lineStyle.wrapperStyle[`height`] = `${
          measurement.q === "top" || measurement.q === "bottom"
            ? measurement.d
            : "0"
        }px`;

                if (measurement.q === "left" || measurement.q === "right") {
                    lineStyle.wrapperStyle.justifyContent = "center";
                    lineStyle.wrapperStyle.alignItems = "center";
                } else {
                    lineStyle.wrapperStyle.justifyContent = "center";
                    lineStyle.wrapperStyle.alignItems = "start";
                }
                this.divStyles.push(lineStyle);
            });
    }
}

decorate(MeasuresStore, {
    divStyles: observable,
    hoverStyle: observable,
    showHover: observable,
    rulerLeft: observable,
    rulerRight: observable,
    rulerTop: observable,
    rulerBottom: observable,
    inspectStyle: observable,
    showRulers: observable,
    contextMenuOpen: observable,
    contextY: observable,
    contextX: observable,
    contextOpenPosition: observable,
    setContextMenuOpen: action,
    setShowRulers: action,
    updateHoverStyle: action,
    toggleShowHover: action,
    updateInspectStyle: action,
});

export let MeasuresStoreClass = new MeasuresStore();
export default createContext(MeasuresStoreClass);