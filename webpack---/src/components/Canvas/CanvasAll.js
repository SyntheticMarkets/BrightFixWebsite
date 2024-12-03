import ReactTags from "./ReactTags/ReactTags";
import {
    Tooltip
} from "./Tooltip/Tooltip";
// import EditJson from "./EditJson/EditJson";
import MaterialComponents from "./MaterialComponents/MaterialComponents";
// import SemanticComponents from "./SemanticComponents/SemanticComponents";
// import OtherColumn from "./OtherComponent/OtherColumn";
// import ColumnLine from "./OtherComponent/OtherColumnLine";
// import ReactResizable from "./OtherComponent/ReactResizable";
import FinalForumSimple from "./OtherComponent/OtherFinalForum/OtherFinalForumSimple";
import FinalForumRecord from "./OtherComponent/OtherFinalForum/OtherFinalForumRecord";
import FinalForumField from "./OtherComponent/OtherFinalForum/OtherFinalForumField";
import FinalForumSubmission from "./OtherComponent/OtherFinalForum/OtherFinalForumSubmission";
// import OtherReactTable from "./OtherComponent/OtherReactTable";
// import ReactJson from "./OtherComponent/OtherReactJson";
// import OtherAutosuggest from "./OtherComponent/OtherAutosuggest";
import CopyToClipboard from "./OtherComponent/OtherCopyToClipBoard";
import DebounceInput from "./OtherComponent/OtherDebounceInput";
import Collapse from "./OtherComponent/OtherCollapse";
import ReactHeight from "./OtherComponent/OtherReactHeight";
// import OtherHotkeysHook from "./OtherComponent/OtherHotkeysHook";
// import HorizontalScrolling from "./OtherComponent/OtherHorizontalScrolling/OtherHorizontalScrolling";
import NumberFormat from "./OtherComponent/OtherNumberFormat";
import NumberFormatAll from "./OtherComponent/OtherNumberFormatAll";

/* eslint import/no-webpack-loader-syntax: off */
import ReactTagsJs from "!raw-loader!./ReactTags/ReactTags";
import ReactTagsCss from "!raw-loader!./ReactTags/ReactTags.module.scss";
// import OtherColumnJS from "!raw-loader!./OtherComponent/OtherColumn";
// import ColumnLineJS from "!raw-loader!./OtherComponent/OtherColumnLine";
// import ReactResizableJS from "!raw-loader!./OtherComponent/ReactResizable";
// import ReactResizableCSS from "!raw-loader!./OtherComponent/ReactResizable.module.scss";
import FinalForumSimpleJS from "!raw-loader!./OtherComponent/OtherFinalForum/OtherFinalForumSimple";
import FinalForumSimpleCSS from "!raw-loader!./OtherComponent/OtherFinalForum/OtherFinalForumSimple.module.scss";
import FinalForumRecordJS from "!raw-loader!./OtherComponent/OtherFinalForum/OtherFinalForumRecord";
import FinalForumRecordCSS from "!raw-loader!./OtherComponent/OtherFinalForum/OtherFinalForumRecord.module.scss";
import FinalForumFieldJS from "!raw-loader!./OtherComponent/OtherFinalForum/OtherFinalForumField";
import FinalForumFieldCSS from "!raw-loader!./OtherComponent/OtherFinalForum/OtherFinalForumField.module.scss";
import FinalForumSubmissionJS from "!raw-loader!./OtherComponent/OtherFinalForum/OtherFinalForumSubmission";
// import ReactJsonJS from "!raw-loader!./OtherComponent/OtherReactJson";
import CopyToClipboardJS from "!raw-loader!./OtherComponent/OtherCopyToClipBoard";
import CopyToClipboardCSS from "!raw-loader!./OtherComponent/OtherCopyToClipBoard.module.scss";
import DebounceInputJS from "!raw-loader!./OtherComponent/OtherDebounceInput";
import DebounceInputCSS from "!raw-loader!./OtherComponent/OtherDebounceInput.module.scss";
import CollapseJS from "!raw-loader!./OtherComponent/OtherCollapse";
import ReactHeightJS from "!raw-loader!./OtherComponent/OtherReactHeight";
import ReactHeightCSS from "!raw-loader!./OtherComponent/OtherReactHeight.module.scss";
import NumberFormatJS from "!raw-loader!./OtherComponent/OtherNumberFormat";
// import OtherAutosuggestJS from "!raw-loader!./OtherComponent/OtherAutosuggest";
// import OtherHotkeysHookJS from "!raw-loader!./OtherComponent/OtherHotkeysHook";
// import HorizontalScrollingJS from "!raw-loader!./OtherComponent/OtherHorizontalScrolling/OtherHorizontalScrolling";
// import OtherHorizontalScrollingArrowJS from "!raw-loader!./OtherComponent/OtherHorizontalScrolling/OtherHorizontalScrollingArrow";
// import OtherHorizontalScrollingArrowRightJS from "!raw-loader!./OtherComponent/OtherHorizontalScrolling/OtherHorizontalScrollingArrowRight";
// import OtherHorizontalScrollingArrowLeftJS from "!raw-loader!./OtherComponent/OtherHorizontalScrolling/OtherHorizontalScrollingArrowLeft";
// import HorizontalScrollingCSS from "!raw-loader!./OtherComponent/OtherHorizontalScrolling/OtherHorizontalScrolling.module.scss";
import NumberFormatAllJS from "!raw-loader!./OtherComponent/OtherNumberFormatAll";
import {
    api
} from "../utils";
import {
    CanvasStoreClass
} from "../../stores/CanvasStore";
import {
    deletePropertyForLocalComponent,
    savePropertiesForLocalComponents,
} from "./JinnoConnector";


