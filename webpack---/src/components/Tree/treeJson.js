function extractedFromNumber(item) {
    if (!item) {
        return {
            value: "",
            kind: ""
        };
    }

    item = item.toLowerCase();

    let kind = "px";
    let value;
    if (item.includes("%")) {
        kind = "%";
        value = "%";
    } else if (item.includes("em")) {
        kind = "em";
        value = "em";
    } else if (item.includes("vw")) {
        kind = "vw";
        value = "vw";
    } else if (item.includes("vh")) {
        kind = "vh";
        value = "vh";
    } else if (item.includes("auto")) {
        kind = "auto";
        value = "auto";
    } else if (item.includes("none")) {
        kind = "none";
        value = "none";
    } else if (item.includes("normal")) {
        kind = "normal";
        value = "normal";
    }

    return {
        value: value || parseInt(item),
        kind
    };
}

export const calculateSpacingData = function(parsedRules, computedStyles) {
    const paddingTop =
        parsedRules && parsedRules["padding-top"] ?
        parsedRules["padding-top"] :
        extractedFromNumber(computedStyles.paddingTop);
    const paddingRight =
        parsedRules && parsedRules["padding-right"] ?
        parsedRules["padding-right"] :
        extractedFromNumber(computedStyles.paddingRight);
    const paddingBottom =
        parsedRules && parsedRules["padding-bottom"] ?
        parsedRules["padding-bottom"] :
        extractedFromNumber(computedStyles.paddingBottom);
    const paddingLeft =
        parsedRules && parsedRules["padding-left"] ?
        parsedRules["padding-left"] :
        extractedFromNumber(computedStyles.paddingLeft);

    const marginTop =
        parsedRules && parsedRules["margin-top"] ?
        parsedRules["margin-top"] :
        extractedFromNumber(computedStyles.marginTop);
    const marginRight =
        parsedRules && parsedRules["margin-right"] ?
        parsedRules["margin-right"] :
        extractedFromNumber(computedStyles.marginRight);
    const marginBottom =
        parsedRules && parsedRules["margin-bottom"] ?
        parsedRules["margin-bottom"] :
        extractedFromNumber(computedStyles.marginBottom);
    const marginLeft =
        parsedRules && parsedRules["margin-left"] ?
        parsedRules["margin-left"] :
        extractedFromNumber(computedStyles.marginLeft);

    return [{
            type: "row",
            label: "Padding:"
        },
        {
            type: "section",
            items: [{
                    type: "input",
                    label: "top",
                    value: paddingTop.value,
                    kind: paddingTop.kind,
                    id: "padding-top",
                },
                {
                    type: "input",
                    label: "bottom",
                    value: paddingBottom.value,
                    kind: paddingBottom.kind,
                    id: "padding-bottom",
                    rightSlider: true,
                },
            ],
        },
        {
            type: "section",
            items: [{
                    type: "input",
                    label: "left",
                    value: paddingLeft.value,
                    kind: paddingLeft.kind,
                    id: "padding-left",
                },
                {
                    type: "input",
                    label: "right",
                    value: paddingRight.value,
                    kind: paddingRight.kind,
                    id: "padding-right",
                    rightSlider: true,
                },
            ],
        },
        {
            type: "row",
            label: "Margin:",
            size: "mini"
        },
        {
            type: "section",
            items: [{
                    type: "input",
                    label: "top",
                    value: marginTop.value,
                    kind: marginTop.kind,
                    id: "margin-top",
                    auto: true,
                },
                {
                    type: "input",
                    label: "bottom",
                    value: marginBottom.value,
                    kind: marginBottom.kind,
                    id: "margin-bottom",
                    auto: true,
                    rightSlider: true,
                },
            ],
        },
        {
            type: "section",
            items: [{
                    type: "input",
                    label: "left",
                    value: marginLeft.value,
                    kind: marginLeft.kind,
                    id: "margin-left",
                    auto: true,
                },
                {
                    type: "input",
                    label: "right",
                    value: marginRight.value,
                    kind: marginRight.kind,
                    id: "margin-right",
                    auto: true,
                    rightSlider: true,
                },
            ],
        },
    ];
};

