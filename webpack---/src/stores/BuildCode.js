export default (component) => {
    if (!component) {
        return;
    }
    debugger
    let jsCode = component.changedJsCode ?
        component.changedJsCode :
        component.originalJS;
    let componentName =
        component.clientId && !component.clientId.includes("DontSaveMe") ?
        component.clientId :
        "Component";

    if (!jsCode) {
        //the default code if we don't have something that has been saved
        jsCode = getDefaultCode(componentName);
    }

    let splitString = `<${componentName}`;
    let splitComponent = split(jsCode, splitString); // all the code we have before the component and after the component
    if (!splitComponent.before || !splitComponent.after) {
        return jsCode;
    }

    // debugger
    // let haveChildren = component.props && component.props.children ? true : false;
    // let codeBeforeComponent = splitComponent.before;
    // let codeAfterComponent = splitComponent.after; //all the code we have after the component
    // let splitAfterCode = split(codeAfterComponent, haveChildren ? ">" : "/>");
    // let oldParams = splitAfterCode.before;
    // let haveChildrenCode = haveChildren
    //   ? buildHaveChildrenCode(componentName, component.props.children)
    //   : "";
    // codeAfterComponent = `${haveChildren ? haveChildrenCode : "/>"} ${
    //   splitAfterCode.after
    // }`;

    let codeBeforeComponent = splitComponent.before;
    let codeAfterComponent = splitComponent.after; //all the code we have after the component
    let splitAfterCode = split(codeAfterComponent, "/>");
    let oldParams = splitAfterCode.before;
    codeAfterComponent = "/>" + splitAfterCode.after;

    let spaces = findSpaces(jsCode, splitString);

    let addParams = addNewParams(component.props, spaces); //add all the params that are not exists on the code to the component
    let takeOldParams = addOldParams(
        oldParams,
        component.props,
        component.properties,
        spaces
    );

    let allCode =
        codeBeforeComponent + addParams + takeOldParams + codeAfterComponent;

    return allCode;
};

function buildHaveChildrenCode(componentName, children) {
    return `>${children}</${componentName}>`;
}

function split(string, splitString) {
    //this split function split the code one time on the first element it found
    if (!string || !splitString) {
        return {
            before: "",
            after: ""
        };
    }

    let index = string.indexOf(splitString);
    if (index === -1) {
        //if we didn't find the string
        return {
            before: "",
            after: ""
        };
    }

    index += splitString.length; //the index of the string
    let before = string.substring(0, index); //string.split(splitString)[0];
    let after = string.substring(index); //string.split(splitString)[1];

    return {
        before,
        after
    };
}

function addOldParams(oldParams, props, properties, spaces) {
    //add params that we can't scan like functions
    let saveOldParams = Object.keys(props).filter((key) => {
        let value = props[key];

        return typeof value === "function";
    });

    properties = properties
        .filter((item) => {
            return item.type === "function";
        })
        .map((item) => {
            return item.id;
        });

    saveOldParams = saveOldParams.concat(saveOldParams, properties);

    let saveOldParamsStrings = "";
    saveOldParams.forEach((item) => {
        let findFirstString = split(oldParams, `${item}=`);
        if (!findFirstString.after) {
            findFirstString = split(oldParams, `${item} =`);
        }

        let string = spaces + `${item}=`;
        if (findFirstString.after) {
            let startIndex = -1;
            let simbols = ["{", "}", '"', "'"];

            for (let i = 0; i < findFirstString.after.length; i++) {
                //find start simbol or end simbol
                let char = findFirstString.after[i];
                if (startIndex >= 0) {
                    string += char;
                }

                if (simbols.includes(char) && startIndex < 0) {
                    startIndex = i;
                    string += char;
                } else if (simbols.includes(char)) {
                    break;
                }
            }
        }
        saveOldParamsStrings += "\n  " + string;
    });

    return saveOldParamsStrings.length ?
        saveOldParamsStrings + "\n" + spaces :
        saveOldParamsStrings;
}

function addNewParams(props, spaces) {
    //add all the params like functions
    let addParams = "";

    Object.keys(props).forEach((key) => {
        let value = props[key];

        try {
            value = JSON.parse(value);
        } catch (e) {}

        if (typeof value == "object") {
            //build the value
            value = `{${JSON.stringify(value)}}`;
        } else if (typeof value === "number" || typeof value === "boolean") {
            value = `{${value}}`;
        } else if (typeof value === "function") {
            return;
        } else {
            value = `"${value}"`;
        }

        if (value && key !== "injectComponentId") {
            addParams += `\n  ${spaces}${key}=${value}`;
        }
    });
    return addParams;
}

function findSpaces(code, str = "{...props}") {
    let i = 1;
    let spaces = "";
    while (
        code[code.indexOf(str) - i] === " " ||
        code[code.indexOf(str) - i] === "\t"
    ) {
        spaces += code[code.indexOf(str) - i];
        i++;
    }

    return spaces;
}

function getDefaultCode(componentName) {
    //if we still don't have code
    return `(props) => {
  return (
    <>
      <${componentName} />
    </>
  )
}`;
}