let allComponents = [
    // {
    //   typeId: 3,
    //   title: "React chart - Column",
    //   npm: "npm install react-charts",
    //   originalJS: OtherColumnJS,
    //   Component: OtherColumn,
    //   replacements: [
    //     { key: `props.width ? props.width : '230'`, value: 240 },
    //     { key: `props.height ? props.height : '230'`, value: 240 },
    //   ],
    //   tags: ["Chart", "column", "react chart"],
    //   reduceChildrenScale: true,
    //   width: 240,
    //   height: 240,
    //   demoWidth: "230px",
    //   demoHeight: "120px",
    // },
    // {
    //   typeId: 4,
    //   title: "React chart - Line",
    //   npm: "npm install react-charts",
    //   replacements: [
    //     { key: `props.width ? props.width : '230'`, value: 240 },
    //     { key: `props.height ? props.height : '230'`, value: 240 },
    //   ],
    //   originalJS: ColumnLineJS,
    //   Component: ColumnLine,
    //   tags: ["Chart", "line", "react chart"],
    //   reduceChildrenScale: true,
    //   width: 240,
    //   height: 240,
    //   demoWidth: "180px",
    //   demoHeight: "120px",
    // },
    {
        typeId: 6,
        height: "100%",
        functionsInOtherSection: true,
        npm: [
            "npm i react-tag-input",
            "npm install react-dnd@14.0.2",
            "npm install react-dnd-html5-backend@14.0.0",
            "npm install react-dom@17.0.2",
        ],
        Component: ReactTags,
        replacements: [{
                key: "props.tags ? props.tags : []",
                props: "tags"
            },
            {
                key: "if (props.updateStyleHover) props.updateStyleHover();"
            },
            {
                key: "aakansha-react-tag-input",
                value: "react-tag-input"
            },
        ],
        title: "Input tags",
        tags: ["input-tags-react", "input-tags-react", "tag", "input"],
        originalJS: ReactTagsJs,
        originalCSS: ReactTagsCss,
        props: {},
        properties: [{
                type: "section",
                replacements: [],
                items: [{
                        type: "Json",
                        desc: "An array of tags that are displayed as pre-selected",
                        capitalize: false,
                        label: "tags",
                        items: [{
                                capitalize: false,
                                type: "inputText",
                                label: "id",
                                value: "",
                                id: "id",
                            },
                            {
                                type: "inputText",
                                capitalize: false,
                                label: "text",
                                value: "",
                                id: "text",
                            },
                        ],
                        value: [{
                                id: "Thailand",
                                text: "Thailand"
                            },
                            {
                                id: "India",
                                text: "India"
                            },
                            {
                                id: "Vietnam",
                                text: "Vietnam"
                            },
                            {
                                id: "Turkey",
                                text: "Turkey"
                            },
                        ],
                        id: "tags",
                    },
                    {
                        type: "Json",
                        desc: "An array of suggestions that are used as basis for showing suggestions",
                        label: "suggestions",
                        capitalize: false,
                        id: "suggestions",
                        items: [{
                                capitalize: false,
                                type: "inputText",
                                label: "id",
                                value: "",
                                id: "id",
                            },
                            {
                                type: "inputText",
                                label: "text",
                                capitalize: false,
                                value: "",
                                id: "text",
                            },
                        ],
                        value: [{
                                id: "1",
                                text: "Albania"
                            },
                            {
                                id: "2",
                                text: "Australia"
                            },
                            {
                                id: "3",
                                text: "France"
                            },
                            {
                                id: "4",
                                text: "India"
                            },
                            {
                                id: "5",
                                text: "Oman"
                            },
                            {
                                id: "6",
                                text: "Russia"
                            },
                            {
                                id: "7",
                                text: "Serbia"
                            },
                            {
                                id: "8",
                                text: "Swaziland"
                            },
                            {
                                id: "9",
                                text: "United States of America"
                            },
                            {
                                id: "10",
                                text: "Vietnam"
                            },
                        ],
                    },
                ],
            },
            {
                type: "inputText",
                desc: "The placeholder shown for the input",
                label: "placeholder",
                capitalize: false,
                value: "Search...",
                big: true,
                id: "placeholder",
            },
            {
                type: "inputText",
                desc: "The name attribute added to the input",
                capitalize: false,
                big: true,
                label: "name",
                value: "",
                id: "name",
            },
            {
                type: "section",
                items: [{
                        type: "inputText",
                        desc: "Provide an alternative label property for the tags",
                        capitalize: false,
                        label: "labelField",
                        value: "",
                        id: "labelField",
                    },
                    {
                        type: "inputText",
                        capitalize: false,
                        desc: "The id attribute added to the input",
                        label: "id",
                        value: "",
                        id: "id",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "number",
                        desc: "How many characters are needed for suggestions to appear",
                        capitalize: false,
                        label: "minQueryLength",
                        value: 2,
                        id: "minQueryLength",
                    },
                    {
                        type: "number",
                        desc: "The maxLength attribute added to the input",
                        capitalize: false,
                        label: "maxLength",
                        value: 5,
                        id: "maxLength",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        desc: "Boolean value to control whether the text-input should be autofocused on mount",
                        label: "autofocus",
                        capitalize: false,
                        value: false,
                        id: "autofocus",
                    },
                    {
                        type: "checkbox",
                        desc: "Boolean value to control whether tags should be deleted when the 'Delete' key is pressed in an empty Input Box",
                        label: "allowDeleteFromEmptyInput",
                        capitalize: false,
                        value: true,
                        id: "allowDeleteFromEmptyInput",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        desc: "Ensure the first matching suggestion is automatically converted to a tag when a delimiter key is pressed",
                        label: "autocomplete",
                        capitalize: false,
                        value: true,
                        id: "autocomplete",
                    },
                    {
                        type: "checkbox",
                        desc: "Read-only mode without the input box and removeComponent and drag-n-drop features disabled",
                        label: "readOnly",
                        capitalize: false,
                        value: false,
                        id: "readOnly",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        desc: "Boolean value to control whether tags should be unqiue",
                        label: "allowUnique",
                        capitalize: false,
                        value: true,
                        id: "allowUnique",
                    },
                    {
                        type: "checkbox",
                        desc: "Boolean value to control whether tags should have drag-n-drop features enabled",
                        label: "allowDragDrop",
                        capitalize: false,
                        value: true,
                        id: "allowDragDrop",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        desc: "Render input field and selected tags in-line",
                        label: "inline",
                        capitalize: false,
                        value: true,
                        id: "inline",
                    },
                    {
                        type: "checkbox",
                        desc: "This prop implies whether to allow paste action for adding tags.",
                        label: "allowAdditionFromPaste",
                        capitalize: false,
                        value: true,
                        id: "allowAdditionFromPaste",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        desc: "Implies whether the tags should be editable.",
                        label: "editable",
                        capitalize: false,
                        id: "editable",
                        value: true,
                    },
                    {
                        type: "checkbox",
                        desc: "Implies whether 'clear all' button should be shown.",
                        label: "clearAll",
                        capitalize: false,
                        id: "clearAll",
                        value: true,
                    },
                ],
            },
            {
                type: "function",
                label: "handleAddition",
                id: "handleAddition",
                capitalize: false,
                desc: "Function called when the user wants to add a tag (required)",
                params: [{
                    type: "json",
                    name: "tag"
                }],
            },
            {
                type: "function",
                label: "handleDelete",
                id: "handleDelete",
                // value:'handleDelete',
                capitalize: false,
                desc: "Function called when the user wants to delete a tag (required)",
                params: [{
                    type: "number",
                    name: "tagIndex"
                }],
            },
            {
                type: "function",
                label: "handleDrag",
                id: "handleDrag",
                capitalize: false,
                desc: "Function called when the user drags a tag",
                params: [{
                        type: "json",
                        name: "tag"
                    },
                    {
                        type: "number",
                        name: "currPos"
                    },
                    {
                        type: "number",
                        name: "newPos"
                    },
                ],
            },
            {
                type: "function",
                label: "handleFilterSuggestions",
                id: "handleFilterSuggestions",
                capitalize: false,
                desc: "Function called when filtering suggestions",
                params: [{
                        type: "string",
                        name: "textValue"
                    },
                    {
                        type: "array",
                        name: "suggestions"
                    },
                ],
            },
            {
                type: "function",
                label: "handleTagClick",
                id: "handleTagClick",
                capitalize: false,
                desc: "Function called when the user wants to know which tag was clicked",
                params: [{
                    type: "number",
                    name: "tagIndex"
                }],
            },
            {
                type: "function",
                label: "handleInputChange",
                id: "handleInputChange",
                capitalize: false,
                desc: "Event handler for input onChange",
            },
            {
                type: "function",
                label: "handleInputFocus",
                id: "handleInputFocus",
                capitalize: false,
                desc: "Event handler for input onFocus",
            },
            {
                type: "function",
                label: "handleInputBlur",
                id: "handleInputBlur",
                capitalize: false,
                desc: "Event handler for input onBlur",
            },
            {
                type: "function",
                label: "removeComponent",
                id: "removeComponent",
                desc: "Function to render custom remove component for the tags.",
                capitalize: false,
                params: [{
                    type: "component",
                    name: "component"
                }],
            },
            {
                type: "function",
                label: "renderSuggestion",
                id: "renderSuggestion",
                capitalize: false,
                desc: "Render prop for rendering your own suggestions",
            },
        ],
    },
    {
        typeId: 7,
        title: "tooltip",
        hideFromOtherUsers: true,
        Component: Tooltip,
        props: {
            title: "SetAutoFocus",
            text: "Function to render custom remove component for the tags.",
            top: 0,
            visible: true,
        },
        properties: [{
                type: "inputText",
                label: "Title:",
                value: "SetAutoFocus",
                id: "title",
            },
            {
                type: "inputText",
                label: "Text:",
                value: "Function to render custom remove component for the tags.",
                id: "text",
            },
            {
                type: "number",
                label: "Top:",
                value: 0,
                id: "top",
            },
            {
                type: "checkbox",
                label: "Visible:",
                value: true,
                id: "visible",
            },
        ],
    },
    // {
    //   typeId: 8,
    //   hideFromOtherUsers: true,
    //   Component: EditJson,
    // },
    // {
    //   typeId: 9,
    //   title: "resizable",
    //   npm: "npm i react-resizable",
    //   demoWidth: 100,
    //   demoHeight: 100,
    //   originalJS: ReactResizableJS,
    //   originalCSS: ReactResizableCSS,
    //   Component: ReactResizable,
    //   replacements: [
    //     { key: `props.width`, props: "width" },
    //     { key: `props.height`, props: "height" },
    //     { key: `props.handleWidth`, props: "handleWidth" },
    //     { key: `props.handleHeight`, props: "handleHeight" },
    //     { key: `props.minConstraintX`, props: "minConstraintX" },
    //     { key: `props.minConstraintY`, props: "minConstraintY" },
    //     { key: `props.maxConstraintX`, props: "maxConstraintX" },
    //     { key: `props.maxConstraintY`, props: "maxConstraintY" },
    //   ],
    //   functionsInOtherSection: true,
    //   properties: [
    //     {
    //       type: "select",
    //       label: "Axis",
    //       value: "both",
    //       desc: "Resize only one size or both of them",
    //       id: "axis",
    //       list: [
    //         { value: "both", name: "both" },
    //         { value: "x", name: "x" },
    //         { value: "y", name: "y" },
    //         { value: "both", name: "none" },
    //       ],
    //     },
    //     {
    //       type: "section",
    //       items: [
    //         {
    //           type: "number",
    //           desc: "The width of the component",
    //           label: "Width",
    //           value: 200,
    //           id: "width",
    //         },
    //         {
    //           type: "number",
    //           desc: "The height of the component",
    //           label: "height",
    //           value: 200,
    //           id: "height",
    //         },
    //       ],
    //     },
    //     {
    //       type: "section",
    //       items: [
    //         {
    //           type: "number",
    //           desc: "Resize icon width",
    //           label: "handle W",
    //           value: 200,
    //           id: "handleWidth",
    //         },
    //         {
    //           type: "number",
    //           desc: "Resize icon height",
    //           label: "handle H",
    //           value: 200,
    //           id: "handleHeight",
    //         },
    //       ],
    //     },
    //     {
    //       type: "section",
    //       items: [
    //         {
    //           type: "number",
    //           desc: "Minimum width",
    //           label: "min width",
    //           value: 10,
    //           id: "minConstraintX",
    //         },
    //         {
    //           type: "number",
    //           desc: "Minimum height",
    //           label: "min height",
    //           value: 10,
    //           id: "minConstraintY",
    //         },
    //       ],
    //     },
    //     {
    //       type: "section",
    //       items: [
    //         {
    //           type: "number",
    //           desc: "Maximum height",
    //           label: "max height",
    //           value: 2000,
    //           id: "maxConstraintX",
    //         },
    //         {
    //           type: "number",
    //           desc: "Maximum width",
    //           label: "max width",
    //           value: 2000,
    //           id: "maxConstraintY",
    //         },
    //       ],
    //     },
    //     {
    //       type: "checkbox",
    //       label: "lock ratio",
    //       desc: "The width and height ratio will not changed",
    //       value: false,
    //       id: "lockAspectRatio",
    //     },
    //     {
    //       type: "function",
    //       label: "resize handle",
    //       id: "handle",
    //       desc:
    //         "If you override the resize handle, we expect that any ref passed to your new handle with represent the underlying DOM element.This is required, as react-resizable must be able to access the underlying DOM node to attach handlers and measure position deltas.",
    //       params: [{ type: "array", name: "array" }],
    //     },
    //     {
    //       type: "function",
    //       label: "resize handle",
    //       id: "handle",
    //       desc: "",
    //       params: [{ type: "array", name: "array" }],
    //     },
    //     {
    //       type: "function",
    //       label: "On stop",
    //       id: "onResizeStop",
    //       desc: "Event fired when resize stop",
    //       params: [{ type: "array", name: "array" }],
    //     },
    //     {
    //       type: "function",
    //       label: "On start",
    //       id: "onResizeStart",
    //       desc: "event fired when resize stop",
    //       params: [{ type: "array", name: "array" }],
    //     },
    //     {
    //       type: "function",
    //       label: "on resize",
    //       id: "onResize",
    //       desc: "Event fired on resize",
    //       params: [
    //         { type: "event", name: "e" },
    //         { type: "event", name: "array" },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   typeId: 11,
    //   title: "autosuggest input",
    //   tags: ["autosuggest", "search", "input"],
    //   npm: "npm i react-autosuggest",
    //   functionsInOtherSection: true,
    //   originalJS: OtherAutosuggestJS,
    //   Component: OtherAutosuggest,
    //   replacements: [
    //     { key: `props.suggestions`, props: "suggestions" },
    //     // { key: `props.offsetY`, props: "offsetY" },
    //   ],
    //   properties: [
    //     {
    //       type: "Json",
    //       desc:
    //         "These are the suggestions that will be displayed. Items can take an arbitrary shape.",
    //       label: "suggestions",
    //       id: "suggestions",
    //       items: [
    //         {
    //           type: "inputText",
    //           label: "name",
    //           value: "",
    //           id: "name",
    //         },
    //         {
    //           type: "inputText",
    //           label: "otherData",
    //           value: "",
    //           id: "otherData",
    //         },
    //       ],
    //       value: [
    //         {
    //           name: "C",
    //           otherData: 1972,
    //         },
    //         {
    //           name: "Elme",
    //           otherData: 2012,
    //         },
    //       ],
    //     },
    //     {
    //       type: "inputText",
    //       id: "id",
    //       label: "id",
    //       desc:
    //         "Use it only if you have multiple Autosuggest components on a page.",
    //       value: "",
    //     },
    //     {
    //       type: "function",
    //       label: "on fetch",
    //       id: "onSuggestionsFetchRequested",
    //       desc: "Will be called every time you need to recalculate suggestions.",
    //     },
    //     {
    //       type: "function",
    //       label: "on clear",
    //       id: "onSuggestionsClearRequested",
    //       desc: "Will be called every time you need to set suggestions to [].",
    //     },
    //     {
    //       type: "function",
    //       label: "get value",
    //       id: "getSuggestionValue",
    //       desc:
    //         "Implement it to teach Autosuggest what should be the input value when suggestion is clicked.",
    //       params: [{ type: "", name: "" }],
    //     },
    //     {
    //       type: "function",
    //       label: "render",
    //       id: "renderSuggestion",
    //       desc: "Use your imagination to define how suggestions are rendered.",
    //     },
    //     {
    //       type: "function",
    //       label: "on selected",
    //       id: "onSuggestionSelected",
    //       desc:
    //         "Will be called every time suggestion is selected via mouse or keyboard.",
    //     },
    //     {
    //       type: "function",
    //       label: "render title",
    //       id: "renderSectionTitle",
    //       desc: "Use your imagination to define how section titles are rendered.",
    //     },
    //     {
    //       type: "function",
    //       label: "get suggestions",
    //       id: "getSectionSuggestions",
    //       desc:
    //         "Implement it to teach Autosuggest where to find the suggestions for every section.",
    //     },
    //     {
    //       type: "function",
    //       label: "render input",
    //       id: "renderInputComponent",
    //       desc:
    //         "Use it only if you need to customize the rendering of the input.",
    //     },
    //     {
    //       type: "function",
    //       label: "render container",
    //       id: "renderSuggestionsContainer",
    //       desc:
    //         "Use it if you want to customize things inside the suggestions container beyond rendering the suggestions themselves.",
    //     },
    //     {
    //       type: "function",
    //       label: "on highlight",
    //       id: "onSuggestionHighlighted",
    //       desc: "Will be called every time the highlighted suggestion changes.",
    //     },
    //     {
    //       type: "function",
    //       label: "on render",
    //       id: "shouldRenderSuggestions",
    //       desc:
    //         "When the input is focused, Autosuggest will consult this function when to render suggestions. Use it, for example, if you want to display suggestions when input value is at least 2 characters long.",
    //     },
    //     {
    //       type: "section",
    //       items: [
    //         {
    //           type: "checkbox",
    //           label: "always render",
    //           id: "alwaysRenderSuggestions",
    //           desc:
    //             "Set it to true if you'd like to render suggestions even when the input is not focused.",
    //         },
    //         {
    //           type: "checkbox",
    //           label: "highlight first",
    //           id: "highlightFirstSuggestion",
    //           desc:
    //             "Set it to true if you'd like Autosuggest to automatically highlight the first suggestion.",
    //         },
    //       ],
    //     },
    //     {
    //       type: "section",
    //       items: [
    //         {
    //           type: "checkbox",
    //           label: "focus onClick",
    //           id: "focusInputOnSuggestionClick",
    //           desc:
    //             "Set it to false if you don't want Autosuggest to keep the input focused when suggestions are clicked/tapped.",
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
        typeId: 12,
        title: "Final forum - manage forum data simple example",
        tags: ["form", "data"],
        hideFromMainScreen: true,
        isPropsJson: true,
        height: "100%",
        npm: "npm install --save final-form react-final-form",
        originalJS: FinalForumSimpleJS,
        originalCSS: FinalForumSimpleCSS,
        Component: FinalForumSimple,
        replacements: [{
                key: `delete formData.height;`
            },
            {
                key: `if (!props.ketchup && !props.mustard && !props.mayonnaise && !props.guacamole) delete formData.sauces;`,
            },
            {
                key: `if (!props.toppings) delete formData.toppings;`
            },
            {
                key: `props.toppings`,
                props: "toppings"
            },
            {
                key: `props.toppings`
            },
            {
                key: `props.ketchup ? "ketchup" : null,`
            },
            {
                key: `props.ketchup ? "ketchup" : null,`,
                props: "ketchup",
                ifTrue: `"ketchup",`,
                ifFalse: false,
            },
            {
                key: `props.mustard ? "mustard" : null,`
            },
            {
                key: `props.mustard ? "mustard" : null,`,
                props: "mustard",
                ifTrue: `"mustard",`,
                ifFalse: false,
            },
            {
                key: `props.mayonnaise ? "mayonnaise" : null,`
            },
            {
                key: `props.mayonnaise ? "mayonnaise" : null,`,
                props: "mayonnaise",
                ifTrue: `"mayonnaise",`,
                ifFalse: false,
            },
            {
                key: `props.guacamole ? "guacamole" : null,`
            },
            {
                key: `props.guacamole ? "guacamole" : null,`,
                props: "guacamole",
                ifTrue: `"guacamole",`,
                ifFalse: false,
            },
        ],
        properties: [{
                type: "inputText",
                value: "",
                id: "firstName",
                label: "First name",
            },
            {
                type: "inputText",
                value: "",
                id: "lastName",
                label: "Last name",
            },
            {
                type: "select",
                label: "toppings",
                value: "",
                id: "toppings",
                list: [{
                        value: "chicken",
                        name: "chicken"
                    },
                    {
                        value: "ham",
                        name: "ham"
                    },
                    {
                        value: "mushrooms",
                        name: "mushrooms"
                    },
                    {
                        value: "cheese",
                        name: "cheese"
                    },
                    {
                        value: "tuna",
                        name: "tuna"
                    },
                    {
                        value: "pineapple",
                        name: "pineapple"
                    },
                ],
            },
            {
                type: "select",
                label: "Color",
                value: "",
                id: "favoriteColor",
                list: [{
                        value: "#ff0000",
                        name: "❤️ Red"
                    },
                    {
                        value: "#00ff00",
                        name: "💚 Green"
                    },
                    {
                        value: "#0000ff",
                        name: "💙 Blue"
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        value: "",
                        id: "ketchup",
                        label: "ketchup",
                    },
                    {
                        type: "checkbox",
                        value: "",
                        id: "mustard",
                        label: "Mustard",
                    },
                ],
            },
            {
                type: "checkbox",
                id: "employed",
                label: "employed",
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        value: "",
                        id: "mayonnaise",
                        label: "Mayonnaise",
                    },
                    {
                        type: "checkbox",
                        value: "",
                        id: "guacamole",
                        label: "Guacamole",
                    },
                ],
            },
            {
                type: "select",
                label: "stooge",
                value: "larry",
                id: "stooge",
                list: [{
                        value: "larry",
                        name: "larry"
                    },
                    {
                        value: "moe",
                        name: "moe"
                    },
                    {
                        value: "curly",
                        name: "curly"
                    },
                ],
            },
            {
                type: "inputText",
                value: "",
                id: "notes",
                label: "notes",
            },
            {
                type: "function",
                id: "onSubmit",
                label: "onSubmit",
                capitalize: false,
                desc: "onSubmit is a function that will be called with the values of your form when the user submits the form and all validation passes. Your onSubmit function will not be called if there are validation errors.",
                params: [{
                    type: "json",
                    name: "values"
                }],
            },
        ],
    },
    {
        typeId: 13,
        title: "Final forum - manage form validation",
        tags: ["form", "data"],
        hideFromMainScreen: true,
        isPropsJson: true,
        height: "100%",
        npm: "npm install --save final-form react-final-form",
        originalJS: FinalForumRecordJS,
        originalCSS: FinalForumRecordCSS,
        Component: FinalForumRecord,
        replacements: [{
            key: `delete formData.height;`
        }],
        properties: [{
                type: "section",
                items: [{
                        type: "inputText",
                        value: "",
                        id: "username",
                        label: "Username",
                    },
                    {
                        type: "inputText",
                        value: "",
                        id: "password",
                        label: "password",
                    },
                ],
            },
            {
                type: "inputText",
                value: "",
                id: "confirm",
                label: "confirm",
            },
            {
                type: "function",
                id: "onSubmit",
                label: "onSubmit",
                capitalize: false,
                desc: "onSubmit is a function that will be called with the values of your form when the user submits the form and all validation passes. Your onSubmit function will not be called if there are validation errors.",
                params: [{
                    type: "json",
                    name: "values"
                }],
            },
        ],
    },
    {
        typeId: 14,
        title: "Final forum - manage form data with field validation",
        tags: ["form", "data", "validation"],
        isPropsJson: true,
        hideFromMainScreen: true,
        height: "100%",
        npm: "npm install --save final-form react-final-form",
        originalJS: FinalForumFieldJS,
        originalCSS: FinalForumFieldCSS,
        Component: FinalForumField,
        replacements: [{
            key: `delete formData.height;`
        }],
        properties: [{
                type: "section",
                items: [{
                        type: "inputText",
                        value: "",
                        id: "firstName",
                        label: "first name",
                    },
                    {
                        type: "inputText",
                        value: "",
                        id: "lastName",
                        label: "last name",
                    },
                ],
            },
            {
                type: "inputText",
                value: "",
                id: "age",
                label: "age",
            },
            {
                type: "function",
                id: "onSubmit",
                label: "onSubmit",
                capitalize: false,
                desc: "onSubmit is a function that will be called with the values of your form when the user submits the form and all validation passes. Your onSubmit function will not be called if there are validation errors.",
                params: [{
                    type: "json",
                    name: "values"
                }],
            },
        ],
    },
    {
        typeId: 15,
        title: "Final forum - manage form data field validation",
        tags: ["form", "data", "validation"],
        hideFromMainScreen: true,
        isPropsJson: true,
        height: "100%",
        npm: "npm install --save final-form react-final-form",
        originalJS: FinalForumSubmissionJS,
        originalCSS: FinalForumFieldCSS,
        Component: FinalForumSubmission,
        replacements: [{
            key: `delete formData.height;`
        }],
        properties: [{
                type: "section",
                items: [{
                        type: "inputText",
                        value: "",
                        id: "username",
                        label: "first name",
                    },
                    {
                        type: "inputText",
                        value: "",
                        id: "password",
                        label: "last name",
                    },
                ],
            },
            {
                type: "function",
                id: "onSubmit",
                label: "onSubmit",
                capitalize: false,
                desc: "onSubmit is a function that will be called with the values of your form when the user submits the form and all validation passes. Your onSubmit function will not be called if there are validation errors.",
                params: [{
                    type: "json",
                    name: "values"
                }],
            },
        ],
    },
    // {
    //   typeId: 17,
    //   Component: ReactJson,
    //   originalJS: ReactJsonJS,
    //   title: "React json",
    //   functionsInOtherSection: true,
    //   hideFromMainScreen: true,
    //   tags: ["react", "json"],
    //   npm: "npm install react-json-view",
    //   properties: [
    //     {
    //       type: "inputText",
    //       label: "name",
    //       value: "Root",
    //       desc:
    //         "Contains the name of your root node. Use null or false for no name.",
    //       id: "name",
    //     },
    //     // {
    //     //   type: "inputText",
    //     //   label: "name",
    //     //   value: "Root",
    //     //   desc:
    //     //     "Contains the name of your root node. Use null or false for no name.",
    //     //   id: "name",
    //     // },
    //     // {
    //     //   type: "select",
    //     //   label: "theme",
    //     //   desc: `RJV supports base-16 themes. A custom "rjv-default" theme applies by default.`,
    //     //   capitalize: false,
    //     //   value: "monokai",
    //     //   id: "theme",
    //     //   list: [
    //     //     { value: "monokai", name: "monokai" },
    //     //     { value: "pop", name: "pop" },
    //     //     { value: "ocean", name: "ocean" },
    //     //   ],
    //     // },
    //     // {
    //     //   type: "section",
    //     //   items: [
    //     // {
    //     //   type: "inputText",
    //     //   label: "icon",
    //     //   capitalize: false,
    //     //   value: "circle",
    //     //   desc: `Style of expand/collapse icons. Accepted values are "circle", triangle" or "square".`,
    //     //   id: "iconStyle",
    //     //   list: [
    //     //     { value: "circle", name: "circle" },
    //     //     { value: "triangle", name: "triangle" },
    //     //     { value: "square", name: "square" },
    //     //   ],
    //     // },
    //     // {
    //     //   type: "select",
    //     //   label: "defaultValue",
    //     //   capitalize: false,
    //     //   value: "null",
    //     //   desc: `Sets the default value to be used when adding an item to json`,
    //     //   id: "defaultValue",
    //     //   list: [
    //     //     { value: null, name: "null" },
    //     //     { value: "string", name: "string" },
    //     //     { value: "number", name: "number" },
    //     //     { value: "boolean", name: "boolean" },
    //     //     { value: "array", name: "array" },
    //     //     { value: "object", name: "object" },
    //     //   ],
    //     // },
    //     //   ],
    //     // },
    //     // {
    //     //   type: "section",
    //     //   items: [
    //     // {
    //     //   type: "number",
    //     //   label: "indentWidth",
    //     //   capitalize: false,
    //     //   desc: "Set the indent-width for nested objects",
    //     //   value: 4,
    //     //   id: "indentWidth",
    //     // },
    //     // {
    //     //   type: "number",
    //     //   label: "collapseStringsAfterLength",
    //     //   desc:
    //     //     "When an integer value is assigned, strings will be cut off at that length. Collapsed strings are followed by an ellipsis. String content can be expanded and collapsed by clicking on the string value.",
    //     //   value: false,
    //     //   id: "collapseStringsAfterLength",
    //     // },
    //     //   ],
    //     // },
    //     // {
    //     //   type: "section",
    //     //   items: [
    //     // {
    //     //   type: "number",
    //     //   label: "groupArraysAfterLength",
    //     //   capitalize: false,
    //     //   desc:
    //     //     "When an integer value is assigned, arrays will be displayed in groups by count of the value. Groups are displayed with bracket notation and can be expanded and collapsed by clicking on the brackets.",
    //     //   value: 100,
    //     //   id: "groupArraysAfterLength",
    //     // },
    //     // {
    //     //   type: "inputText",
    //     //   label: "validationMessage",
    //     //   desc:
    //     //     "Custom message for validation failures to onEdit, onAdd, or onDelete callbacks",
    //     //   value: false,
    //     //   id: "validationMessage",
    //     // },
    //     //   ],
    //     // },
    //     // {
    //     //   type: "section",
    //     //   items: [
    //     //     {
    //     //       type: "checkbox",
    //     //       capitalize: false,
    //     //       label: "collapsed",
    //     //       desc:
    //     //         "When set to true, all nodes will be collapsed by default. Use an integer value to collapse at a particular depth.",
    //     //       value: false,
    //     //       id: "collapsed",
    //     //     },
    //     //     {
    //     //       type: "checkbox",
    //     //       capitalize: false,
    //     //       label: "displayObjectSize",
    //     //       desc: "When set to true, objects and arrays are labeled with size.",
    //     //       value: true,
    //     //       id: "displayObjectSize",
    //     //     },
    //     //   ],
    //     // },
    //     // {
    //     //   type: "section",
    //     //   items: [
    //     //     {
    //     //       type: "checkbox",
    //     //       capitalize: false,
    //     //       label: "displayDataTypes",
    //     //       desc: "When set to true, data type labels prefix values",
    //     //       value: true,
    //     //       id: "displayDataTypes",
    //     //     },
    //     //     {
    //     //       type: "checkbox",
    //     //       capitalize: false,
    //     //       label: "sortKeys",
    //     //       desc: "set to true to sort object keys",
    //     //       id: "sortKeys",
    //     //     },
    //     //   ],
    //     // },
    //     // {
    //     //   type: "section",
    //     //   items: [
    //     //     {
    //     //       type: "checkbox",
    //     //       capitalize: false,
    //     //       label: "quotesOnKeys",
    //     //       desc: `set to false to remove quotes from keys (eg. "name": vs. name:)`,
    //     //       value: true,
    //     //       id: "quotesOnKeys",
    //     //     },
    //     //     {
    //     //       type: "checkbox",
    //     //       capitalize: false,
    //     //       label: "displayArrayKey",
    //     //       desc: `When set to true, the index of the elements prefix values`,
    //     //       value: true,
    //     //       id: "displayArrayKey",
    //     //     },
    //     //   ],
    //     // },
    //     // {
    //     //   type: "function",
    //     //   label: "shouldCollapse",
    //     //   id: "shouldCollapse",
    //     //   capitalize: false,
    //     //   desc: `Callback function to provide control over what objects and arrays should be collapsed by default. An object is passed to the callback containing name, src, type ("array" or "object") and namespace.`,
    //     //   params: [{ type: "json", name: "field" }],
    //     // },
    //     // {
    //     //   type: "function",
    //     //   label: "onDelete",
    //     //   id: "onDelete",
    //     //   capitalize: false,
    //     //   desc: `When a callback function is passed in, delete functionality is enabled. The callback is invoked before deletions are completed. Returning false from onDelete will prevent the change from being made.`,
    //     //   params: [{ type: "json", name: "delete" }],
    //     // },
    //     // {
    //     //   type: "function",
    //     //   label: "onSelect",
    //     //   id: "onSelect",
    //     //   capitalize: false,
    //     //   desc: `When a function is passed in, clicking a value triggers the onSelect method to be called.`,
    //     //   params: [{ type: "json", name: "copy" }],
    //     // },
    //     // {
    //     //   type: "function",
    //     //   label: "enableClipboard",
    //     //   id: "enableClipboard",
    //     //   capitalize: false,
    //     //   desc: `When prop is not false, the user can copy objects and arrays to clipboard by clicking on the clipboard icon. Copy callbacks are supported.`,
    //     //   params: [{ type: "json", name: "copy" }],
    //     // },
    //     // {
    //     //   type: "function",
    //     //   label: "onEdit",
    //     //   id: "onEdit",
    //     //   capitalize: false,
    //     //   desc: `When a callback function is passed in, edit functionality is enabled. The callback is invoked before edits are completed. Returning false from onEdit will prevent the change from being made.`,
    //     //   params: [{ type: "json", name: "edit" }],
    //     // },
    //     // {
    //     //   type: "function",
    //     //   label: "onAdd",
    //     //   id: "onAdd",
    //     //   capitalize: false,
    //     //   desc: `When a callback function is passed in, add functionality is enabled. The callback is invoked before additions are completed. Returning false from onAdd will prevent the change from being made.`,
    //     //   params: [{ type: "json", name: "add" }],
    //     // },
    //   ],
    // },
    {
        typeId: 18,
        Component: CopyToClipboard,
        originalJS: CopyToClipboardJS,
        originalCSS: CopyToClipboardCSS,
        title: "React copy to clipboard",
        hideFromMainScreen: true,
        tags: ["react", "copy", "clipboard"],
        replacements: [{
                key: `props.text`,
                props: "text"
            },
            {
                key: `props.message`,
                value: `""`
            },
            {
                key: `props.message`,
                value: `""`
            },
            {
                key: `props.message`,
                value: `""`
            },
            {
                key: `props.message`,
                props: "message"
            },
            {
                key: `props.message`,
                props: "message"
            },
            {
                key: `props.message`,
                props: "message"
            },
            {
                key: `props.debug`,
                props: "debug"
            },
            {
                key: `props.debug`,
                props: "debug"
            },
            {
                key: `props.debug`,
                props: "debug"
            },
        ],
        npm: "npm install react-copy-to-clipboard",
        properties: [{
                type: "inputText",
                label: "text",
                desc: "Text to be copied to clipboard",
                value: "My copy text",
                id: "text",
            },
            // {
            //   type: "section",
            //   items: [
            //     {
            //       type: "inputText",
            //       label: "message",
            //       desc: "Optional. Prompt message.",
            //       value: "",
            //       id: "message",
            //     },
            //     {
            //       type: "checkbox",
            //       label: "debug",
            //       desc: "Optional. Enable output to console.",
            //       value: false,
            //       id: "debug",
            //     },
            //   ],
            // },
            {
                type: "function",
                label: "onCopy",
                id: "onCopy",
                capitalize: false,
                desc: "Optional callback, will be called when text is copied",
                params: [{
                    type: "json",
                    name: "text"
                }],
            },
        ],
    },
    {
        typeId: 19,
        Component: DebounceInput,
        originalJS: DebounceInputJS,
        originalCSS: DebounceInputCSS,
        replacements: [{
                key: `<Wrapper id={0} {...props}>`
            },
            {
                key: `<Wrapper id={1} {...props}>`
            },
            {
                key: `<Wrapper id={2} {...props}>`
            },
            {
                key: `<Wrapper id={3} {...props}>`
            },
            {
                key: `<Wrapper id={4} {...props}>`
            },
            {
                key: `{...(props.multiComponent && props.multiComponent[0])}`
            },
            {
                key: `{...(props.multiComponent && props.multiComponent[1])}`
            },
            {
                key: `{...(props.multiComponent && props.multiComponent[2])}`
            },
            {
                key: `{...(props.multiComponent && props.multiComponent[3])}`
            },
            {
                key: `{...(props.multiComponent && props.multiComponent[4])}`
            },
            {
                key: `</Wrapper>`
            },
            {
                key: `</Wrapper>`
            },
            {
                key: `</Wrapper>`
            },
            {
                key: `</Wrapper>`
            },
            {
                key: `</Wrapper>`
            },
            {
                key: `ref={firstElement}`
            },
            {
                key: `props0`,
                value: "props"
            },
            {
                key: `props0.debounceTimeout`,
                props: "debounceTimeout",
                multiKey: 0
            },
            {
                key: `props0.value`,
                value: `""`,
                multiKey: 0
            },
            {
                key: `props0.value`,
                props: "value",
                multiKey: 0
            },
            {
                key: `props1`,
                value: "props"
            },
            {
                key: `props1.value`,
                value: `""`,
                multiKey: 1
            },
            {
                key: `props1.value`,
                props: "value",
                multiKey: 1
            },
            {
                key: `props2`,
                value: "props"
            },
            {
                key: `props2.value`,
                value: `""`,
                multiKey: 2
            },
            {
                key: `props2.value`,
                props: "value",
                multiKey: 2
            },
            {
                key: `props3`,
                value: "props"
            },
            {
                key: `props3.value`,
                value: `""`,
                multiKey: 3
            },
            {
                key: `props3.value`,
                props: "value",
                multiKey: 3
            },
            {
                key: `props3.element`,
                props: "element",
                multiKey: 3
            },
            {
                key: `props3.debounceTimeout`,
                props: "debounceTimeout",
                multiKey: 3
            },
            {
                key: `props4`,
                value: "props"
            },
            {
                key: `props4.value`,
                value: `""`,
                multiKey: 4
            },
            {
                key: `props4.value`,
                props: "value",
                multiKey: 4
            },
        ],
        title: "Debounce input",
        height: "100%",
        width: "100%",
        hideFromMainScreen: true,
        tags: ["react", "debounce"],
        npm: "npm install react-debounce-input",
        multiComponent: [{
                forceNotifyByEnter: true,
                forceNotifyOnBlur: true,
                minLength: 0,
                debounceTimeout: 500,
            },
            {
                minLength: 2,
                debounceTimeout: 500,
            },
            {
                minLength: 2,
                debounceTimeout: 500,
                forceNotifyOnBlur: false,
            },
            {
                minLength: 0,
                debounceTimeout: 500,
                element: "textarea",
                forceNotifyByEnter: false,
            },
            {
                minLength: 0,
                debounceTimeout: 500,
                forceNotifyByEnter: false,
            },
        ],
        properties: [{
                type: "inputText",
                label: "value",
                desc: "Value of the Input box. Can be omitted, so component works as usual non-controlled input.",
                value: "",
                id: "value",
            },
            {
                type: "inputText",
                label: "element",
                desc: `You can specify element="textarea". For Example:`,
                removeOnDelete: true,
                value: ``,
                id: "element",
            },
            {
                type: "section",
                items: [{
                        type: "number",
                        label: "minLength",
                        capitalize: false,
                        desc: "Minimal length of text to start notify, if value becomes shorter then minLength (after removing some characters), there will be a notification with empty value ''.",
                        value: 0,
                        id: "minLength",
                    },
                    {
                        type: "number",
                        label: "debounceTimeout",
                        capitalize: false,
                        desc: "Notification debounce timeout in ms. If set to -1, disables automatic notification completely. Notification will only happen by pressing Enter then.",
                        value: 500,
                        id: "debounceTimeout",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        label: "forceNotifyByEnter",
                        capitalize: false,
                        desc: `Notification of current value will be sent immediately by hitting Enter key. Enabled by-default. Notification value follows the same rule as with debounced notification, so if Length is less, then minLength - empty value '' will be sent back.`,
                        value: true,
                        id: "forceNotifyByEnter",
                    },
                    {
                        type: "checkbox",
                        label: "forceNotifyOnBlur",
                        capitalize: false,
                        desc: `Same as forceNotifyByEnter, but notification will be sent when focus leaves the input field.`,
                        value: true,
                        id: "forceNotifyOnBlur",
                    },
                ],
            },
            {
                type: "function",
                label: "onChange",
                id: "onChange",
                capitalize: false,
                desc: `Function called when value is changed (debounced) with original event passed through`,
                params: [{
                    type: "json",
                    name: "event"
                }],
            },
            {
                type: "function",
                label: "inputRef",
                id: "inputRef",
                capitalize: false,
                desc: `Will pass ref={inputRef} to generated input element. We needed to rename ref to inputRef since ref is a special prop in React and cannot be passed to children.`,
                params: [{
                    type: "json",
                    name: "event"
                }],
            },
        ],
    },
    {
        typeId: 20,
        Component: Collapse,
        originalJS: CollapseJS,
        title: "Collapse",
        functionsInOtherSection: true,
        hideFromMainScreen: true,
        replacements: [{
                key: `props.overflow`,
                props: "overflow"
            },
            {
                key: `props.overflow`,
                props: "overflow"
            },
            {
                key: `props.height`,
                props: "height"
            },
            {
                key: `props.height`,
                props: "height"
            },
        ],
        tags: ["collapse", "text", ""],
        npm: "npm install react-collapse",
        properties: [{
                type: "checkbox",
                label: "isOpened",
                capitalize: false,
                desc: `Expands or collapses content.`,
                value: true,
                id: "isOpened",
            },
            {
                type: "number",
                label: "checkTimeout",
                id: "checkTimeout",
                capitalize: false,
                desc: "Collapse will check height after thins timeout to determine if animation is completed, the shorter the number - the faster onRest will be triggered and the quicker hight: auto will be applied. The downside - more calculations. Default value is: 50.",
                value: 50,
            },
            {
                type: "inputText",
                label: "height",
                id: "height",
                capitalize: false,
                desc: `You may control initial element style, for example to force initial animation from 0 to height by using initialStyle={{height: '0px', overflow: 'hidden'}}. IMPORTANT Any updates to this prop will be ignored after first render. Default value is determined based on initial isOpened value:`,
                value: "",
            },
            {
                type: "inputText",
                label: "overflow",
                id: "overflow",
                capitalize: false,
                desc: `You may control initial element style, for example to force initial animation from 0 to height by using initialStyle={{height: '0px', overflow: 'hidden'}}. IMPORTANT Any updates to this prop will be ignored after first render. Default value is determined based on initial isOpened value:`,
                value: "",
            },
            {
                type: "function",
                label: "onRest",
                id: "onRest",
                capitalize: false,
                desc: "Callback functions, triggered when animation has completed (onRest) or has just started (onWork)",
                params: [],
            },
            {
                type: "function",
                label: "onWork",
                id: "onWork",
                capitalize: false,
                desc: "Callback functions, triggered when animation has completed (onRest) or has just started (onWork)",
                params: [],
            },
        ],
    },
    {
        typeId: 21,
        Component: ReactHeight,
        originalJS: ReactHeightJS,
        originalCSS: ReactHeightCSS,
        height: "100%",
        title: "Height",
        hideFromMainScreen: true,
        tags: ["section", "tags", "paragraph"],
        npm: "npm i react-height",
        properties: [{
                type: "checkbox",
                label: "hidden",
                id: "hidden",
                capitalize: false,
                desc: "ReactHeight can render to null as soon as height is measured.",
                value: false,
            },
            {
                type: "function",
                label: "onHeightReady",
                id: "onHeightReady",
                capitalize: false,
                desc: "Callback, invoked when height is measured (and when it is changed).",
            },
            {
                type: "function",
                label: "getElementHeight",
                id: "getElementHeight",
                capitalize: false,
                desc: "Function to measure your element. It receives the element as argument and defaults to el => el.clientHeight.",
            },
        ],
    },
    // {
    //   typeId: 22,
    //   Component: OtherHotkeysHook,
    //   originalJS: OtherHotkeysHookJS,
    //   height: "100%",
    //   hideFromMainScreen: true,
    //   isPropsJson: true,
    //   replacements: [{ key: `props.keys`, props: "keys" }],
    //   title: "React hotkeys hook",
    //   tags: ["hotkeys", "hook"],
    //   npm: "npm i react-hotkeys-hook",
    //   properties: [
    //     {
    //       type: "inputText",
    //       label: "keys",
    //       id: "keys",
    //       capitalize: false,
    //       desc: `Here you can set the key strokes you want the hook to listen to. You can use single or multiple keys, modifier combination, etc`,
    //       value: "ctrl+k",
    //     },
    //     {
    //       type: "inputText",
    //       label: "splitKey",
    //       id: "splitKey",
    //       capitalize: false,
    //       desc:
    //         "is used to change the splitting character inside the keys argument. Default is +, but if you want to listen to the + character, you can set splitKey to i.e. - and listen for ctrl-+",
    //     },
    //     {
    //       type: "checkbox",
    //       label: "enabled",
    //       id: "enabled",
    //       capitalize: false,
    //       value: true,
    //       desc:
    //         " is used to prevent installation of the hotkey when set to false (default value: true)",
    //     },
    //     {
    //       type: "section",
    //       items: [
    //         {
    //           type: "checkbox",
    //           label: "keyup",
    //           id: "keyup",
    //           capitalize: false,
    //           desc: "Determine if you want to listen on the keyup event",
    //         },
    //         {
    //           type: "checkbox",
    //           label: "keydown",
    //           id: "keydown",
    //           capitalize: false,
    //           desc: "Determine if want to listen on the keydown event",
    //         },
    //       ],
    //     },
    //     {
    //       type: "section",
    //       items: [
    //         {
    //           type: "checkbox",
    //           label: "filter",
    //           id: "filter",
    //           capitalize: false,
    //           desc:
    //             "boolean is used to filter if a callback gets triggered depending on the keyboard event. Breaking Change in 3.0.0! Prior to version 3.0.0 the filter settings was one global setting that applied to every hook. Since 3.0.0 this behavior changed. The filter option is now locally scoped to each call of useHotkeys.",
    //         },
    //         {
    //           type: "checkbox",
    //           label: "filterPreventDefault",
    //           id: "filterPreventDefault",
    //           capitalize: false,
    //           desc:
    //             "is used to prevent/allow the default browser behavior for the keystroke when the filter return false (default value: true)",
    //           value: true,
    //         },
    //       ],
    //     },
    //     {
    //       type: "function",
    //       label: "callback",
    //       id: "callback",
    //       capitalize: false,
    //       desc:
    //         "Gets executed when the defined keystroke gets hit by the user. Important: Since version 1.5.0 this callback gets memoised inside the hook. So you don't have to do this anymore by yourself.",
    //     },
    //   ],
    // },
    {
        typeId: 23,
        Component: NumberFormat,
        originalJS: NumberFormatJS,
        componentName: "NumberFormat",
        functionsInOtherSection: true,
        // editable: true,
        height: "100%",
        hideFromMainScreen: true,
        replacements: [],
        title: "Number format",
        tags: ["number", "format"],
        npm: "npm i react-number-format",
        properties: [{
                type: "select",
                label: "thousandsGroupStyle",
                capitalize: false,
                desc: "Define the thousand grouping style, It support three types. thousand style (thousand) : 123,456,789, indian style (lakh) : 12,34,56,789, chinese style (wan) : 1,2345,6789. ",
                id: "thousandsGroupStyle",
                list: [{
                        value: "thousand",
                        name: "thousand"
                    },
                    {
                        value: "lakh",
                        name: "lakh"
                    },
                    {
                        value: "wan",
                        name: "wan"
                    },
                ],
                value: "thousand",
            },
            {
                type: "section",
                items: [{
                        type: "inputText",
                        label: "value",
                        id: "value",
                        capitalize: false,
                        desc: "Value to the number format. It can be a float number, or formatted string. If value is string representation of number (unformatted), isNumericString props should be passed as true.",
                        value: 2456981,
                    },
                    {
                        type: "inputText",
                        label: "defaultValue",
                        id: "defaultValue",
                        capitalize: false,
                        desc: "Value to be used as default value if value is not provided. The format of defaultValue should be similar as defined for the value.",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "inputText",
                        label: "prefix",
                        id: "prefix",
                        capitalize: false,
                        desc: "Add a prefix before the number",
                        value: "$",
                    },
                    {
                        type: "inputText",
                        label: "suffix",
                        id: "suffix",
                        capitalize: false,
                        desc: "Add a suffix after the number",
                        value: "",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "inputText",
                        label: "decimalSeparator",
                        id: "decimalSeparator",
                        capitalize: false,
                        desc: "Support decimal point on a number",
                        value: ".",
                    },
                    {
                        type: "number",
                        label: "decimalScale",
                        id: "decimalScale",
                        capitalize: false,
                        desc: "If defined it limits to given decimal scale",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "select",
                        label: "displayType",
                        value: "text",
                        id: "displayType",
                        desc: "If input it renders a input element where formatting happens as you input characters. If text it renders it as a normal text in a span formatting the given value.",
                        list: [{
                                value: "text",
                                name: "text"
                            },
                            {
                                value: "input",
                                name: "input"
                            },
                        ],
                    },
                    {
                        type: "select",
                        label: "type",
                        id: "type",
                        value: "text",
                        desc: "Input type attribute.",
                        list: [{
                                value: "text",
                                name: "text"
                            },
                            {
                                value: "tel",
                                name: "tel"
                            },
                            {
                                value: "password",
                                name: "password"
                            },
                        ],
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "inputText",
                        label: "format",
                        id: "format",
                        capitalize: false,
                        removeOnDelete: true,
                        desc: "If format given as hash string allow number input inplace of hash. If format given as function, component calls the function with unformatted number and expects formatted number.",
                    },
                    {
                        type: "inputText",
                        label: "mask",
                        id: "mask",
                        capitalize: false,
                        desc: "If mask defined, component will show non entered placed with masked value.",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        label: "thousandSeparator",
                        id: "thousandSeparator",
                        capitalize: false,
                        desc: "Add thousand separators on number",
                        value: true,
                    },
                    {
                        type: "checkbox",
                        label: "isNumericString",
                        id: "isNumericString",
                        capitalize: false,
                        desc: "If value is passed as string representation of numbers (unformatted) then this should be passed as true",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        label: "fixedDecimalScale",
                        id: "fixedDecimalScale",
                        capitalize: false,
                        desc: "If true it add 0s to match given decimalScale",
                    },
                    {
                        type: "checkbox",
                        label: "allowNegative",
                        id: "allowNegative",
                        capitalize: false,
                        desc: "allow negative numbers (Only when format option is not provided)",
                        value: true,
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        label: "allowEmptyFormatting",
                        id: "allowEmptyFormatting",
                        capitalize: false,
                        desc: "Apply formatting to empty inputs",
                    },
                    {
                        type: "checkbox",
                        label: "allowLeadingZeros",
                        id: "allowLeadingZeros",
                        capitalize: false,
                        desc: "Allow leading zeros at beginning of number",
                    },
                ],
            },
            {
                type: "function",
                label: "removeFormatting",
                id: "removeFormatting",
                capitalize: false,
                desc: "If you are providing custom format method and it add numbers as format you will need to add custom removeFormatting logic",
                params: [{
                    type: "json",
                    name: "formattedValue"
                }],
            },
            {
                type: "function",
                label: "onValueChange",
                id: "onValueChange",
                capitalize: false,
                desc: "onValueChange handler accepts values object",
                params: [{
                    type: "json",
                    name: "values"
                }],
            },
            {
                type: "function",
                label: "isAllowed",
                id: "isAllowed",
                capitalize: false,
                desc: "A checker function to check if input value is valid or not. If this function returns false, the onChange method will not get triggered",
                params: [{
                    type: "json",
                    name: "value"
                }],
            },
            {
                type: "function",
                label: "renderText",
                id: "renderText",
                capitalize: false,
                desc: "A renderText method useful if you want to render formattedValue in different element other than span. It also returns the custom props that are added to the component which can allow passing down props to the rendered element",
                params: [{
                        type: "json",
                        name: "formattedValue"
                    },
                    {
                        type: "json",
                        name: "customProps"
                    },
                ],
            },
            {
                type: "function",
                label: "getInputRef",
                id: "getInputRef",
                capitalize: false,
                desc: "Method to get reference of input, span (based on displayType prop) or the customInput's reference.",
                params: [{
                    type: "json",
                    name: "elm"
                }],
            },
        ],
    },
    {
        typeId: 24,
        Component: NumberFormatAll,
        originalJS: NumberFormatAllJS,
        functionsInOtherSection: true,
        height: "100%",
        hideFromMainScreen: true,
        title: "Number format",
        tags: ["number", "format"],
        npm: "npm i react-number-format",
        replacements: [{
                key: `let props0 = { ...(props.multiComponent && props.multiComponent[0]) };`,
            },
            {
                key: `let props1 = { ...(props.multiComponent && props.multiComponent[1]) };`,
            },
            {
                key: `let props2 = { ...(props.multiComponent && props.multiComponent[2]) };`,
            },
            {
                key: `let props3 = { ...(props.multiComponent && props.multiComponent[3]) };`,
            },
            {
                key: `let props4 = { ...(props.multiComponent && props.multiComponent[4]) };`,
            },
            {
                key: `let props5 = { ...(props.multiComponent && props.multiComponent[5]) };`,
            },
            {
                key: `let props6 = { ...(props.multiComponent && props.multiComponent[6]) };`,
            },
            {
                key: `let props7 = { ...(props.multiComponent && props.multiComponent[7]) };`,
            },
            {
                key: `let props8 = { ...(props.multiComponent && props.multiComponent[8]) };`,
            },
            {
                key: `<Wrapper id={0} {...props}>`
            },
            {
                key: `<Wrapper id={1} {...props}>`
            },
            {
                key: `<Wrapper id={2} {...props}>`
            },
            {
                key: `<Wrapper id={3} {...props}>`
            },
            {
                key: `<Wrapper id={4} {...props}>`
            },
            {
                key: `<Wrapper id={5} {...props}>`
            },
            {
                key: `<Wrapper id={6} {...props}>`
            },
            {
                key: `<Wrapper id={7} {...props}>`
            },
            {
                key: `<Wrapper id={8} {...props}>`
            },
            {
                key: `</Wrapper>`
            },
            {
                key: `</Wrapper>`
            },
            {
                key: `</Wrapper>`
            },
            {
                key: `</Wrapper>`
            },
            {
                key: `</Wrapper>`
            },
            {
                key: `</Wrapper>`
            },
            {
                key: `</Wrapper>`
            },
            {
                key: `</Wrapper>`
            },
        ],
        multiComponent: [{
                value: 2456981,
                displayType: "text",
                thousandSeparator: true,
                prefix: "$",
            },
            {
                value: 4111111111111111,
                displayType: "text",
                format: "#### #### #### ####",
                prefix: "",
            },
            {
                value: 123123123,
                thousandSeparator: true,
                prefix: "$",
                className: "some",
                inputmode: "numeric",
            },
            {
                value: 123123123,
                thousandSeparator: ".",
                decimalSeparator: ",",
                prefix: "$",
            },
            {
                format: "#### #### #### ####",
            },
            {
                format: "#### #### #### ####",
                mask: "_",
            },
            {},
            {
                format: "+1 (###) ###-####",
                mask: "_",
            },
            {
                format: "+1 (###) ###-####",
                mask: "_",
                allowEmptyFormatting: true,
            },
        ],
        properties: [{
                type: "select",
                label: "thousandsGroupStyle",
                capitalize: false,
                desc: "Define the thousand grouping style, It support three types. thousand style (thousand) : 123,456,789, indian style (lakh) : 12,34,56,789, chinese style (wan) : 1,2345,6789. ",
                id: "thousandsGroupStyle",
                list: [{
                        value: "thousand",
                        name: "thousand"
                    },
                    {
                        value: "lakh",
                        name: "lakh"
                    },
                    {
                        value: "wan",
                        name: "wan"
                    },
                ],
                value: "thousand",
            },
            {
                type: "section",
                items: [{
                        type: "inputText",
                        label: "value",
                        id: "value",
                        capitalize: false,
                        desc: "Value to the number format. It can be a float number, or formatted string. If value is string representation of number (unformatted), isNumericString props should be passed as true.",
                        value: 2456981,
                    },
                    {
                        type: "inputText",
                        label: "defaultValue",
                        id: "defaultValue",
                        capitalize: false,
                        desc: "Value to be used as default value if value is not provided. The format of defaultValue should be similar as defined for the value.",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "inputText",
                        label: "prefix",
                        id: "prefix",
                        capitalize: false,
                        desc: "Add a prefix before the number",
                        value: "$",
                    },
                    {
                        type: "inputText",
                        label: "suffix",
                        id: "suffix",
                        capitalize: false,
                        desc: "Add a suffix after the number",
                        value: "",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "inputText",
                        label: "decimalSeparator",
                        id: "decimalSeparator",
                        capitalize: false,
                        desc: "Support decimal point on a number",
                        value: ".",
                    },
                    {
                        type: "number",
                        label: "decimalScale",
                        id: "decimalScale",
                        capitalize: false,
                        desc: "If defined it limits to given decimal scale",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "select",
                        label: "displayType",
                        value: "text",
                        id: "displayType",
                        desc: "If input it renders a input element where formatting happens as you input characters. If text it renders it as a normal text in a span formatting the given value.",
                        list: [{
                                value: "text",
                                name: "text"
                            },
                            {
                                value: "input",
                                name: "input"
                            },
                        ],
                    },
                    {
                        type: "select",
                        label: "type",
                        id: "type",
                        value: "text",
                        desc: "Input type attribute.",
                        list: [{
                                value: "text",
                                name: "text"
                            },
                            {
                                value: "tel",
                                name: "tel"
                            },
                            {
                                value: "password",
                                name: "password"
                            },
                        ],
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "inputText",
                        label: "format",
                        id: "format",
                        removeOnDelete: true,
                        capitalize: false,
                        desc: "If format given as hash string allow number input inplace of hash. If format given as function, component calls the function with unformatted number and expects formatted number.",
                    },
                    {
                        type: "inputText",
                        label: "mask",
                        id: "mask",
                        capitalize: false,
                        desc: "If mask defined, component will show non entered placed with masked value.",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        label: "thousandSeparator",
                        id: "thousandSeparator",
                        capitalize: false,
                        desc: "Add thousand separators on number",
                        value: true,
                    },
                    {
                        type: "checkbox",
                        label: "isNumericString",
                        id: "isNumericString",
                        capitalize: false,
                        desc: "If value is passed as string representation of numbers (unformatted) then this should be passed as true",
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        label: "fixedDecimalScale",
                        id: "fixedDecimalScale",
                        capitalize: false,
                        desc: "If true it add 0s to match given decimalScale",
                    },
                    {
                        type: "checkbox",
                        label: "allowNegative",
                        id: "allowNegative",
                        capitalize: false,
                        desc: "allow negative numbers (Only when format option is not provided)",
                        value: true,
                    },
                ],
            },
            {
                type: "section",
                items: [{
                        type: "checkbox",
                        label: "allowEmptyFormatting",
                        id: "allowEmptyFormatting",
                        capitalize: false,
                        desc: "Apply formatting to empty inputs",
                    },
                    {
                        type: "checkbox",
                        label: "allowLeadingZeros",
                        id: "allowLeadingZeros",
                        capitalize: false,
                        desc: "Allow leading zeros at beginning of number",
                    },
                ],
            },
            {
                type: "function",
                label: "removeFormatting",
                id: "removeFormatting",
                capitalize: false,
                desc: "If you are providing custom format method and it add numbers as format you will need to add custom removeFormatting logic",
                params: [{
                    type: "json",
                    name: "formattedValue"
                }],
            },
            {
                type: "function",
                label: "onValueChange",
                id: "onValueChange",
                capitalize: false,
                desc: "onValueChange handler accepts values object",
                params: [{
                    type: "json",
                    name: "values"
                }],
            },
            {
                type: "function",
                label: "isAllowed",
                id: "isAllowed",
                capitalize: false,
                desc: "A checker function to check if input value is valid or not. If this function returns false, the onChange method will not get triggered",
                params: [{
                    type: "json",
                    name: "value"
                }],
            },
            {
                type: "function",
                label: "renderText",
                id: "renderText",
                capitalize: false,
                desc: "A renderText method useful if you want to render formattedValue in different element other than span. It also returns the custom props that are added to the component which can allow passing down props to the rendered element",
                params: [{
                        type: "json",
                        name: "formattedValue"
                    },
                    {
                        type: "json",
                        name: "customProps"
                    },
                ],
            },
            {
                type: "function",
                label: "getInputRef",
                id: "getInputRef",
                capitalize: false,
                desc: "Method to get reference of input, span (based on displayType prop) or the customInput's reference.",
                params: [{
                    type: "json",
                    name: "elm"
                }],
            },
        ],
    },
    // {
    //   typeId: 25,
    //   Component: HorizontalScrolling,
    //   originalJS: HorizontalScrollingJS,
    //   originalCSS: HorizontalScrollingCSS,
    //   tabs: [
    //     { name: "Arrow", code: OtherHorizontalScrollingArrowJS },
    //     { name: "LeftArrow", code: OtherHorizontalScrollingArrowLeftJS },
    //     { name: "RightArrow", code: OtherHorizontalScrollingArrowRightJS },
    //   ],
    //   height: "100%",
    //   width: "100%",
    //   hideFromMainScreen: true,
    //   replacements: [],
    //   title: "Horizontal scrolling menu",
    //   tags: ["scroll", "horizontal"],
    //   npm: "npm i react-horizontal-scrolling-menu",
    //   properties: [
    //     {
    //       type: "function",
    //       label: "onWheel",
    //       id: "onWheel",
    //       desc: "On wheel trigger",
    //       capitalize: false,
    //       params: [{ type: "json", name: "VisibilityContext" }],
    //     },
    //     {
    //       type: "function",
    //       label: "onScroll",
    //       id: "onScroll",
    //       desc: "On scroll trigger",
    //       capitalize: false,
    //       params: [{ type: "json", name: "VisibilityContext" }],
    //     },
    //     {
    //       type: "function",
    //       label: "onInit",
    //       id: "onInit",
    //       capitalize: false,
    //       desc: "On first load",
    //       params: [{ type: "json", name: "VisibilityContext" }],
    //     },
    //     {
    //       type: "function",
    //       label: "onMouseDown",
    //       id: "onMouseDown",
    //       capitalize: false,
    //       desc: "On mouse down trigger",
    //       params: [{ type: "json", name: "MouseEventHandler" }],
    //     },

    //     {
    //       type: "function",
    //       label: "onMouseUp",
    //       id: "onMouseUp",
    //       capitalize: false,
    //       desc: "On mouse up trigger",
    //       params: [{ type: "json", name: "MouseEventHandler" }],
    //     },
    //     {
    //       type: "function",
    //       label: "onMouseMove",
    //       id: "onMouseMove",
    //       desc: "On mouse move trigger",
    //       capitalize: false,
    //       params: [{ type: "json", name: "MouseEventHandler" }],
    //     },
    //   ],
    // },
];
allComponents = MaterialComponents.concat(allComponents);
// allComponents = SemanticComponents.concat(allComponents);