export const calculateSizeData = function(parsedRules, computedStyles) {
    const width =
        parsedRules && parsedRules.width ?
        parsedRules.width :
        extractedFromNumber(computedStyles.width);
    const height =
        parsedRules && parsedRules.height ?
        parsedRules.height :
        extractedFromNumber(computedStyles.height);
    const minWidth =
        parsedRules && parsedRules["min-width"] ?
        parsedRules["min-width"] :
        extractedFromNumber(computedStyles.minWidth);
    const minHeight =
        parsedRules && parsedRules["min-height"] ?
        parsedRules["min-height"] :
        extractedFromNumber(computedStyles.minHeight);
    const maxWidth =
        parsedRules && parsedRules["max-width"] ?
        parsedRules["max-width"] :
        extractedFromNumber(computedStyles.maxWidth);
    const maxHeight =
        parsedRules && parsedRules["max-height"] ?
        parsedRules["max-height"] :
        extractedFromNumber(computedStyles.maxHeight);
    const overflow = parsedRules.overflow ?
        parsedRules.overflow :
        computedStyles.overflow;

    return [{
            type: "section",
            items: [{
                    type: "input",
                    label: "Width",
                    value: width.value,
                    kind: width.kind,
                    id: "width",
                    auto: true,
                },
                {
                    type: "input",
                    label: "Height",
                    value: height.value,
                    kind: height.kind,
                    id: "height",
                    auto: true,
                    rightSlider: true,
                },
            ],
        },
        {
            type: "section",
            items: [{
                    type: "input",
                    label: "Min w",
                    value: minWidth.value,
                    kind: minWidth.kind,
                    id: "min-width",
                    auto: true,
                },
                {
                    type: "input",
                    label: "Min h",
                    value: minHeight.value,
                    kind: minHeight.kind,
                    id: "min-height",
                    auto: true,
                    rightSlider: true,
                },
            ],
        },
        {
            type: "section",
            items: [{
                    type: "input",
                    label: "Max w",
                    value: maxWidth.value,
                    kind: maxWidth.kind,
                    id: "max-width",
                    none: true,
                },
                {
                    type: "input",
                    label: "Max h",
                    value: maxHeight.value,
                    kind: maxHeight.kind,
                    id: "max-height",
                    none: true,
                    rightSlider: true,
                },
            ],
        },
        {
            type: "spacer",
        },
        {
            type: "select",
            label: "overflow",
            value: overflow,
            id: "overflow",
            big: true,
            list: [{
                    value: "visible",
                    name: "visible"
                },
                {
                    value: "hidden",
                    name: "hidden"
                },
                {
                    value: "scroll",
                    name: "scroll"
                },
                {
                    value: "auto",
                    name: "auto"
                },
            ],
        },
    ];
};

export const calculatePositionData = function(parsedRules, computedStyles) {
    const position = parsedRules.position ?
        parsedRules.position :
        computedStyles.position;

    const top =
        parsedRules && parsedRules.top ?
        parsedRules.top :
        extractedFromNumber(computedStyles.top);
    const right =
        parsedRules && parsedRules.right ?
        parsedRules.right :
        extractedFromNumber(computedStyles.right);
    const bottom =
        parsedRules && parsedRules.bottom ?
        parsedRules.bottom :
        extractedFromNumber(computedStyles.bottom);
    const left =
        parsedRules && parsedRules.left ?
        parsedRules.left :
        extractedFromNumber(computedStyles.left);

    return [{
        type: "select",
        label: "Position",
        value: position,
        id: "position",
        row: true,
        big: true,
        list: [{
                value: "static",
                name: "Static"
            },
            {
                value: "relative",
                name: "Relative"
            },
            {
                value: "absolute",
                name: "Absolute"
            },
            {
                value: "fixed",
                name: "Fixed"
            },
            {
                value: "sticky",
                name: "Sticky"
            },
        ],
        children: {
            visible: ["relative", "absolute", "fixed", "sticky"],
            fields: [{
                    type: "section",
                    items: [{
                            type: "input",
                            label: "top",
                            id: "top",
                            kind: top.kind,
                            value: top.value,
                            auto: true,
                        },
                        {
                            type: "input",
                            label: "bottom",
                            id: "bottom",
                            kind: bottom.kind,
                            value: bottom.value,
                            auto: true,
                            rightSlider: true,
                        },
                    ],
                },
                {
                    type: "section",
                    items: [{
                            type: "input",
                            label: "left",
                            id: "left",
                            kind: left.kind,
                            value: left.value,
                            auto: true,
                        },
                        {
                            type: "input",
                            label: "right",
                            id: "right",
                            kind: right.kind,
                            value: right.value,
                            auto: true,
                            rightSlider: true,
                        },
                    ],
                },
            ],
        },
    }, ];
};

