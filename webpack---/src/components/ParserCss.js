import {
    compare
} from "specificity";
import cssParse from "./cssNpmParse.js";

// list of elements that we want to find without changing them
// element without numbers like colors and backgrounds
const findElementsWithoutNumbers = [
    "overflow",
    "position",
    // 'font-weight',
    "color",
    "font-style",
    "text-decoration",
    "text-align",
];

// element with colors list width (so we can split the number from the kind, for example:10px to {value:10 kind:px})
const findElementsWithNumbers = [
    "width",
    "max-width",
    "min-width",
    "height",
    "max-height",
    "min-height",
    "line-height",
    "letter-spacing",
    "top",
    "right",
    "bottom",
    "left",
    "font-size",
];

const split4Kinds = function(rule) {
    // split for example marin:0px 10px to top:0px right:10px
    rule = rule.trim();
    rule = rule.replace(/  +/g, " ");

    let top;
    let right;
    let left;
    let bottom;

    if (rule.split(" ").length === 1) {
        top = rule;
        right = rule;
        bottom = rule;
        left = rule;
    }

    if (rule.split(" ").length === 2) {
        top = rule.split(" ")[0];
        right = rule.split(" ")[1];
        bottom = rule.split(" ")[0];
        left = rule.split(" ")[1];
    }

    if (rule.split(" ").length === 3) {
        top = rule.split(" ")[0];
        right = rule.split(" ")[1];
        bottom = rule.split(" ")[2];
        left = rule.split(" ")[1];
    }

    if (rule.split(" ").length === 4) {
        top = rule.split(" ")[0];
        right = rule.split(" ")[1];
        bottom = rule.split(" ")[2];
        left = rule.split(" ")[3];
    }

    return {
        top,
        right,
        bottom,
        left
    };
};

// consolea.log(split4Kinds('10px'))
// consolea.log(split4Kinds('10px 11px'))
// consolea.log(split4Kinds('10px 11px 12px'))
// consolea.log(split4Kinds('10px 11px 12px 13px'))
function findPaddingOrMargin(ruleValue, rulesList, property, type) {
    if (property === type && !rulesList[type]) {
        const values = split4Kinds(ruleValue);

        rulesList[`${type}-top`] = parseValue(values.top);
        rulesList[`${type}-right`] = parseValue(values.right);
        rulesList[`${type}-bottom`] = parseValue(values.bottom);
        rulesList[`${type}-left`] = parseValue(values.left);
        rulesList[
            `${type}`
        ] = `${values.top} ${values.right} ${values.bottom} ${values.left}`;
    } else if (!rulesList[type] && !rulesList[`${type}-top`]) {
        rulesList[`${type}-top`] = parseValue(ruleValue);
    } else if (!rulesList[type] && !rulesList[`${type}-right`]) {
        rulesList[`${type}-right`] = parseValue(ruleValue);
    } else if (!rulesList[type] && !rulesList[`${type}-bottom`]) {
        rulesList[`${type}-bottom`] = parseValue(ruleValue);
    } else if (!rulesList[type] && !rulesList[`${type}-left`]) {
        rulesList[`${type}-left`] = parseValue(ruleValue);
    }
}

function handleShadowFromComputedStyles(elm, rulesList) {
    let shadow = window.getComputedStyle(elm)["box-shadow"];
    if (shadow === "none") {
        return rulesList;
    }

    shadow = shadow.trim();
    shadow = shadow.replace(/  +/g, " ");
    shadow = shadow.replace(/\s*,\s*/g, ",").replace(" )", ")");
    const splitRules = shadow.split(" ");

    if (splitRules[0].includes("rgb") || splitRules[0].includes("#")) {
        rulesList[`shadow-color`] = {
            value: splitRules[0],
            id: "shadow-color"
        };
        rulesList[`shadow-distance-top`] = {
            value: parseInt(splitRules[1]),
            id: "shadow-distance-top",
            kind: "px",
        };
        rulesList[`shadow-distance-left`] = {
            value: parseInt(splitRules[2]),
            id: "shadow-distance-left",
            kind: "px",
        };
        rulesList[`shadow-blur`] = {
            value: parseInt(splitRules[3]),
            id: "shadow-blur",
            kind: "px",
        };
        rulesList[`shadow-size`] = {
            value: splitRules[4] ? parseInt(splitRules[4]) : "",
            id: "shadow-size",
            kind: "px",
        };
    } else if (splitRules[3].includes("rgb") || splitRules[3].includes("#")) {
        rulesList[`shadow-color`] = {
            value: splitRules[3],
            id: "shadow-color"
        };
        rulesList[`shadow-distance-top`] = {
            value: parseInt(splitRules[0]),
            id: "shadow-distance-top",
            kind: "px",
        };
        rulesList[`shadow-distance-left`] = {
            value: parseInt(splitRules[1]),
            id: "shadow-distance-left",
            kind: "px",
        };
        rulesList[`shadow-blur`] = {
            value: parseInt(splitRules[2]),
            id: "shadow-blur",
            kind: "px",
        };
        rulesList[`shadow-size`] = {
            value: "",
            id: "shadow-size",
            kind: "px"
        };
    } else if (splitRules[4].includes("rgb") || splitRules[4].includes("#")) {
        rulesList[`shadow-color`] = {
            value: splitRules[4],
            id: "shadow-color"
        };
        rulesList[`shadow-distance-top`] = {
            value: parseInt(splitRules[0]),
            id: "shadow-distance-top",
            kind: "px",
        };
        rulesList[`shadow-distance-left`] = {
            value: parseInt(splitRules[1]),
            id: "shadow-distance-left",
            kind: "px",
        };
        rulesList[`shadow-blur`] = {
            value: parseInt(splitRules[2]),
            id: "shadow-blur",
            kind: "px",
        };
        rulesList[`shadow-size`] = {
            value: parseInt(splitRules[3]),
            id: "shadow-size",
            kind: "px",
        };
    }

    return rulesList;
}