export function buildPropsForOneChild(comp) {
    let injectComponentId =
        comp && comp.props && comp.props.injectComponentId ?
        comp.props.injectComponentId :
        null;
    comp.props = {};

    if (injectComponentId) {
        comp.props.injectComponentId = injectComponentId;
    }

    comp.properties &&
        comp.properties.forEach((property) => {
            if (property.type === "section") {
                property.items.forEach((innerProperty) => {
                    if (
                        innerProperty.value ||
                        innerProperty.value === false ||
                        innerProperty.value === 0
                    ) {
                        comp.props[innerProperty.id] = innerProperty.value;
                    }

                    if (!innerProperty.defaultValue) {
                        innerProperty.defaultValue = innerProperty.value;
                    }
                });
            } else {
                if (
                    property.value ||
                    property.value === false ||
                    property.value === 0
                ) {
                    comp.props[property.id] = property.value;
                }

                if (!property.defaultValue) {
                    property.defaultValue = property.value;
                }
            }
        });

    return comp;
}

function buildProps() {
    allComponents = allComponents.map((comp) => {
        return buildPropsForOneChild(comp);
    });
}

let cacheAllComponent;
async function getAllComponent() {
    if (cacheAllComponent) {
        return cacheAllComponent;
    }

    buildProps();
    allComponents = allComponents.map((comp) => removeSection(comp));
    cacheAllComponent = allComponents;
    CanvasStoreClass.setIsLoading(false);
    return allComponents;
}

