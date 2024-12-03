import * as deepcopy from "deepcopy";

import MaterialTextField from "./MaterialTextField";
import MaterialCheckbox from "./MaterialCheckbox";
import MaterialButton from "./MaterialButton";
import MaterialButtonGroup from "./MaterialButtonGroup";
import MaterialFloat from "./MaterialFloat";
import MaterialSlider from "./MaterialSlider";
import MaterialSwitch from "./MaterialSwitch";
import MaterialSelect from "./MaterialSelect";
import MaterialBreadcrumbs from "./MaterialBreadcrumbs";
import MaterialBottomNavigation from "./MaterialBottomNavigation";
import MaterialLink from "./MaterialLink";
import MaterialMenu from "./MaterialMenu";
import MaterialTabs from "./MaterialTabs";
import MaterialStepper from "./MaterialStepper";
import MaterialHeader from "./MaterialHeader";
import MaterialAccordion from "./MaterialAccordion";
import MaterialCircularProgress from "./MaterialCircularProgress";
import MaterialLinearProgress from "./MaterialLinearProgress";
import MaterialDialog from "./MaterialDialog";
import MaterialSnackbar from "./MaterialSnackbar";
import MaterialAlert from "./MaterialAlert";
import MaterialBackdrop from "./MaterialBackdrop";
import MaterialBadget from "./MaterialBadget";
import MaterialChip from "./MaterialChip";
import MaterialTable from "./MaterialTable";
import MaterialList from "./MaterialList";
import MaterialTooltip from "./MaterialTooltip";
import MaterialTypography from "./MaterialTypography";

/* eslint import/no-webpack-loader-syntax: off */
import MaterialTextFieldJS from "!raw-loader!./MaterialTextField";
import MaterialCheckboxJS from "!raw-loader!./MaterialCheckbox";
import MaterialButtonJS from "!raw-loader!./MaterialButton";
import MaterialButtonGroupJS from "!raw-loader!./MaterialButtonGroup";
import MaterialFloatJS from "!raw-loader!./MaterialFloat";
import MaterialSliderJS from "!raw-loader!./MaterialSlider";
import MaterialSwitchJS from "!raw-loader!./MaterialSwitch";
import MaterialSelectJS from "!raw-loader!./MaterialSelect";
import MaterialBottomNavigationJS from "!raw-loader!./MaterialBottomNavigation";
import MaterialBreadcrumbsJS from "!raw-loader!./MaterialBreadcrumbs";
import MaterialLinkJS from "!raw-loader!./MaterialLink";
import MaterialMenuJS from "!raw-loader!./MaterialMenu";
import MaterialStepperJS from "!raw-loader!./MaterialStepper";
import MaterialTabsJS from "!raw-loader!./MaterialTabs";
import MaterialHeaderJS from "!raw-loader!./MaterialHeader";
import MaterialAccordionJS from "!raw-loader!./MaterialAccordion";
import MaterialCircularProgressJS from "!raw-loader!./MaterialCircularProgress";
import MaterialLinearProgressJS from "!raw-loader!./MaterialLinearProgress";
import MaterialDialogJS from "!raw-loader!./MaterialDialog";
import MaterialSnackbarJS from "!raw-loader!./MaterialSnackbar";
import MaterialAlertJS from "!raw-loader!./MaterialAlert";
import MaterialBackdropJS from "!raw-loader!./MaterialBackdrop";
import MaterialBadgetJS from "!raw-loader!./MaterialBadget";
import MaterialChipJS from "!raw-loader!./MaterialChip";
import MaterialListJS from "!raw-loader!./MaterialList";
import MaterialTableJS from "!raw-loader!./MaterialTable";
import MaterialTooltipJS from "!raw-loader!./MaterialTooltip";
import MaterialTypographyJS from "!raw-loader!./MaterialTypography";

let input = {
    typeId: 104,
    npm: "npm install @material-ui/core",
    Component: MaterialTextField,
    originalJS: MaterialTextFieldJS,
    title: "Material design - Text field",
    tags: ["material designs", "input", "field"],
    properties: [{
            type: "inputText",
            label: "Label",
            id: "label",
            desc: `The label content.`,
            value: "Input text",
        },
        {
            type: "select",
            label: "Size",
            value: "medium",
            desc: "The size of the checkbox. small is equivalent to the dense checkbox styling.",
            id: "size",
            list: [{
                    value: "medium",
                    name: "Medium"
                },
                {
                    value: "small",
                    name: "Small"
                },
            ],
        },
        {
            type: "select",
            label: "Variant",
            desc: "The variant to use.",
            value: "standard",
            id: "variant",
            list: [{
                    value: "filled",
                    name: "Filled"
                },
                {
                    value: "outlined",
                    name: "Outlined"
                },
                {
                    value: "standard",
                    name: "Standard"
                },
            ],
        },
        {
            type: "inputText",
            label: "Value",
            id: "value",
            desc: `The value of the input element, required for a controlled component.`,
            value: "",
        },
        {
            type: "inputText",
            label: "Placeholder",
            id: "placeholder",
            desc: `The short hint displayed in the input before the user enters a value.`,
            value: "Placeholder",
        },
        {
            type: "section",
            items: [{
                    type: "inputText",
                    label: "Id",
                    id: "id",
                    desc: `The id of the input element. Use this prop to make label and helperText accessible for screen readers.`,
                    value: "",
                },
                {
                    type: "inputText",
                    label: "Name",
                    id: "name",
                    desc: `Name attribute of the input element.`,
                    value: "",
                },
            ],
        },
        {
            type: "inputText",
            label: "Default value",
            id: "defaultValue",
            desc: `The default value of the input element.`,
            value: "",
        },
        {
            type: "inputText",
            label: "Autocomplete",
            id: "autoComplete",
            desc: `This prop helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it following the specification.`,
            value: "",
        },
        {
            type: "section",
            items: [{
                    type: "checkbox",
                    label: "Auto focus",
                    desc: "If true, the input element will be focused during the first mount.",
                    id: "autoFocus",
                    value: false,
                },
                {
                    type: "checkbox",
                    label: "Disabled",
                    desc: "If true, the input element will be disabled.",
                    id: "disabled",
                    value: false,
                },
            ],
        },
        {
            type: "section",
            items: [{
                    type: "checkbox",
                    label: "Error",
                    desc: "If true, the label will be displayed in an error state.",
                    id: "error",
                    value: false,
                },
                {
                    type: "checkbox",
                    label: "Full width",
                    desc: "If true, the input will take up the full width of its container.",
                    id: "fullWidth",
                    value: false,
                },
            ],
        },
        {
            type: "select",
            label: "Margin",
            value: "",
            desc: "If dense or normal, will adjust vertical spacing of this and contained components.",
            id: "margin",
            list: [{
                    value: "dense",
                    name: "Dense"
                },
                {
                    value: "none",
                    name: "None"
                },
                {
                    value: "normal",
                    name: "Normal"
                },
            ],
        },
        {
            type: "section",
            items: [{
                    type: "checkbox",
                    label: "Multiline",
                    desc: "If true, a textarea element will be rendered instead of an input.",
                    id: "multiline",
                    value: false,
                },
                {
                    type: "checkbox",
                    label: "Required",
                    desc: "If true, the label is displayed as required and the input element` will be required.",
                    id: "required",
                    value: false,
                },
            ],
        },
        {
            type: "section",
            items: [{
                    type: "number",
                    label: "Rows",
                    id: "rows",
                    desc: "Number of rows to display when multiline option is set to true.",
                    value: "",
                },
                {
                    type: "number",
                    label: "Max rows",
                    id: "rowsMax",
                    desc: "Maximum number of rows to display when multiline option is set to true.",
                    value: "",
                },
            ],
        },
        {
            type: "function",
            label: "On change",
            id: "onChange",
            desc: "Callback fired when the state is changed.",
            params: [{
                type: "json",
                name: "event"
            }],
        },
        {
            type: "inputText",
            label: "Type",
            value: "text",
            desc: "Type of the input element. It should be a valid HTML5 input type.",
            id: "type",
        },
    ],
};

let textarea = deepcopy(input) //Object.assign({}, input);
textarea.typeId = 105;
textarea.properties = textarea.properties.map((item) => {
    if (item.id === "label") {
        item.value = "Textarea";

        return item;
    } else if (item.type === "section") {
        item.items = item.items.map((innerItem) => {
            if (innerItem.id === "multiline") {
                innerItem.value = true;

                return innerItem;
            } else if (innerItem.id === "rows") {
                innerItem.value = 4;

                return innerItem;
            }
            return innerItem;
        });
    }
    return item;
});

textarea.title = "Material design - textarea";
textarea.tags = ["material designs", "textarea"];

