import React from "react";
import {
    observer
} from "mobx-react-lite";
import {
    ComponentDemo
} from "../ComponentDemo/ComponentDemo";
import styles from "./CanvasComponents.module.scss";
import classNames from "classnames";

export const CanvasComponents = observer((props) => {
            return ( <
                div className = {
                    styles.CanvasComponents
                } > {
                    props.title ? < div className = {
                        styles.title
                    } > {
                        props.title
                    } < /div> : null} {
                        props.allComponentsCopy && !props.allComponentsCopy.length ? ( <
                            div className = {
                                styles.emptyText
                            } >
                            <
                            br / > < br / >
                            We didn 't found the component you searched for :-( <
                            /div>
                        ) : null
                    } <
                    div
                    className = {
                        classNames(styles.wrapper, {
                            [styles.wrapperOneChilde]: props.allComponentsCopy && props.allComponentsCopy.length === 1,
                        })
                    } >
                    {
                        props.allComponentsCopy &&
                        props.allComponentsCopy.map((item, index) => {
                            let Component = item.Component;
                            let data = item.props;

                            return ( <
                                ComponentDemo key = {
                                    item.typeId
                                }
                                componentData = {
                                    item
                                } >
                                <
                                Component { ...data
                                }
                                width = {
                                    item.demoWidth
                                }
                                height = {
                                    item.demoHeight
                                }
                                /> <
                                /ComponentDemo>
                            );
                        })
                    } {
                        props.allComponentsCopy.length % 3 >= 1 ? ( <
                            ComponentDemo > < /ComponentDemo>
                        ) : null
                    } {
                        props.allComponentsCopy.length % 3 >= 2 ? < div > < /div> : null} <
                            /div> <
                            /div>
                    );
                });

            // if (module.hot) {
            //   module.hot.accept("../ComponentDemo/ComponentDemo.js", function () {
            //     console.log("Accepting the updated printMe module!");
            //     console.log("ComponentDemo", ComponentDemo);
            //   });
            // }