export const removeSection = (comp) => {
    //remove all sections from array, it's old and we don't support it anymore
    let newProperties = [];
    let properties = comp.properties ? comp.properties : [];
    for (let i = 0; i < properties.length; i++) {
        let item = properties[i];
        if (item.type === "section") {
            if (item.items[0]) newProperties.push(item.items[0]);
            if (item.items[1]) newProperties.push(item.items[1]);
        } else {
            newProperties.push(item);
        }
    }
    comp.properties = newProperties;
    return comp;
};

export const deleteProperty = (componentId, propertyId) => {
    let component = allComponents.find((comp) => comp.typeId === componentId);
    deletePropertyForLocalComponent(componentId, propertyId);
    if (!component) return;

    delete component.props[propertyId];
    if (component.properties) {
        component.properties = component.properties.filter((item) => {
            if (item.type === "section") {
                item.items = item.items.filter((innerItem) => {
                    return innerItem.id !== propertyId;
                });
            }
            return item.id !== propertyId;
        });
    } else {
        component.properties = [];
    }
};

export const addComponent = (component) => {
    if (cacheAllComponent) {
        cacheAllComponent.push(component);
    }
};

export const saveProperties = (id, properties) => {
    savePropertiesForLocalComponents(id, properties);

    let findComponent = allComponents.find((comp) => comp.typeId === id);
    if (findComponent) {
        findComponent.properties = properties;
        findComponent = buildPropsForOneChild(findComponent);
    }
};
export default getAllComponent;