export const calculateTypographyData = function(parsedRules, computedStyles) {
    const fontFamilyList = parsedRules["font-family-list"] ?
        parsedRules["font-family-list"] :
        [];
    const computedFontFamily =
        computedStyles.fontFamily && computedStyles.fontFamily.split(",") ?
        computedStyles.fontFamily.split(",")[0] :
        "";

    const fontFamily = parsedRules["font-family"] ?
        parsedRules["font-family"] :
        computedFontFamily;
    const fontSize = parsedRules["font-size"] ?
        parsedRules["font-size"] :
        extractedFromNumber(computedStyles.fontSize);
    const lineHeight = parsedRules["line-height"] ?
        parsedRules["line-height"] :
        extractedFromNumber(computedStyles.lineHeight);
    const letterSpacing = parsedRules["letter-spacing"] ?
        parsedRules["letter-spacing"] :
        extractedFromNumber(computedStyles.letterSpacing);
    const fontWeight = parsedRules["font-weight"] ?
        parsedRules["font-weight"] :
        computedStyles.fontWeight;
    const color = parsedRules.color ? parsedRules.color : computedStyles.color;
    let textAlign = parsedRules["text-align"] ?
        parsedRules["text-align"] :
        computedStyles.textAlign;
    const fontStyle = parsedRules["font-style"] ?
        parsedRules["font-style"] :
        computedStyles.fontStyle;
    const textDecoration = parsedRules["text-decoration"] ?
        parsedRules["text-decoration"] :
        computedStyles.textDecorationLine;
    const bold = fontWeight === "700" ? "bold" : "";

    textAlign = textAlign === "start" ? "left" : textAlign;

    // if(!fontFamilyList.value.includes(fontFamily)){
    //     fontFamilyList.push({value:fontFamily, name:fontFamily})
    // }

    return [{
            type: "select",
            label: "Font",
            id: "font-family",
            big: true,
            value: fontFamily,
            list: fontFamilyList,
        },
        {
            type: "select",
            label: " ",
            big: true,
            id: "font-weight",
            value: fontWeight,
            list: [{
                    value: "100",
                    name: "100 - Thin"
                },
                {
                    value: "200",
                    name: "200 - Extra light"
                },
                {
                    value: "300",
                    name: "300 - Light"
                },
                {
                    value: "400",
                    name: "400 - Normal"
                },
                {
                    value: "500",
                    name: "500 - Medium"
                },
                {
                    value: "600",
                    name: "600 - Semi bold"
                },
                {
                    value: "700",
                    name: "700 - Bold"
                },
                {
                    value: "800",
                    name: "800 - Extra bold"
                },
                {
                    value: "900",
                    name: "900 - Black"
                },
            ],
        },
        {
            type: "color",
            big: true,
            label: " ",
            id: "color",
            value: parseColor(color),
        },
        {
            type: "section",
            label: " ",
            items: [{
                    type: "input",
                    label: "Size",
                    labelPosition: "bottom",
                    id: "font-size",
                    kind: fontSize.kind,
                    value: fontSize.value,
                    auto: false,
                },
                {
                    type: "input",
                    label: "Height",
                    labelPosition: "bottom",
                    id: "line-height",
                    kind: lineHeight.kind,
                    value: lineHeight.value,
                    normal: true,
                    rightSlider: true,
                },
                {
                    type: "input",
                    label: "Spacing",
                    labelPosition: "bottom",
                    id: "letter-spacing",
                    kind: letterSpacing.kind,
                    value: letterSpacing.value,
                    normal: true,
                },
            ],
        },
        {
            type: "spacer"
        },
        {
            type: "Buttons",
            value: textAlign,
            id: "text-align",
            big: true,
            label: "Align",
            list: [{
                    value: "left",
                    icon: "alignLeft"
                },
                {
                    value: "center",
                    icon: "alignCenter"
                },
                {
                    value: "right",
                    icon: "alignRight"
                },
                {
                    value: "justify",
                    icon: "alignJustify"
                },
            ],
        },
        {
            type: "Buttons",
            value: [fontStyle, textDecoration, bold],
            id: "fontKinds",
            big: true,
            label: "Style",
            multiSelect: true,
            list: [{
                    value: "italic",
                    icon: "italic"
                },
                {
                    value: "underline",
                    icon: "underline"
                },
                {
                    value: "bold",
                    icon: "bold"
                },
            ],
        },
    ];
};

export const calculateBackgroundData = function(parsedRules, computedStyles) {
    const background = parsedRules.background ?
        parsedRules.background :
        computedStyles.backgroundColor;

    return [{
        type: "color",
        label: "background",
        big: true,
        id: "background-color",
        value: parseColor(background),
    }, ];
};