function handleShadow(ruleValue, rulesList, property) {
    ruleValue = ruleValue.trim();
    ruleValue = ruleValue.replace(/  +/g, " ");
    ruleValue = ruleValue.replace(/\s*,\s*/g, ",").replace(" )", ")");
    const splitRules = ruleValue.split(" ");

    rulesList[`shadow-distance-top`] = {
        value: parseInt(splitRules[0]),
        id: "shadow-distance-top",
        kind: "px",
    };
    rulesList[`shadow-distance-left`] = {
        value: parseInt(splitRules[1]),
        id: "shadow-distance-left",
        kind: "px",
    };
    rulesList[`shadow-blur`] = {
        value: parseInt(splitRules[2]),
        id: "shadow-blur",
        kind: "px",
    };

    if (
        splitRules[0] &&
        (splitRules[0].includes("rgb") || splitRules[0].includes("#"))
    ) {
        rulesList[`shadow-distance-top`] = {
            value: parseInt(splitRules[1]),
            id: "shadow-distance-top",
            kind: "px",
        };
        rulesList[`shadow-distance-left`] = {
            value: parseInt(splitRules[2]),
            id: "shadow-distance-left",
            kind: "px",
        };
        rulesList[`shadow-blur`] = {
            value: parseInt(splitRules[3]),
            id: "shadow-blur",
            kind: "px",
        };
        rulesList[`shadow-size`] = {
            value: splitRules[4] ? parseInt(splitRules[4]) : "",
            id: "shadow-size",
            kind: "px",
        };
        rulesList[`shadow-color`] = {
            value: splitRules[0],
            id: "shadow-color"
        };
    } else if (
        splitRules[3] &&
        (splitRules[3].includes("rgb") || splitRules[3].includes("#"))
    ) {
        rulesList[`shadow-size`] = {
            value: "",
            id: "shadow-size",
            kind: "px"
        };
        rulesList[`shadow-color`] = {
            value: splitRules[3],
            id: "shadow-color"
        };
    } else if (
        splitRules[4] &&
        (splitRules[4].includes("rgb") || splitRules[4].includes("#"))
    ) {
        rulesList[`shadow-size`] = {
            value: parseInt(splitRules[3]),
            id: "shadow-size",
            kind: "px",
        };
        rulesList[`shadow-color`] = {
            value: splitRules[4],
            id: "shadow-color"
        };
    }
}
// export let rules = '.a {box-shadow:1px 2px 3px 4px rgb(100,100,100)}'
// export let rules = '.a {box-shadow:rgb(100,100,100) 1px 2px 3px 4px}'

// function handleBurder(ruleValue, rulesList, property) {
//   if (property === "border") {
//     rulesList.border = ruleValue;
//   }

//   if (
//     (property === "border-style" || property === "border-color") &&
//     !rulesList[property]
//   ) {
//     rulesList[property] = ruleValue;
//   } else if (property === "border-radius" && !rulesList[property]) {
//     rulesList[property] = parseValue(ruleValue);
//   }
// }

