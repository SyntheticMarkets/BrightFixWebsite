import React, {
    useState
} from "react";
import styles from "./OtherReactHeight.module.scss";
import ReactHeight from "react-height";

const getText = (num) => text.slice(0, num).map((p, i) => < p key = {
            i
        } > {
            p
        } < /p>);

        const VariableText = () => {
                const [paragraphs, setParagraphs] = useState(0);
                const [height, setHeight] = useState(0);

                return ( <
                    div >
                    <
                    div className = "config" >
                    <
                    label className = "label" >
                    Paragraphs:
                    <
                    input className = {
                        styles.input
                    }
                    type = "range"
                    value = {
                        paragraphs
                    }
                    step = {
                        1
                    }
                    min = {
                        0
                    }
                    max = {
                        4
                    }
                    onChange = {
                        ({
                            target: {
                                value
                            }
                        }) =>
                        setParagraphs(parseInt(value, 10))
                    }
                    /> {
                        paragraphs
                    } <
                    /label> <
                    label className = {
                        styles.label
                    } >
                    Content height:
                    <
                    b className = {
                        styles.input
                    } > {
                        height
                    }
                    px < /b> <
                    /label> <
                    /div>

                    <
                    ReactHeight onHeightReady = {
                        (value) => setHeight(value)
                    }
                    className = {
                        styles.content
                    } >
                    {
                        paragraphs ? getText(paragraphs) : < p > No text < /p>} <
                            /ReactHeight> <
                            /div>
                    );
                };

                const Nested = () => {
                    const [blocks, setBlocks] = useState(1);
                    const [height, setHeight] = useState(-1);
                    const [dirty, setDirty] = useState(true);

                    const onHeightReady = (height) => {
                        setHeight(height);
                        setDirty(false);
                    };


                    return ( <
                        div >
                        <
                        div className = "config" >
                        <
                        label className = {
                            styles.label
                        } >
                        Blocks:
                        <
                        input className = {
                            styles.input
                        }
                        type = "range"
                        value = {
                            blocks
                        }
                        step = {
                            1
                        }
                        min = {
                            0
                        }
                        max = {
                            4
                        }
                        onChange = {
                            ({
                                target: {
                                    value
                                }
                            }) =>
                            setBlocks(parseInt(value, 10))
                        }
                        /> {
                            blocks
                        } <
                        /label> <
                        label className = {
                            styles.label
                        } >
                        Content height:
                        <
                        b className = {
                            styles.input
                        } > {
                            height
                        }
                        px < /b> <
                        /label> <
                        label className = {
                            styles.label
                        } >
                        <
                        button type = "button"
                        onClick = {
                            () => setDirty(true)
                        } >
                        Recalculate <
                        /button> <
                        /label> <
                        /div>

                        <
                        ReactHeight dirty = {
                            dirty
                        }
                        onHeightReady = {
                            onHeightReady
                        }
                        className = {
                            styles.content
                        } >
                        {
                            new Array(blocks)
                            .join(".")
                            .split(".")
                            .map((_, key) => ( <
                                div key = {
                                    key
                                }
                                className = {
                                    {
                                        padding: 20
                                    }
                                } >
                                <
                                VariableText / >
                                <
                                /div>
                            ))
                        } <
                        /ReactHeight> <
                        /div>
                    );
                }

                const ReactHeightWrapper = () => {
                    return ( <
                        div className = {
                            styles.wrapper
                        } >
                        <
                        div className = {
                            styles.title
                        } > react - height < /div>

                        <
                        section >
                        <
                        div className = {
                            styles.subTitle
                        } > Example 1. Variable text < /div> <
                        VariableText / >
                        <
                        /section>

                        <
                        section >
                        <
                        div className = {
                            styles.subTitle
                        } > Example 2. Nested Blocks < /div> <
                        Nested / >
                        <
                        /section> <
                        /div>
                    );
                };
                export default ReactHeightWrapper;

                const text = [
                    "You think water moves fast? You should see ice. It moves like it has a mind. " +
                    "Like it knows it killed the world once and got a taste for murder. " +
                    "After the avalanche, it took us a week to climb out. " +
                    "Now, I don't know exactly when we turned on each other, " +
                    "but I know that seven of us survived the slide... and only five made it out. " +
                    "Now we took an oath, that I'm breaking now. " +
                    "We said we'd say it was the snow that killed the other two, but it wasn't. " +
                    "Nature is lethal but it doesn't hold a candle to man. ",
                    "Your bones don't break, mine do. That's clear. " +
                    "Your cells react to bacteria and viruses differently than mine. " +
                    "You don't get sick, I do. That's also clear. " +
                    "But for some reason, you and I react the exact same way to water. " +
                    "We swallow it too fast, we choke. We get some in our lungs, we drown. " +
                    "However unreal it may seem, we are connected, you and I. " +
                    "We're on the same curve, just on opposite ends.",
                    "Do you see any Teletubbies in here? Do you see a slender plastic tag " +
                    "clipped to my shirt with my name printed on it? Do you see a little Asian " +
                    "child with a blank expression on his face sitting outside on a mechanical helicopter " +
                    "that shakes when you put quarters in it? No? Well, that's what you see at a toy store. " +
                    "And you must think you're in a toy store, because you're here shopping for an infant" +
                    "named Jeb.",
                    "You see? It's curious. Ted did figure it out - time travel. And when we get back, " +
                    "we gonna tell everyone. How it's possible, how it's done, what the dangers are. " +
                    "But then why fifty years in the future when the spacecraft encounters a black hole " +
                    "does the computer call it an 'unknown entry event'? Why don't they know? " +
                    "If they don't know, that means we never told anyone. And if we never told anyone " +
                    "it means we never made it back. Hence we die down here. Just as a matter of deductive logic.",
                ];