export const calculateBorderData = function(parsedRules, computedStyles) {
    const borderRadius =
        parsedRules && parsedRules["border-radius"] ?
        parsedRules["border-radius"] :
        extractedFromNumber(computedStyles.borderRadius);
    const borderWidth =
        parsedRules && parsedRules["border-width"] ?
        parsedRules["border-width"] :
        extractedFromNumber(computedStyles.borderWidth);
    const borderColor =
        parsedRules && parsedRules["border-color"] ?
        parsedRules["border-color"] :
        computedStyles.borderColor;
    const borderStyle =
        parsedRules && parsedRules["border-style"] ?
        parsedRules["border-style"] :
        computedStyles.borderStyle;

    return [{
            type: "color",
            label: "color",
            big: true,
            id: "border-color",
            value: parseColor(borderColor),
        },
        {
            type: "section",
            label: " ",
            items: [{
                    type: "input",
                    label: "width",
                    labelPosition: "bottom",
                    kind: borderWidth.kind,
                    id: "border-width",
                    value: borderWidth.value,
                },
                {
                    type: "input",
                    label: "Radius",
                    labelPosition: "bottom",
                    kind: borderRadius.kind,
                    id: "border-radius",
                    value: borderRadius.value,
                    rightSlider: true,
                },
                {
                    type: "select",
                    label: "style",
                    labelPosition: "bottom",
                    id: "border-style",
                    value: borderStyle,
                    list: [{
                            value: "solid",
                            name: "solid"
                        },
                        {
                            value: "dashed",
                            name: "dashed"
                        },
                        {
                            value: "dotted",
                            name: "dotted"
                        },
                        {
                            value: "double",
                            name: "double"
                        },
                        {
                            value: "groove",
                            name: "groove"
                        },
                        {
                            value: "ridge",
                            name: "ridge"
                        },
                        {
                            value: "inset",
                            name: "inset"
                        },
                        {
                            value: "outset",
                            name: "outset"
                        },
                        {
                            value: "none",
                            name: "none"
                        },
                    ],
                },
            ],
        },
    ];
};

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}

function parseColor(color) {
    if (
        color &&
        color.includes("rgb") &&
        color.split(",") &&
        color.split(",").length >= 2
    ) {
        color = color.split("(")[1].split(")")[0];
        const r = parseInt(color.split(",")[0]);
        const g = parseInt(color.split(",")[1]);
        const b = parseInt(color.split(",")[2]);
        return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
    }

    return color;
}

export const calculateShadowData = function(parsedRules) {
    const distanceTop =
        parsedRules && parsedRules["shadow-distance-top"] ?
        parsedRules["shadow-distance-top"] :
        {
            value: "0",
            id: "shadow-distance-top",
            kind: "px"
        };
    const distanceLeft =
        parsedRules && parsedRules["shadow-distance-left"] ?
        parsedRules["shadow-distance-left"] :
        {
            value: "0",
            id: "shadow-distance-left",
            kind: "px"
        };
    const blur =
        parsedRules && parsedRules["shadow-blur"] ?
        parsedRules["shadow-blur"] :
        {
            value: "0",
            id: "shadow-blur",
            kind: "px"
        };
    const size =
        parsedRules && parsedRules["shadow-size"] ?
        parsedRules["shadow-size"] :
        {
            value: "0",
            id: "shadow-size",
            kind: "px"
        };
    const color =
        parsedRules && parsedRules["shadow-color"] ?
        parsedRules["shadow-color"] :
        {
            value: "#E6E6E6",
            id: "shadow-color",
            kind: "px"
        };

    return [{
            type: "color",
            big: true,
            label: "Color",
            id: "shadow-color",
            value: color.value,
        },
        {
            type: "input",
            label: "Size",
            kind: size.kind,
            id: "shadow-size",
            value: size.value,
            rightSlider: true,
            big: true,
        },
        {
            type: "section",
            label: " ",
            big: true,
            items: [{
                    type: "input",
                    label: "X",
                    kind: distanceTop.kind,
                    labelPosition: "bottom",
                    id: "shadow-distance-top",
                    value: distanceTop.value,
                },
                {
                    type: "input",
                    label: "Y",
                    labelPosition: "bottom",
                    kind: distanceLeft.kind,
                    id: "shadow-distance-left",
                    value: distanceLeft.value,
                    rightSlider: true,
                },
                {
                    type: "input",
                    label: "Blur",
                    labelPosition: "bottom",
                    kind: blur.kind,
                    id: "shadow-blur",
                    value: blur.value,
                },
            ],
        },
    ];
};