let datetimeLocal = Object.assign({}, input);
datetimeLocal.typeId = 106;
datetimeLocal.title = "Material design - datetime";
datetimeLocal.tags = ["material designs", "datetime", "date-time"];
datetimeLocal.properties = textarea.properties.map((item) => {
    if (item.id === "type") {
        let newItem = Object.assign({}, item);
        newItem.value = "datetime-local";

        return newItem;
    } else if (item.id === "defaultValue") {
        let newItem = Object.assign({}, item);
        newItem.value = "2017-05-24T10:30";

        return newItem;
    } else if (item.id === "label") {
        let newItem = Object.assign({}, item);
        newItem.value = "Datetime";

        return newItem;
    }
    return item;
});

let date = Object.assign({}, input);
date.typeId = 107;
date.title = "Material design - datetime";
date.tags = ["material designs", "datetime", "date-time"];
date.properties = date.properties.map((item) => {
    if (item.id === "type") {
        let newItem = Object.assign({}, item);
        newItem.value = "date";

        return newItem;
    } else if (item.id === "defaultValue") {
        let newItem = Object.assign({}, item);
        newItem.value = "2017-05-24";

        return newItem;
    } else if (item.id === "label") {
        let newItem = Object.assign({}, item);
        newItem.value = "Date";

        return newItem;
    }

    return item;
});

let time = Object.assign({}, input);
time.typeId = 108;
time.title = "Material design - time";
time.tags = ["material designs", "time"];
time.properties = time.properties.map((item) => {
    if (item.id === "type") {
        let newItem = Object.assign({}, item);
        newItem.value = "time";

        return newItem;
    } else if (item.id === "defaultValue") {
        let newItem = Object.assign({}, item);
        newItem.value = "10:30";

        return newItem;
    } else if (item.id === "label") {
        let newItem = Object.assign({}, item);
        newItem.value = "Time";

        return newItem;
    }

    return item;
});

