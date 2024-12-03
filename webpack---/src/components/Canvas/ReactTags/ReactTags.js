import React, {
    useState,
    useEffect
} from "react";
import {
    withContext as ReactTags
} from "aakansha-react-tag-input";
import styles from "./ReactTags.module.scss";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const ReactTagsDemo = (props) => {
    const [tags, setTags] = useState(props.tags ? props.tags : []);
    /*remove*/
    useEffect(() => {
        setTags(props.tags ? props.tags : []);
    }, [props.tags]);
    /*remove*/

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
        if (props.updateStyleHover) props.updateStyleHover();
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = [...tags].slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setTags(newTags);
    };

    const handleTagClick = (index) => {
        console.log("The tag at index " + index + " was clicked");
    };

    const onClearAll = () => {
        setTags([]);
    };

    const onTagUpdate = (i, newTag) => {
        const updatedTags = tags.slice();
        updatedTags.splice(i, 1, newTag);
        setTags(updatedTags);
    };

    return ( <
        div className = {
            styles.ReactTags
        } >
        <
        ReactTags handleDelete = {
            handleDelete
        }
        handleAddition = {
            handleAddition
        }
        handleDrag = {
            handleDrag
        }
        delimiters = {
            delimiters
        }
        handleTagClick = {
            handleTagClick
        }
        onClearAll = {
            onClearAll
        }
        onTagUpdate = {
            onTagUpdate
        } { ...props
        }
        tags = {
            tags
        }
        /> <
        /div>
    );
};
export default ReactTagsDemo;