function listFonts() {
    // find all the fonts in the page
    let fonts = [];

    const allElements = document.querySelectorAll("*"); // .slice(0,500)

    const loopLength = allElements.length > 300 ? 300 : allElements.length;
    for (let i = 0; i < loopLength; i++) {
        const node = allElements[i];
        // for (let node of allElements) {
        if (!node.style) continue;

        for (const pseudo of ["", ":before", ":after"]) {
            const {
                fontFamily
            } = getComputedStyle(node, pseudo);
            fonts = fonts.concat(fontFamily.split(/\n*,\n*/g));
        }
    }

    // Remove duplicate elements from fonts array
    // and remove the surrounding quotes around elements
    const browserFonts = [...new Set(fonts)]
        .map((font) => font.replace(/^\s*['"]([^'"]*)['"]\s*$/, "$1").trim())
        .map((item) => {
            return {
                value: item,
                name: item
            };
        });

    // let defaultFonts = [
    //     {name:'Arial', value:'arial'},
    //     {name:'Helvetica', value:'Helvetica'},
    //     {name:'Verdana', value:'Verdana'},
    //     {name:'Calibri', value:'Calibri'},
    //     {name:'Noto', value:'Noto'},
    //     {name:'Lucida Sans', value:'Lucida Sans'},
    //     {name:'Gill Sans', value:'Gill Sans'},
    //     {name:'Century Gothic', value:'Century Gothic'},
    //     {name:'Candara', value:'Candara'},
    //     {name:'Futara', value:'Futara'},
    //     {name:'Franklin Gothic Medium', value:'Franklin Gothic Medium'},
    //     {name:'Trebuchet MS', value:'Trebuchet MS'},
    //     {name:'Geneva', value:'Geneva'},
    //     {name:'Segoe UI', value:'Segoe UI'},
    //     {name:'Optima', value:'Optima'},
    //     {name:'Avanta Garde', value:'Avanta Garde'}
    // ]

    // defaultFonts = defaultFonts.filter(defaultFont=>{
    //     return !browserFonts.find(browserFont=>{return browserFont.name===defaultFont.value})
    // })

    // consolea.log(browserFonts.concat(defaultFonts))
    return browserFonts; // .concat(defaultFonts)
}

function parseValue(value) {
    // extracted 10px 50 {value:10,kind:px}
    if (!value) {
        return {
            value: "",
            kind: ""
        };
    }

    value = value.toLowerCase();
    value = value.trim();

    if (value.includes(" ")) {
        console.error("error in parseValue");
    }

    let kind;

    if (value.includes("px")) {
        kind = "px";
    } else if (value.includes("%")) {
        kind = "%";
    } else if (value.includes("em")) {
        kind = "em";
    } else if (value.includes("vw")) {
        kind = "vw";
    } else if (value.includes("vh")) {
        kind = "vh";
    }

    return {
        value: parseInt(value),
        kind
    };
}

function orderSelections(rules, elm) {
    if (!rules || !rules.stylesheet || !rules.stylesheet.rules) {
        return rules;
    }

    const bestSelectors = [];
    rules.stylesheet.rules = rules.stylesheet.rules.map((item, index) => {
        // find all the selectors
        if (item.selectors) {
            if (elm) {
                item.selectors = item.selectors.filter((selector) => {
                    return elm.matches(selector);
                });
            }
            item.selectors = item.selectors.sort(compare);
            bestSelectors.push(item.selectors[item.selectors.length - 1]); // find the strongest selectors
        }

        return item;
    });

    const newRules = [];
    bestSelectors.forEach((findSelector) => {
        // order the list in from the stronger selector to the weeker selector
        rules.stylesheet.rules.forEach((item) => {
            if (item.selectors.includes(findSelector)) {
                newRules.push(item);
            }
        });
    });

    rules.stylesheet.rules = newRules;

    return rules;
}

export const ParserCss = function(rules, elm) {
    rules = cssParse(rules);
    rules = orderSelections(rules, elm);
    let parseShadow = false;

    let rulesList = {}; // rules that we find and parse them

    rules.stylesheet.rules.forEach((style) => {
        style.declarations.forEach((rule) => {
            rule.property = rule.property.trim();

            if (rule.property && rule.property.includes("margin")) {
                findPaddingOrMargin(rule.value, rulesList, rule.property, "margin");
            } else if (rule.property && rule.property.includes("padding")) {
                findPaddingOrMargin(rule.value, rulesList, rule.property, "padding");
            } else if (rule.property.includes("border")) {
                // handleBurder(rule.value, rulesList, rule.property)
            } else if (rule.property === "box-shadow") {
                parseShadow = true;
                handleShadow(rule.value, rulesList, rule.property);
            } else if (
                rule.property.includes("font-family") &&
                !rulesList[rule.property]
            ) {
                rulesList[rule.property] = rule.value.split(",")[0].trim();
                rulesList["font-family-list"] = listFonts();
            } else if (
                findElementsWithNumbers.includes(rule.property) &&
                !rulesList[rule.property]
            ) {
                // list of elements that we don't want to change them
                rulesList[rule.property] = parseValue(rule.value);
            } else if (
                findElementsWithoutNumbers.includes(rule.property) &&
                !rulesList[rule.property]
            ) {
                // list of elements that we don't want to change them
                rulesList[rule.property] = rule.value;
            }
        });
    });
    // alert(2)

    if (!rulesList["font-family-list"]) {
        const fontFamilyComputed = window.getComputedStyle(elm)["font-family"];

        rulesList["font-family"] = fontFamilyComputed;
        rulesList["font-family-list"] = listFonts();

        const find = rulesList["font-family-list"].find((item) => {
            return item.value === fontFamilyComputed;
        }); // if there is the font-family in the list
        if (!find) {
            rulesList["font-family-list"].push({
                value: fontFamilyComputed,
                name: fontFamilyComputed,
            });
        }
    }

    if (!parseShadow && elm) {
        rulesList = handleShadowFromComputedStyles(elm, rulesList);
    }

    return rulesList;
};