const allMaterialComponents = [{
        typeId: 118,
        npm: "npm install @material-ui/core",
        widthDemo: 350,
        width: 350,
        title: "Material design - header",
        tags: ["material designs", "bar", "header"],
        originalJS: MaterialHeaderJS,
        Component: MaterialHeader,
        properties: [{
            type: "select",
            id: "position",
            label: "Position",
            desc: "The positioning type. The behavior of the different options is described in the MDN web docs. Note: sticky is not universally supported and will fall back to static when unavailable.",
            list: [{
                    value: "fixed",
                    name: "fixed"
                },
                {
                    value: "relative",
                    name: "relative"
                },
                {
                    value: "static",
                    name: "static"
                },
                {
                    value: "sticky",
                    name: "sticky"
                },
            ],
            value: "relative",
        }, ],
    },
    {
        typeId: 112,
        npm: "npm install @material-ui/core",
        title: "Material design - bottom navigation",
        tags: ["material designs", "navigation", "menu", "navigation"],
        originalJS: MaterialBottomNavigationJS,
        Component: MaterialBottomNavigation,
        properties: [{
                type: "checkbox",
                id: "showLabels",
                label: "showLabels",
                desc: "If true, all BottomNavigationActions will show their labels. By default, only the selected BottomNavigationAction will show its label.",
                value: true,
            },
            {
                type: "number",
                id: "value",
                label: "value",
                desc: "The value of the currently selected BottomNavigationAction.",
                value: 0,
            },
            {
                type: "function",
                id: "onChange",
                label: "onChange",
                desc: "Callback fired when the value changes.Signature:function(event: object, value: any) => voidevent: The event source of the callback.value: We default to the index of the child.",
                params: [{
                        type: "event",
                        name: "event"
                    },
                    {
                        type: "string",
                        name: "newValue"
                    },
                ],
            },
        ],
    },
    {
        typeId: 100,
        npm: "npm install @material-ui/core",
        title: "Material design - Checkbox",
        tags: ["material designs", "checkbox", "radio"],
        Component: MaterialCheckbox,
        originalJS: MaterialCheckboxJS,
        properties: [{
                type: "checkbox",
                id: "checked",
                desc: "If true, the component is checked.",
                label: "Checked",
                value: true,
            },
            {
                type: "select",
                label: "Size",
                value: "medium",
                desc: "The size of the checkbox. small is equivalent to the dense checkbox styling.",
                id: "size",
                list: [{
                        value: "medium",
                        name: "Medium"
                    },
                    {
                        value: "small",
                        name: "Small"
                    },
                ],
            },
            {
                type: "color",
                label: "Color",
                value: "#1976d2",
                id: "color",
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        desc: "If true, the button will be disabled.",
                        label: "Disabled",
                        id: "disabled",
                        value: false,
                    },
                    {
                        type: "checkbox",
                        label: "Ripple",
                        desc: "If true, the ripple effect will be disabled.⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure to highlight the element by applying separate styles with the focusVisibleClassName.",
                        id: "disableRipple",
                        value: false,
                    },
                ],
            },
            {
                type: "inputText",
                id: "id",
                label: "Id",
                value: "",
                desc: "The id of the input element.",
            },
            {
                type: "checkbox",
                label: "Indeterminate",
                desc: "If true, the component appears indeterminate. This does not set the native input element to indeterminate due to inconsistent behavior across browsers. However, we set a data-indeterminate attribute on the input.",
                id: "indeterminate",
                value: false,
            },
            {
                type: "function",
                label: "On change",
                id: "onChange",
                desc: "Callback fired when the state is changed.",
                params: [{
                    type: "json",
                    name: "event"
                }],
            },
        ],
    },
    {
        typeId: 101,
        npm: "npm install @material-ui/core",
        Component: MaterialButton,
        originalJS: MaterialButtonJS,
        title: "Material design - button",
        tags: ["material designs", "button"],
        props: {
            variant: "contained",
            text: "Button",
            color: "#1976d2",
        },
        properties: [{
                type: "inputText",
                label: "Text",
                value: "text",
                id: "text",
            },
            {
                type: "color",
                label: "Color",
                value: "#ffffff",
                id: "color",
            },
            {
                type: "color",
                label: "Background",
                value: "#1976d2",
                id: "background",
            },
            {
                type: "section",
                items: [{
                        type: "select",
                        label: "Variant",
                        value: "contained",
                        id: "variant",
                        list: [{
                                value: "contained",
                                name: "Contained"
                            },
                            {
                                value: "outlined",
                                name: "Outlined"
                            },
                            {
                                value: "",
                                name: "Empty"
                            },
                        ],
                    },
                    {
                        type: "select",
                        label: "Size",
                        value: "medium",
                        id: "size",
                        desc: "The size of the button. small is equivalent to the dense button styling.",
                        list: [{
                                value: "small",
                                name: "Small"
                            },
                            {
                                value: "medium",
                                name: "Medium"
                            },
                            {
                                value: "large",
                                name: "Large"
                            },
                        ],
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        desc: "If true, the button will be disabled.",
                        label: "Disabled",
                        id: "disabled",
                        value: false,
                    },
                    {
                        type: "checkbox",
                        desc: "If true, no elevation is used.",
                        label: "Elevation",
                        id: "disableElevation",
                        value: false,
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        label: "Focus ripple",
                        desc: "If true, the keyboard focus ripple will be disabled.",
                        id: "disableFocusRipple",
                        value: false,
                    },
                    {
                        type: "checkbox",
                        label: "Disable ripple",
                        desc: "If true, the ripple effect will be disabled.⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure to highlight the element by applying separate styles with the focusVisibleClassName.",
                        id: "disableRipple",
                        value: false,
                    },
                ],
            },
            {
                type: "checkbox",
                id: "fullWidth",
                desc: "If true, the button will take up the full width of its container.",
                label: "Full width",
                value: false,
            },
        ],
    },
    {
        title: "Material design - button group",
        tags: ["material designs", "button", "button group"],
        typeId: 102,
        npm: "npm install @material-ui/core",
        originalJS: MaterialButtonGroupJS,
        Component: MaterialButtonGroup,
        properties: [{
                type: "color",
                label: "Background",
                value: "#1976d2",
                id: "background",
            },
            {
                type: "color",
                label: "Color",
                value: "#FFFFFF",
                id: "color",
            },
            {
                type: "section",
                items: [{
                        type: "select",
                        label: "Variant",
                        value: "contained",
                        id: "variant",
                        list: [{
                                value: "contained",
                                name: "Contained"
                            },
                            {
                                value: "outlined",
                                name: "Outlined"
                            },
                            {
                                value: "text",
                                name: "Text"
                            },
                        ],
                    },
                    {
                        type: "select",
                        label: "Size",
                        desc: "The size of the button. small is equivalent to the dense button styling.",
                        value: "medium",
                        id: "size",
                        list: [{
                                value: "small",
                                name: "Small"
                            },
                            {
                                value: "medium",
                                name: "Medium"
                            },
                            {
                                value: "large",
                                name: "Large"
                            },
                        ],
                    },
                ],
            },
            {
                type: "select",
                label: "Orientation",
                value: "horizontal",
                desc: "The group orientation (layout flow direction).",
                id: "orientation",
                list: [{
                        value: "horizontal",
                        name: "Horizontal"
                    },
                    {
                        value: "vertical",
                        name: "Vertical"
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        label: "Disabled",
                        desc: "If true, the buttons will be disabled.",
                        id: "disabled",
                        value: false,
                    },
                    {
                        type: "checkbox",
                        label: "Elevation",
                        desc: "If true, no elevation is used.",
                        id: "disableElevation",
                        value: false,
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        label: "Focus ripple",
                        id: "disableFocusRipple",
                        desc: "If true, the button keyboard focus ripple will be disabled.",
                        value: false,
                    },
                    {
                        type: "checkbox",
                        label: "Ripple",
                        desc: "If true, the button ripple effect will be disabled.",
                        id: "disableRipple",
                        value: false,
                    },
                ],
            },
            {
                type: "checkbox",
                label: "Full width",
                id: "fullWidth",
                desc: "If true, the buttons will take up the full width of its container.",
                value: false,
            },
        ],
    },
    {
        typeId: 103,
        npm: "npm install @material-ui/core",
        originalJS: MaterialFloatJS,
        Component: MaterialFloat,
        title: "Material design - Float button",
        tags: ["material designs", "float button", "button"],
        props: {
            size: "medium",
            color: "#1976d2",
        },
        properties: [{
                type: "color",
                label: "background",
                value: "#1976d2",
                id: "color",
            },
            {
                type: "section",
                items: [{
                        type: "select",
                        label: "Variant",
                        value: "round",
                        id: "variant",
                        list: [{
                                value: "extended",
                                name: "Extended"
                            },
                            {
                                value: "round",
                                name: "Round"
                            },
                        ],
                    },
                    {
                        type: "select",
                        label: "Size",
                        value: "medium",
                        desc: "The size of the button. small is equivalent to the dense button styling.",
                        id: "size",
                        list: [{
                                value: "small",
                                name: "Small"
                            },
                            {
                                value: "medium",
                                name: "Medium"
                            },
                            {
                                value: "big",
                                name: "Big"
                            },
                        ],
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        desc: "If true, the button will be disabled.",
                        label: "Disabled",
                        id: "disabled",
                        value: false,
                    },
                    {
                        type: "checkbox",
                        label: "Ripple",
                        desc: "If true, the ripple effect will be disabled.⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure to highlight the element by applying separate styles with the focusVisibleClassName.",
                        id: "disableRipple",
                        value: false,
                    },
                ],
            },
            {
                type: "checkbox",
                label: "Focus ripple",
                desc: "If true, the keyboard focus ripple will be disabled.",
                id: "disableFocusRipple",
                value: false,
            },
        ],
    },
    input,
    textarea,
    datetimeLocal,
    date,
    time,
    {
        typeId: 109,
        npm: "npm install @material-ui/core",
        width: 200,
        widthDemo: 200,
        title: "Material design - slider",
        tags: ["slider", "progress"],
        originalJS: MaterialSliderJS,
        replacements: [{
            key: "props.value",
            props: "value"
        }],
        Component: MaterialSlider,
        properties: [{
                type: "",
                id: "defaultValue",
                label: "defaultValue",
                desc: "The default element value. Use when the component is not controlled.",
            },
            {
                type: "checkbox",
                id: "disabled",
                label: "disabled",
                desc: "If true, the slider will be disabled.",
            },
            {
                type: "",
                id: "marks",
                label: "marks",
                desc: "Marks indicate predetermined values to which the user can move the slider. If true the marks will be spaced according the value of the step prop. If an array, it should contain objects with value and an optional label keys.",
            },
            {
                type: "section",
                items: [{
                        type: "number",
                        id: "max",
                        label: "max",
                        desc: "The maximum allowed value of the slider. Should not be equal to min.",
                        value: 100,
                    },
                    {
                        type: "number",
                        id: "min",
                        label: "min",
                        desc: "The minimum allowed value of the slider. Should not be equal to max.",
                        value: 0,
                    },
                ],
            },
            {
                type: "select",
                id: "orientation",
                label: "orientation",
                desc: "The slider orientation.",
                list: [{
                        value: "horizontal",
                        name: "Horizontal"
                    },
                    {
                        value: "vertical",
                        name: "Vertical"
                    },
                ],
                value: "horizontal",
            },
            {
                type: "inputText",
                id: "name",
                label: "name",
                desc: "Name attribute of the hidden input element.",
            },
            {
                type: "number",
                id: "step",
                label: "step",
                desc: 'The granularity with which the slider can step through values. (A "discrete" slider.) The min prop serves as the origin for the valid values. We recommend (max - min) to be evenly divisible by the step.When step is null, the thumb can only be slid onto marks provided with the marks prop.',
                // value:1
            },
            {
                type: "select",
                id: "track",
                label: "track",
                desc: "The track presentation:- normal the track will render a bar representing the slider value. - inverted the track will render a bar representing the remaining slider value. - false the track will render without a bar.",
                list: [{
                        value: "normal",
                        name: "Bormal"
                    },
                    {
                        value: false,
                        name: "False"
                    },
                    {
                        value: "inverted",
                        name: "Inverted"
                    },
                ],
                value: "normal",
            },
            {
                type: "number",
                id: "value",
                label: "Value",
                desc: "The value of the slider. For ranged sliders, provide an array with two values.",
                value: 20,
            },
            {
                type: "select",
                id: "valueLabelDisplay",
                label: "Value label",
                desc: "Controls when the value label is displayed:- auto the value label will display when the thumb is hovered or focused. - on will display persistently. - off will never display.",
                list: [{
                        value: "on",
                        name: "On"
                    },
                    {
                        value: "auto",
                        name: "Auto"
                    },
                    {
                        value: "off",
                        name: "Off"
                    },
                ],
                value: "on",
            },
            {
                type: "color",
                label: "Color",
                value: "#1976d2",
                id: "color",
            },
            {
                type: "function",
                id: "onChange",
                label: "On change",
                desc: "Callback function that is fired when the slider's value changed.Signature:function(event: object, value: number | number[]) => voidevent: The event source of the callback.value: The new value.",
                params: [{
                        type: "event",
                        name: "event"
                    },
                    {
                        type: "number",
                        name: "value"
                    },
                ],
            },
            {
                type: "function",
                id: "onChangeCommitted",
                label: "On change committed",
                desc: "Callback function that is fired when the mouseup is triggered.Signature:function(event: object, value: number | number[]) => voidevent: The event source of the callback.value: The new value.",
                params: [{
                        type: "event",
                        name: "event"
                    },
                    {
                        type: "number",
                        name: "value"
                    },
                ],
            },
            {
                type: "function",
                id: "getAriaLabel",
                label: "Get Aria Label",
                desc: "Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.Signature:function(index: number) => stringindex: The thumb label's index to format.",
                params: [{
                        type: "event",
                        name: "event"
                    },
                    {
                        type: "number",
                        name: "value"
                    },
                ],
            },
            {
                type: "function",
                id: "getAriaValueText",
                label: "Get Aria Text",
                desc: "Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.Signature:function(value: number, index: number) => stringvalue: The thumb label's value to format.index: The thumb label's index to format.",
                params: [{
                        type: "number",
                        name: "value"
                    },
                    {
                        type: "number",
                        name: "index"
                    },
                ],
            },
            {
                type: "function",
                id: "scale",
                label: "Scale",
                desc: "A transformation function, to change the scale of the slider.",
            },
            {
                type: "function",
                id: "valueLabelFormat",
                label: "Label Format",
                desc: "The format function the value label's value.When a function is provided, it should have the following signature:- {number} value The value label's value to format - {number} index The value label's index to format",
            },
            {
                type: "section",
                items: [{
                        type: "inputText",
                        id: "aria-label",
                        label: "Label",
                        desc: "The label of the slider.",
                        value: "Label",
                    },
                    {
                        type: "inputText",
                        id: "aria-labelledby",
                        label: "Label led by",
                        desc: "The id of the element containing a label for the slider.",
                    },
                ],
            },
            {
                type: "inputText",
                id: "aria-valuetext",
                label: "Value text",
                desc: "A string value that provides a user-friendly name for the current value of the slider.",
            },
        ],
    },
    {
        typeId: 110,
        npm: "npm install @material-ui/core",
        originalJS: MaterialSwitchJS,
        Component: MaterialSwitch,
        replacements: [{
                key: "props.checked",
                props: "checked"
            },
            {
                key: "classes={{root:styles.boxSizing}}"
            },
        ],
        title: "Material design - switch",
        tags: ["material designs", "switch", "switch button", "checkbox"],
        properties: [{
                type: "section",
                items: [{
                        type: "checkbox",
                        id: "checked",
                        label: "Checked",
                        desc: "If true, the component is checked.",
                        value: true,
                    },
                    {
                        type: "checkbox",
                        id: "disabled",
                        label: "Disabled",
                        desc: "If true, the switch will be disabled.",
                    },
                ],
            },
            {
                type: "checkbox",
                id: "disableRipple",
                label: "Disable ripple",
                desc: "If true, the ripple effect will be disabled.",
            },
            {
                type: "select",
                id: "edge",
                label: "edge",
                desc: "If given, uses a negative margin to counteract the padding on one side (this is often helpful for aligning the left or right side of the icon with content above or below, without ruining the border size and shape).",
                list: [{
                        value: "end",
                        name: "End"
                    },
                    {
                        value: "start",
                        name: "Start"
                    },
                    {
                        value: "false",
                        name: "false"
                    },
                ],
                value: "false",
            },
            {
                type: "inputText",
                id: "id",
                label: "id",
                desc: "The id of the input element.",
            },
            {
                type: "function",
                id: "onChange",
                label: "onChange",
                desc: "Callback fired when the state is changed.Signature:function(event: object) => voidevent: The event source of the callback. You can pull out the new value by accessing event.target.value (string). You can pull out the new checked state by accessing event.target.checked (boolean).",
                params: [{
                    type: "event",
                    name: "event"
                }],
            },
            {
                type: "checkbox",
                id: "required",
                label: "required",
                desc: "If true, the input element will be required.",
            },
            {
                type: "select",
                id: "size",
                label: "size",
                desc: "The size of the switch. small is equivalent to the dense switch styling.",
                list: [{
                        value: "small",
                        name: "Small"
                    },
                    {
                        value: "medium",
                        name: "Medium"
                    },
                ],
                value: "medium",
            },
            {
                type: "inputText",
                id: "value",
                label: "value",
                desc: 'The value of the component. The DOM API casts this to a string. The browser uses "on" as the default value.',
            },
        ],
    },
    {
        typeId: 111,
        npm: "npm install @material-ui/core",
        title: "Material design - select list",
        replacements: [{
            key: "props.value",
            props: "value"
        }],
        tags: ["material designs", "select", "list", "options"],
        originalJS: MaterialSelectJS,
        Component: MaterialSelect,
        properties: [{
                type: "Json",
                desc: "All the menu items",
                label: "Data",
                items: [{
                        type: "inputText",
                        label: "Value",
                        value: "",
                        id: "value",
                    },
                    {
                        type: "inputText",
                        label: "Id",
                        value: "",
                        id: "id",
                    },
                ],
                value: [{
                        id: "one",
                        value: "One"
                    },
                    {
                        id: "two",
                        value: "Two"
                    },
                    {
                        id: "tree",
                        value: "Tree"
                    },
                ],
                id: "data",
            },
            {
                type: "inputText",
                id: "value",
                label: "Value",
                desc: "The input value. Providing an empty string will select no options. This prop is required when the native prop is false (default). Set to an empty string '' if you don't want any of the available options to be selected.If the value is an object it must have reference equality with the option in order to be selected. If the value is not an object, the string representation must match with the string representation of the option in order to be selected.",
                value: "one",
            },
            {
                type: "select",
                id: "variant",
                label: "variant",
                desc: "The variant to use.",
                list: [{
                        value: "filled",
                        name: "Filled"
                    },
                    {
                        value: "outlined",
                        name: "Outlined"
                    },
                    {
                        value: "standard",
                        name: "Standard"
                    },
                ],
                value: "standard",
            },
            {
                type: "inputText",
                id: "defaultValue",
                label: "defaultValue",
                desc: "The default element value. Use when the component is not controlled.",
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        id: "autoWidth",
                        label: "autoWidth",
                        desc: "If true, the width of the popover will automatically be set according to the items inside the menu, otherwise it will be at least the width of the select input.",
                    },
                    {
                        type: "checkbox",
                        id: "displayEmpty",
                        label: "displayEmpty",
                        desc: "If true, a value is displayed even if no items are selected.In order to display a meaningful value, a function should be passed to the renderValue prop which returns the value to be displayed when no items are selected. You can only use it when the native prop is false (default).",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "inputText",
                        id: "id",
                        label: "id",
                        desc: "The id of the wrapper element or the select element when native.",
                    },
                    {
                        type: "inputText",
                        id: "labelId",
                        label: "labelId",
                        desc: "The ID of an element that acts as an additional label. The Select will be labelled by the additional label and the selected value.",
                    },
                ],
            },
            {
                type: "number",
                id: "labelWidth",
                label: "Label width",
                desc: "See OutlinedInput#label",
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        id: "multiple",
                        label: "Multiple",
                        desc: "If true, value must be an array and the menu will support multiple selections.",
                    },
                    {
                        type: "checkbox",
                        id: "native",
                        label: "Native",
                        desc: "If true, the component will be using a native select element.",
                    },
                ],
            },
            {
                type: "function",
                id: "onChange",
                label: "onChange",
                desc: "Callback function fired when a menu item is selected.Signature:function(event: object, child?: object) => voidevent: The event source of the callback. You can pull out the new value by accessing event.target.value (any).child: The react element that was selected when native is false (default).",
                params: [{
                        type: "event",
                        name: "event"
                    },
                    {
                        type: "event",
                        name: "child"
                    },
                ],
            },
            {
                type: "function",
                id: "onClose",
                label: "onClose",
                desc: "Callback fired when the component requests to be closed. Use in controlled mode (see open).Signature:function(event: object) => voidevent: The event source of the callback.",
                params: [{
                    type: "event",
                    name: "event"
                }],
            },
            {
                type: "function",
                id: "onOpen",
                label: "onOpen",
                desc: "Callback fired when the component requests to be opened. Use in controlled mode (see open).Signature:function(event: object) => voidevent: The event source of the callback.",
                params: [{
                    type: "event",
                    name: "event"
                }],
            },
            {
                type: "checkbox",
                id: "open",
                label: "Open",
                desc: "Control select open state. You can only use it when the native prop is false (default).",
            },
            {
                type: "function",
                id: "renderValue",
                label: "Render value",
                desc: "Render the selected value. You can only use it when the native prop is false (default).Signature:function(value: any) => ReactNodevalue: The value provided to the component.",
                params: [{
                    type: "any",
                    name: "value"
                }],
            },
        ],
    },
    {
        typeId: 113,
        npm: "npm install @material-ui/core",
        title: "Material design - Breadcrumbs",
        tags: ["material designs", "breadcrumbs", "navigation"],
        Component: MaterialBreadcrumbs,
        originalJS: MaterialBreadcrumbsJS,
        properties: [{
                type: "Json",
                desc: "All the links",
                label: "Data",
                items: [{
                        type: "inputText",
                        label: "Text",
                        value: "",
                        id: "text",
                    },
                    {
                        type: "inputText",
                        label: "Link",
                        value: "",
                        id: "link",
                    },
                ],
                value: [{
                        text: "Material-UI",
                        link: "/"
                    },
                    {
                        text: "Cure",
                        value: "/getting-started/installation/"
                    },
                    {
                        text: "breadcrumb",
                        value: "/getting-started/installation/"
                    },
                ],
                id: "data",
            },
            {
                type: "color",
                label: "Selected color",
                value: "#000000",
                id: "color",
            },
            {
                type: "inputText",
                id: "separator",
                label: "Separator",
                desc: "Custom separator node.",
                value: "/",
            },
            {
                type: "inputText",
                id: "expandText",
                label: "Expand text",
                desc: "Override the default label for the expand button.For localization purposes, you can use the provided translations.",
            },
            {
                type: "number",
                id: "itemsAfterCollapse",
                label: "Items after collapse",
                desc: "If max items is exceeded, the number of items to show after the ellipsis.",
            },
            {
                type: "number",
                id: "itemsBeforeCollapse",
                label: "Items before collapse",
                desc: "If max items is exceeded, the number of items to show before the ellipsis.",
            },
            {
                type: "number",
                id: "maxItems",
                label: "Max items",
                desc: "Specifies the maximum number of breadcrumbs to display. When there are more than the maximum number, only the first itemsBeforeCollapse and last itemsAfterCollapse will be shown, with an ellipsis in between.",
            },
        ],
    },
    {
        typeId: 114,
        npm: "npm install @material-ui/core",
        title: "Material design - link",
        tags: ["material designs", "link"],
        Component: MaterialLink,
        originalJS: MaterialLinkJS,
        properties: [{
                type: "inputText",
                id: "text",
                label: "Text",
                desc: "Link text",
                value: "Text",
            },
            {
                type: "select",
                id: "underline",
                label: "underline",
                desc: "Controls when the link should have an underline.",
                list: [{
                        value: "none",
                        name: "None"
                    },
                    {
                        value: "hover",
                        name: "Hover"
                    },
                    {
                        value: "always",
                        name: "Always"
                    },
                ],
                value: "hover",
            },
        ],
    },
    {
        typeId: 115,
        npm: "npm install @material-ui/core",
        title: "Material design - tabs",
        tags: ["material designs", "menu", "list", "tabs"],
        originalJS: MaterialMenuJS,
        Component: MaterialMenu,
        properties: [{
                type: "select",
                id: "variant",
                label: "variant",
                desc: "The variant to use. Use menu to prevent selected items from impacting the initial focus and the vertical alignment relative to the anchor element.",
                list: [{
                        value: "menu",
                        name: "Menu"
                    },
                    {
                        value: "selectedMenu",
                        name: "Selected menu"
                    },
                ],
                value: "selectedMenu",
            },
            {
                type: "number",
                id: "transitionDuration",
                label: "transitionDuration",
                desc: "The length of the transition in ms, or 'auto'",
                value: 200,
            },
            {
                type: "checkbox",
                id: "autoFocus",
                label: "Auto focus",
                desc: 'If true (Default) will focus the [role="menu"] if no focusable child is found. Disabled children are not focusable. If you set this prop to false focus will be placed on the parent modal container. This has severe accessibility implications and should only be considered if you manage focus otherwise.',
            },
            {
                type: "checkbox",
                id: "disableAutoFocusItem",
                label: "Disable focus item",
                desc: 'When opening the menu will not focus the active item but the [role="menu"] unless autoFocus is also set to false. Not using the default means not following WAI-ARIA authoring practices. Please be considerate about possible accessibility implications.',
            },
            {
                type: "function",
                id: "onClose",
                label: "On close",
                desc: 'Callback fired when the component requests to be closed.Signature:function(event: object, reason: string) => voidevent: The event source of the callback.reason: Can be: "escapeKeyDown", "backdropClick", "tabKeyDown".',
                params: [{
                        type: "event",
                        name: "event"
                    },
                    {
                        type: "string",
                        name: "reason"
                    },
                ],
            },
            {
                type: "function",
                id: "onEnter",
                label: "On enter",
                desc: "Callback fired before the Menu enters.",
            },
            {
                type: "function",
                id: "onEntered",
                label: "On entered",
                desc: "Callback fired when the Menu has entered.",
            },
            {
                type: "function",
                id: "onEntering",
                label: "On entering",
                desc: "Callback fired when the Menu is entering.",
            },
            {
                type: "function",
                id: "onExit",
                label: "On exit",
                desc: "Callback fired before the Menu exits.",
            },
            {
                type: "function",
                id: "onExited",
                label: "On exited",
                desc: "Callback fired when the Menu has exited.",
            },
            {
                type: "function",
                id: "onExiting",
                label: "On exiting",
                desc: "Callback fired when the Menu is exiting.",
            },
        ],
    },
    {
        typeId: 116,
        npm: "npm install @material-ui/core",
        width: 350,
        title: "Material design - stepper",
        tags: ["material designs", "stepper", "steps", "tour"],
        replacements: [{
            key: "props.steps",
            props: "steps"
        }],
        originalJS: MaterialStepperJS,
        Component: MaterialStepper,
        properties: [{
                type: "Json",
                desc: "All the steps",
                label: "Steps",
                items: [{
                    type: "inputText",
                    label: "Label",
                    value: "",
                    id: "label",
                }, ],
                value: [{
                    label: "One"
                }, {
                    label: "Two"
                }, {
                    label: "tree"
                }],
                id: "steps",
            },
            {
                type: "number",
                id: "activeStep",
                label: "activeStep",
                desc: "Set the active step (zero based index). Set to -1 to disable all the steps.",
                value: 1,
            },
            {
                type: "checkbox",
                id: "alternativeLabel",
                label: "alternativeLabel",
                desc: "If set to 'true' and orientation is horizontal, then the step label will be positioned under the icon.",
            },
            {
                type: "",
                id: "connector",
                label: "connector",
                desc: "An element to be placed between each step.",
            },
            {
                type: "checkbox",
                id: "nonLinear",
                label: "nonLinear",
                desc: "If set the Stepper will not assist in controlling steps for linear flow.",
            },
            {
                type: "",
                id: "orientation",
                label: "orientation",
                desc: "The stepper orientation (layout flow direction).",
            },
        ],
    },
    {
        typeId: 117,
        npm: "npm install @material-ui/core",
        title: "Material design - menu",
        tags: ["material designs", "menu"],
        replacements: [{
            key: "/*replaceme*/props.value",
            props: "value"
        }],
        originalJS: MaterialTabsJS,
        Component: MaterialTabs,
        properties: [{
                type: "Json",
                desc: "All the steps",
                label: "Tags",
                id: "tabs",
                items: [{
                    type: "inputText",
                    label: "Label",
                    value: "",
                    id: "label",
                }, ],
                value: [{
                        label: "Item one"
                    },
                    {
                        label: "Item two"
                    },
                    {
                        label: "Item Tree"
                    },
                ],
            },
            {
                type: "number",
                id: "value",
                label: "value",
                desc: "The value of the currently selected Tab. If you don't want any selected Tab, you can set this property to false.",
                value: 1,
            },
            {
                type: "checkbox",
                id: "centered",
                label: "centered",
                desc: "If true, the tabs will be centered. This property is intended for large views.",
            },
            {
                type: "select",
                id: "orientation",
                label: "orientation",
                desc: "The tabs orientation (layout flow direction).",
                value: "horizontal",
                list: [{
                        value: "horizontal",
                        name: "Horizontal"
                    },
                    {
                        value: "vertical",
                        name: "Vertical"
                    },
                ],
            },
            {
                type: "select",
                id: "scrollButtons",
                label: "scrollButtons",
                desc: "Determine behavior of scroll buttons when tabs are set to scroll:- auto will only present them when not all the items are visible. - desktop will only present them on medium and larger viewports. - on will always present them. - off will never present them.",
                value: "auto",
                list: [{
                        value: "auto",
                        name: "Auto"
                    },
                    {
                        value: "desktop",
                        name: "Desktop"
                    },
                    {
                        value: "off",
                        name: "Off"
                    },
                    {
                        value: "on",
                        name: "On"
                    },
                ],
            },
            {
                type: "checkbox",
                id: "selectionFollowsFocus",
                label: "selectionFollowsFocus",
                desc: "If true the selected tab changes on focus. Otherwise it only changes on activation.",
            },
            {
                type: "select",
                id: "variant",
                label: "variant",
                desc: "Determines additional display behavior of the tabs: - scrollable will invoke scrolling properties and allow for horizontally  scrolling (or swiping) of the tab bar.  -fullWidth will make the tabs grow to use all the available space,  which should be used for small views, like on mobile.  - standard will render the default state.",
                list: [{
                        value: "fullWidth",
                        name: "FullWidth"
                    },
                    {
                        value: "scrollable",
                        name: "Scrollable"
                    },
                    {
                        value: "standard",
                        name: "Standard"
                    },
                ],
            },
            {
                type: "function",
                id: "onChange",
                label: "onChange",
                desc: "Callback fired when the value changes.Signature:function(event: object, value: any) => voidevent: The event source of the callbackvalue: We default to the index of the child (number)",
                params: [{
                        type: "event",
                        name: "event"
                    },
                    {
                        type: "string",
                        name: "value"
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "inputText",
                        id: "aria-label",
                        label: "Aria label",
                        desc: "The label for the Tabs as a string.",
                    },
                    {
                        type: "inputText",
                        id: "aria-labelledby",
                        label: "Label led by",
                        desc: "An id or list of ids separated by a space that label the Tabs.",
                    },
                ],
            },
        ],
    },
    {
        typeId: 119,
        npm: "npm install @material-ui/core",
        title: "Material design - Accordion",
        tags: ["material designs", "Accordion", "list", "faq"],
        replacements: [{
            key: "props.data",
            props: "data"
        }],
        originalJS: MaterialAccordionJS,
        Component: MaterialAccordion,
        properties: [{
                type: "Json",
                width: 880,
                desc: "All the menu items",
                label: "Data",
                items: [{
                        type: "inputText",
                        label: "Label",
                        value: "",
                        id: "label",
                    },
                    {
                        type: "checkbox",
                        label: "Expanded",
                        value: "",
                        id: "expanded",
                    },
                    {
                        type: "checkbox",
                        id: "defaultExpanded",
                        label: "defaultExpanded",
                        desc: "If true, expands the accordion by default.",
                    },
                    {
                        type: "checkbox",
                        id: "disabled",
                        label: "disabled",
                        desc: "If true, the accordion will be displayed in a disabled state.",
                    },
                    {
                        type: "checkbox",
                        id: "square",
                        label: "square",
                        desc: "If true, rounded corners are disabled.",
                    },
                ],
                value: [{
                        label: "Accordion 1",
                        expanded: false,
                        defaultExpanded: false,
                        disabled: false,
                        square: false,
                    },
                    {
                        label: "Accordion 2",
                        expanded: false,
                        defaultExpanded: false,
                        disabled: false,
                        square: false,
                    },
                    {
                        label: "Accordion 3",
                        expanded: false,
                        defaultExpanded: false,
                        disabled: false,
                        square: false,
                    },
                ],
                id: "data",
            },
            {
                type: "function",
                id: "onChange",
                label: "onChange",
                desc: "Callback fired when the expand/collapse state is changed.Signature:function(event: object, expanded: boolean) => voidevent: The event source of the callback.expanded: The expanded state of the accordion.",
            },
        ],
    },
    {
        typeId: 120,
        npm: "npm install @material-ui/core",
        title: "Material design - circular progress",
        tags: ["material designs", "refresh", "loading"],
        originalJS: MaterialCircularProgressJS,
        Component: MaterialCircularProgress,
        properties: [{
                type: "select",
                id: "variant",
                label: "variant",
                desc: "The variant to use. Use indeterminate when there is no progress value.",
                list: [{
                        value: "determinate",
                        name: "Determinate"
                    },
                    {
                        value: "indeterminate",
                        name: "Indeterminate"
                    },
                    {
                        value: "static",
                        name: "Static"
                    },
                ],
                value: "indeterminate",
            },
            {
                type: "checkbox",
                id: "disableShrink",
                label: "Disable shrink",
                desc: "If true, the shrink animation is disabled. This only works if variant is indeterminate.",
            },
            {
                type: "number",
                id: "size",
                label: "Size",
                desc: "The size of the circle. If using a number, the pixel unit is assumed. If using a string, you need to provide the CSS unit, e.g '3rem'.",
                value: 40,
            },
            {
                type: "number",
                id: "thickness",
                label: "Thickness",
                desc: "The thickness of the circle.",
                value: 3.6,
            },
            {
                type: "number",
                id: "value",
                label: "value",
                desc: "The value of the progress indicator for the determinate variant. Value between 0 and 100.",
            },
        ],
    },
    {
        typeId: 121,
        npm: "npm install @material-ui/core",
        title: "Material design - Linear progress",
        tags: ["material designs", "refresh", "loading", "Linear", "uploading"],
        width: 350,
        widthDemo: 300,
        originalJS: MaterialLinearProgressJS,
        Component: MaterialLinearProgress,
        properties: [{
                type: "select",
                id: "variant",
                label: "variant",
                desc: "The variant to use. Use indeterminate or query when there is no progress value.",
                list: [{
                        value: "determinate",
                        name: "Determinate"
                    },
                    {
                        value: "indeterminate",
                        name: "Indeterminate"
                    },
                    {
                        value: "query",
                        name: "query"
                    },
                ],
                value: "indeterminate",
            },
            {
                type: "number",
                id: "value",
                label: "Value",
                desc: "The value of the progress indicator for the determinate variant. Value between 0 and 100.",
            },
            {
                type: "number",
                id: "valueBuffer",
                label: "Value buffer",
                desc: "The value for the buffer variant. Value between 0 and 100.",
            },
        ],
    },
    {
        typeId: 122,
        npm: "npm install @material-ui/core",
        title: "Material design - Dialog",
        tags: ["material designs", "dialog", "modal", "popup"],
        width: 350,
        widthDemo: 300,
        originalJS: MaterialDialogJS,
        Component: MaterialDialog,
        properties: [{
                type: "checkbox",
                id: "disableBackdropClick",
                label: "Disable Backdrop",
                desc: "If true, clicking the backdrop will not fire the onClose callback.",
            },
            {
                type: "checkbox",
                id: "disableEscapeKeyDown",
                label: "Disable escape",
                desc: "If true, hitting escape will not fire the onClose callback.",
            },
            {
                type: "checkbox",
                id: "fullScreen",
                label: "Full screen",
                desc: "If true, the dialog will be full-screen",
            },
            {
                type: "checkbox",
                id: "fullWidth",
                label: "Full width",
                desc: "If true, the dialog stretches to maxWidth.Notice that the dialog width grow is limited by the default margin.",
            },
            {
                type: "section",
                items: [{
                        type: "inputText",
                        id: "aria-describedby",
                        label: "Aria describedby",
                        desc: "The id(s) of the element(s) that describe the dialog.",
                    },
                    {
                        type: "inputText",
                        id: "aria-labelledby",
                        label: "Aria labelledby",
                        desc: "The id(s) of the element(s) that label the dialog.",
                    },
                ],
            },
            {
                type: "function",
                id: "onBackdropClick",
                label: "onBackdropClick",
                desc: "Callback fired when the backdrop is clicked.",
            },
            {
                type: "function",
                id: "onClose",
                label: "onClose",
                desc: 'Callback fired when the component requests to be closed.Signature:function(event: object, reason: string) => voidevent: The event source of the callback.reason: Can be: "escapeKeyDown", "backdropClick".',
            },
            {
                type: "function",
                id: "onEnter",
                label: "onEnter",
                desc: "Callback fired before the dialog enters.",
            },
            {
                type: "function",
                id: "onEntered",
                label: "onEntered",
                desc: "Callback fired when the dialog has entered.",
            },
            {
                type: "function",
                id: "onEntering",
                label: "onEntering",
                desc: "Callback fired when the dialog is entering.",
            },
            {
                type: "function",
                id: "onEscapeKeyDown",
                label: "onEscapeKeyDown",
                desc: "Callback fired when the escape key is pressed, disableKeyboard is false and the modal is in focus.",
            },
            {
                type: "function",
                id: "onExit",
                label: "onExit",
                desc: "Callback fired before the dialog exits.",
            },
            {
                type: "function",
                id: "onExited",
                label: "onExited",
                desc: "Callback fired when the dialog has exited.",
            },
            {
                type: "function",
                id: "onExiting",
                label: "onExiting",
                desc: "Callback fired when the dialog is exiting.",
            },
            {
                type: "checkbox",
                id: "open*",
                label: "open*",
                desc: "If true, the Dialog is open.",
            },
            {
                type: "select",
                id: "scroll",
                label: "scroll",
                desc: "Determine the container for scrolling the dialog.",
                list: [{
                        value: "body",
                        name: "Body"
                    },
                    {
                        value: "paper",
                        name: "Paper"
                    },
                ],
                value: "body",
            },
        ],
    },
    {
        typeId: 123,
        npm: "npm install @material-ui/core",
        title: "Material design - Snackbar",
        tags: ["material designs", "Snackbar", "error", "message", "alert"],
        width: 350,
        widthDemo: 300,
        originalJS: MaterialSnackbarJS,
        replacements: [{
                key: "props.vertical",
                props: "vertical"
            },
            {
                key: "props.horizontal",
                props: "horizontal"
            },
            {
                key: "props.enteringScreen",
                props: "enteringScreen"
            },
            {
                key: "props.leavingScreen",
                props: "leavingScreen"
            },
        ],
        Component: MaterialSnackbar,
        properties: [{
                type: "select",
                id: "severity",
                label: "Severity",
                desc: "The anchor of the Snackbar.",
                list: [{
                        value: "error",
                        name: "Error"
                    },
                    {
                        value: "info",
                        name: "Info"
                    },
                    {
                        value: "success",
                        name: "Success"
                    },
                    {
                        value: "warning",
                        name: "Warning"
                    },
                ],
                value: "success",
            },
            {
                type: "select",
                id: "horizontal",
                label: "Horizontal",
                desc: "The anchor of the Snackbar.",
                list: [{
                        value: "center",
                        name: "Center"
                    },
                    {
                        value: "left",
                        name: "Left"
                    },
                    {
                        value: "right",
                        name: "Right"
                    },
                ],
                value: "left",
            },
            {
                type: "select",
                id: "vertical",
                label: "Vertical",
                desc: "The anchor of the Snackbar.",
                list: [{
                        value: "top",
                        name: "Top"
                    },
                    {
                        value: "bottom",
                        name: "Bottom"
                    },
                ],
                value: "bottom",
            },
            {
                type: "number",
                id: "autoHideDuration",
                label: "Hide duration",
                desc: "The number of milliseconds to wait before automatically calling the onClose function. onClose should then set the state of the open prop to hide the Snackbar. This behavior is disabled by default with the null value.",
            },
            {
                type: "checkbox",
                id: "disableWindowBlurListener",
                label: "disable Blur",
                desc: "If true, the autoHideDuration timer will expire even if the window is not focused.",
            },
            {
                type: "section",
                items: [{
                        type: "number",
                        id: "enteringScreen",
                        label: "Entering",
                        desc: "The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.",
                        value: 200,
                    },
                    {
                        type: "number",
                        id: "leavingScreen",
                        label: "Leaving",
                        desc: "The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.",
                        value: 200,
                    },
                ],
            },
            {
                type: "function",
                id: "onClose",
                label: "onClose",
                desc: 'Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop. The reason parameter can optionally be used to control the response to onClose, for example ignoring clickaway.Signature:function(event: object, reason: string) => voidevent: The event source of the callback.reason: Can be: "timeout" (autoHideDuration expired), "clickaway".',
            },
            {
                type: "function",
                id: "onEnter",
                label: "onEnter",
                desc: "Callback fired before the transition is entering.",
            },
            {
                type: "function",
                id: "onEntered",
                label: "onEntered",
                desc: "Callback fired when the transition has entered.",
            },
            {
                type: "function",
                id: "onEntering",
                label: "onEntering",
                desc: "Callback fired when the transition is entering.",
            },
            {
                type: "function",
                id: "onExit",
                label: "onExit",
                desc: "Callback fired before the transition is exiting.",
            },
            {
                type: "function",
                id: "onExited",
                label: "onExited",
                desc: "Callback fired when the transition has exited.",
            },
            {
                type: "function",
                id: "onExiting",
                label: "onExiting",
                desc: "Callback fired when the transition is exiting.",
            },
            {
                type: "checkbox",
                id: "open",
                label: "open",
                desc: "If true, Snackbar is open.",
            },
            {
                type: "number",
                id: "resumeHideDuration",
                label: "Hide Duration",
                desc: "The number of milliseconds to wait before dismissing after user interaction. If autoHideDuration prop isn't specified, it does nothing. If autoHideDuration prop is specified but resumeHideDuration isn't, we default to autoHideDuration / 2 ms.",
            },
        ],
    },
    {
        typeId: 124,
        npm: "npm install @material-ui/core",
        title: "Material design - Alert",
        tags: [
            "material designs",
            "alert",
            "error",
            "message",
            "success",
            "warning",
        ],
        originalJS: MaterialAlertJS,
        Component: MaterialAlert,
        properties: [{
                type: "select",
                id: "severity",
                label: "Severity",
                desc: "The anchor of the Snackbar.",
                list: [{
                        value: "error",
                        name: "Error"
                    },
                    {
                        value: "info",
                        name: "Info"
                    },
                    {
                        value: "success",
                        name: "Success"
                    },
                    {
                        value: "warning",
                        name: "Warning"
                    },
                ],
                value: "success",
            },
            {
                type: "select",
                id: "variant",
                label: "variant",
                desc: "The variant to use.",
                list: [{
                        value: "filled",
                        name: "Filled"
                    },
                    {
                        value: "outlined",
                        name: "Outlined"
                    },
                    {
                        value: "standard",
                        name: "Standard"
                    },
                ],
                value: "filled",
            },
            {
                type: "inputText",
                id: "closeText",
                label: "Close text",
                desc: "Override the default label for the close popup icon button.For localization purposes, you can use the provided translations.",
            },
            {
                type: "function",
                id: "onClose",
                label: "onClose",
                desc: "Callback fired when the component requests to be closed. When provided and no action prop is set, a close icon button is displayed that triggers the callback when clicked.Signature:function(event: object) => voidevent: The event source of the callback.",
            },
            {
                type: "inputText",
                id: "role",
                label: "Role",
                desc: "The ARIA role attribute of the element.",
            },
        ],
    },
    {
        typeId: 126,
        npm: "npm install @material-ui/core",
        title: "Material design - Backdrop",
        tags: ["material designs", "backdrop", "refresh"],
        originalJS: MaterialBackdropJS,
        Component: MaterialBackdrop,
        properties: [{
                type: "checkbox",
                id: "invisible",
                label: "Invisible",
                desc: "If true, the backdrop is invisible. It can be used when rendering a popover or a custom select component.",
                value: true,
            },
            {
                type: "checkbox",
                id: "open",
                label: "Open",
                desc: "If true, the backdrop is open.",
                value: false,
            },
        ],
    },
    {
        typeId: 127,
        npm: "npm install @material-ui/core",
        title: "Material design - badge",
        tags: ["material designs", "notifications", "number"],
        replacements: [{
                key: "props.vertical",
                props: "vertical"
            },
            {
                key: "props.horizontal",
                props: "horizontal"
            },
            {
                key: "classes={{badge:styles.badge}}"
            },
        ],
        originalJS: MaterialBadgetJS,
        Component: MaterialBadget,
        properties: [{
                type: "select",
                id: "vertical",
                label: "Vertical",
                desc: "The anchor of the badge.",
                list: [{
                        value: "top",
                        name: "Top"
                    },
                    {
                        value: "bottom",
                        name: "Bottom"
                    },
                ],
                value: "top",
            },
            {
                type: "select",
                id: "horizontal",
                label: "Horizontal",
                desc: "The anchor of the badge.",
                list: [{
                        value: "left",
                        name: "Left"
                    },
                    {
                        value: "right",
                        name: "Right"
                    },
                ],
                value: "right",
            },
            {
                type: "inputText",
                id: "badgeContent",
                label: "Badge content",
                desc: "The content rendered within the badge.",
                value: 4,
            },
            {
                type: "checkbox",
                id: "invisible",
                label: "Invisible",
                desc: "If true, the badge will be invisible.",
            },
            {
                type: "number",
                id: "max",
                label: "Max",
                desc: "Max count to show.",
            },
            {
                type: "select",
                id: "overlap",
                label: "Overlap",
                desc: "Wrapped shape the badge should overlap.",
                list: [{
                        value: "circle",
                        name: "Circle"
                    },
                    {
                        value: "rectangle",
                        name: "Rectangle"
                    },
                ],
                value: "circle",
            },
            {
                type: "checkbox",
                id: "showZero",
                label: "Show zero",
                desc: "Controls whether the badge is hidden when badgeContent is zero.",
            },
            {
                type: "select",
                id: "variant",
                label: "variant",
                desc: "The variant to use.",
                list: [{
                        value: "dot",
                        name: "Dot"
                    },
                    {
                        value: "standard",
                        name: "Standard"
                    },
                ],
                value: "standard",
            },
        ],
    },
    {
        typeId: 128,
        npm: "npm install @material-ui/core",
        title: "Material design - Chip",
        tags: ["material designs", "chip", "tag"],
        originalJS: MaterialChipJS,
        Component: MaterialChip,
        properties: [{
                type: "checkbox",
                id: "clickable",
                label: "clickable",
                desc: "If true, the chip will appear clickable, and will raise when pressed, even if the onClick prop is not defined. If false, the chip will not be clickable, even if onClick prop is defined. This can be used, for example, along with the component prop to indicate an anchor Chip is clickable.",
            },
            {
                type: "checkbox",
                id: "disabled",
                label: "disabled",
                desc: "If true, the chip should be displayed in a disabled state.",
            },
            {
                type: "function",
                id: "onDelete",
                label: "on delete",
                desc: "Callback function fired when the delete icon is clicked. If set, the delete icon will be shown.",
            },
            {
                type: "select",
                id: "size",
                label: "size",
                desc: "The size of the chip.",
                list: [{
                        value: "medium",
                        name: "Medium"
                    },
                    {
                        value: "small",
                        name: "Small"
                    },
                ],
                value: "medium",
            },
            {
                type: "select",
                id: "variant",
                label: "variant",
                desc: "The variant to use.",
                list: [{
                        value: "default",
                        name: "Default"
                    },
                    {
                        value: "outlined",
                        name: "Outlined"
                    },
                ],
                value: "default",
            },
        ],
    },
    {
        typeId: 129,
        npm: "npm install @material-ui/core",
        title: "Material design - list",
        tags: ["material designs", "list", "menu"],
        originalJS: MaterialListJS,
        Component: MaterialList,
        properties: [{
                type: "checkbox",
                id: "dense",
                label: "dense",
                desc: "If true, compact vertical padding designed for keyboard and mouse input will be used for the list and list items. The prop is available to descendant components as the dense context.",
            },
            {
                type: "checkbox",
                id: "disablePadding",
                label: "disable padding",
                desc: "If true, vertical padding will be removed from the list.",
            },
        ],
    },
    {
        typeId: 130,
        npm: "npm install @material-ui/core",
        title: "Material design - table",
        tags: ["material designs", "table", "grid"],
        originalJS: MaterialTableJS,
        Component: MaterialTable,
        properties: [{
                type: "select",
                id: "padding",
                label: "padding",
                desc: "Allows TableCells to inherit padding of the Table.",
                list: [{
                        value: "default",
                        name: "Default"
                    },
                    {
                        value: "checkbox",
                        name: "Checkbox"
                    },
                ],
                value: "default",
            },
            {
                type: "select",
                id: "size",
                label: "size",
                desc: "Allows TableCells to inherit size of the Table.",
                list: [{
                        value: "small",
                        name: "Small"
                    },
                    {
                        value: "medium",
                        name: "Medium"
                    },
                ],
                value: "medium",
            },
            {
                type: "checkbox",
                id: "stickyHeader",
                label: "stickyHeader",
                desc: "Set the header sticky.⚠️ It doesn't work with IE 11.",
            },
        ],
    },
    {
        typeId: 131,
        npm: "npm install @material-ui/core",
        title: "Material design - tooltip",
        tags: ["material designs", "tooltip", "tip"],
        replacements: [{
            key: 'classes={{popper:"codeMe_maxIndex"}}'
        }],
        originalJS: MaterialTooltipJS,
        Component: MaterialTooltip,
        properties: [{
                type: "select",
                id: "placement",
                label: "placement",
                desc: "Tooltip placement.",
                list: [{
                        value: "bottom-end",
                        name: "bottom-end"
                    },
                    {
                        value: "bottom-start",
                        name: "bottom-start"
                    },
                    {
                        value: "bottom",
                        name: "bottom"
                    },
                    {
                        value: "left-end",
                        name: "left-end"
                    },
                    {
                        value: "left-start",
                        name: "left-start"
                    },
                    {
                        value: "left",
                        name: "left"
                    },
                    {
                        value: "right-end",
                        name: "right-end"
                    },
                    {
                        value: "right-start",
                        name: "right-start"
                    },
                    {
                        value: "right",
                        name: "right"
                    },
                    {
                        value: "top-end",
                        name: "top-end"
                    },
                    {
                        value: "top-end",
                        name: "top-start"
                    },
                    {
                        value: "top",
                        name: "top"
                    },
                ],
                value: "bottom",
            },
            {
                type: "inputText",
                id: "title",
                label: "title",
                desc: "Tooltip title. Zero-length titles string are never displayed.",
                value: "Tooltip",
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        id: "open",
                        label: "open",
                        desc: "If true, the tooltip is shown.",
                        value: true,
                    },
                    {
                        type: "checkbox",
                        id: "arrow",
                        label: "arrow",
                        desc: "If true, adds an arrow to the tooltip.",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        id: "disableFocusListener",
                        label: "focus listener",
                        desc: "Do not respond to focus events.",
                    },
                    {
                        type: "checkbox",
                        id: "disableHoverListener",
                        label: "hover listener",
                        desc: "Do not respond to hover events.",
                    },
                ],
            },
            {
                type: "checkbox",
                id: "disableTouchListener",
                label: "Touch listener",
                desc: "Do not respond to long press touch events.",
            },
            {
                type: "section",
                items: [{
                        type: "number",
                        id: "enterDelay",
                        label: "enter delay",
                        desc: "The number of milliseconds to wait before showing the tooltip. This prop won't impact the enter touch delay (enterTouchDelay).",
                    },
                    {
                        type: "number",
                        id: "enterNextDelay",
                        label: "Next delay",
                        desc: "The number of milliseconds to wait before showing the tooltip when one was already recently opened.",
                    },
                ],
            },
            {
                type: "number",
                id: "enterTouchDelay",
                label: "enter touch",
                desc: "The number of milliseconds a user must touch the element before showing the tooltip.",
            },
            {
                type: "inputText",
                id: "id",
                label: "id",
                desc: "This prop is used to help implement the accessibility logic. If you don't provide this prop. It falls back to a randomly generated id.",
            },
            {
                type: "checkbox",
                id: "interactive",
                label: "interactive",
                desc: "Makes a tooltip interactive, i.e. will not close when the user hovers over the tooltip before the leaveDelay is expired.",
            },
            {
                type: "section",
                items: [{
                        type: "number",
                        id: "leave delay",
                        label: "leave delay",
                        desc: "The number of milliseconds to wait before hiding the tooltip. This prop won't impact the leave touch delay (leaveTouchDelay).",
                    },
                    {
                        type: "number",
                        id: "leave touch delay",
                        label: "leave touch",
                        desc: "The number of milliseconds after the user stops touching an element before hiding the tooltip.",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "function",
                        id: "onClose",
                        label: "on Close",
                        desc: "Callback fired when the component requests to be closed.Signature:function(event: object) => voidevent: The event source of the callback.",
                    },
                    {
                        type: "function",
                        id: "onOpen",
                        label: "on Open",
                        desc: "Callback fired when the component requests to be open.Signature:function(event: object) => voidevent: The event source of the callback.",
                    },
                ],
            },
            {
                type: "",
                id: "PopperComponent",
                label: "PopperComponent",
                desc: "The component used for the popper.",
            },
            {
                type: "",
                id: "PopperProps",
                label: "PopperProps",
                desc: "Props applied to the Popper element.",
            },
            {
                type: "",
                id: "TransitionComponent",
                label: "TransitionComponent",
                desc: "The component used for the transition. Follow this guide to learn more about the requirements for this component.",
            },
            {
                type: "",
                id: "TransitionProps",
                label: "TransitionProps",
                desc: "Props applied to the Transition element.",
            },
        ],
    },
    {
        typeId: 132,
        npm: "npm install @material-ui/core",
        title: "Material design - Typography",
        tags: ["material designs", "Typography", "text"],
        width: 200,
        originalJS: MaterialTypographyJS,
        Component: MaterialTypography,
        properties: [{
                type: "select",
                id: "align",
                label: "align",
                desc: "Set the text-align on the component.",
                list: [{
                        value: "inherit",
                        name: "inherit"
                    },
                    {
                        value: "left",
                        name: "left"
                    },
                    {
                        value: "center",
                        name: "center"
                    },
                    {
                        value: "right",
                        name: "right"
                    },
                    {
                        value: "justify",
                        name: "justify"
                    },
                ],
                value: "inherit",
            },
            {
                type: "select",
                id: "display",
                label: "display",
                desc: "Controls the display type",
                list: [{
                        value: "initial",
                        name: "initial"
                    },
                    {
                        value: "block",
                        name: "block"
                    },
                    {
                        value: "inline",
                        name: "inline"
                    },
                ],
                value: "initial",
            },
            {
                type: "select",
                id: "variant",
                label: "variant",
                desc: "Applies the theme typography styles.",
                list: [{
                        value: "h1"
                    },
                    {
                        value: "h2"
                    },
                    {
                        value: "h3"
                    },
                    {
                        value: "h4"
                    },
                    {
                        value: "h5"
                    },
                    {
                        value: "h6"
                    },
                    {
                        value: "subtitle1"
                    },
                    {
                        value: "subtitle2"
                    },
                    {
                        value: "body1"
                    },
                    {
                        value: "body2"
                    },
                    {
                        value: "caption"
                    },
                    {
                        value: "button"
                    },
                    {
                        value: "overline"
                    },
                    {
                        value: "srOnly"
                    },
                    {
                        value: "inherit"
                    },
                ],
                value: "body1",
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        id: "gutterBottom",
                        label: "gutter bottom",
                        desc: "If true, the text will have a bottom margin.",
                    },
                    {
                        type: "checkbox",
                        id: "noWrap",
                        label: "no wrap",
                        desc: "If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.Note that text overflow can only happen with block or inline-block level elements (the element needs to have a width in order to overflow).",
                    },
                ],
            },
            {
                type: "checkbox",
                id: "paragraph",
                label: "paragraph",
                desc: "If true, the text will have a bottom margin.",
            },
        ],
    },
];
export default allMaterialComponents;

/* 
    function convertType(type){
        if(type==='number'){
            type = type
        }
        else if(type==='string'){
            type = 'inputText'
        }
        else if(type==='bool'){
            type = 'checkbox'
        }
        else if(type==='func'){
            type = 'function'
        }
        else{
            type = ''
        }

        return type
    }

    if(array===undefined){
        var array = []
    }
    let tr = $('table').find('tbody').eq(0).find('tr')
    for(let i = 0 ; i< tr.length ; i++){
        let row = tr.eq(i)
        let id = $(row.find('td')[0]).text()
        let label = id
        let type = convertType($(row.find('td')[1]).text())
        let desc = $(row.find('td')[3]).text()

        let json = {
            type,id,label,desc
        }
        array.push(json)
    }

    console.log(array)
    copy(array)
*/