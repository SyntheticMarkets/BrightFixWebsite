import React, {
    useContext
} from "react";
import {
    observer
} from "mobx-react-lite";
import {
    toJS
} from "mobx";
import MeasuresStore from "../../stores/MeasuresStore";
import GlobalStore from "../../stores/GlobalStore";
import styles from './Hover.module.scss'

export const HoverComponent = observer((props) => {
            const MeasuresData = useContext(MeasuresStore);
            const GlobalData = useContext(GlobalStore);

            if (!GlobalData.hoverIsVisible) {
                return ( < span > < /span>)
                }

                return ( <
                        span >
                        <
                        div className = {
                            styles.Hover_inspect
                        }
                        style = {
                            MeasuresData.inspectStyle ? toJS(MeasuresData.inspectStyle) : {
                                display: 'none'
                            }
                        } > < /div> <
                        span style = {
                            {
                                display: GlobalData.isTakingPrintScreen ? 'none' : ''
                            }
                        } > {
                            MeasuresData.showRulers ? ( <
                                span >
                                <
                                div className = {
                                    `${styles.Hover_border} ${styles.Hover_borderLeft}`
                                }
                                style = {
                                    MeasuresData.rulerLeft ? {
                                        left: MeasuresData.rulerLeft
                                    } : {}
                                } > < /div> <
                                div className = {
                                    `${styles.Hover_border} ${styles.Hover_borderRight}`
                                }
                                style = {
                                    MeasuresData.rulerRight ? {
                                        left: MeasuresData.rulerRight
                                    } : {}
                                } > < /div> <
                                div className = {
                                    `${styles.Hover_border} ${styles.Hover_borderTop}`
                                }
                                style = {
                                    MeasuresData.rulerTop ? {
                                        top: MeasuresData.rulerTop
                                    } : {}
                                } > < /div> <
                                div className = {
                                    `${styles.Hover_border} ${styles.Hover_borderBottom}`
                                }
                                style = {
                                    MeasuresData.rulerBottom ? {
                                        top: MeasuresData.rulerBottom
                                    } : {}
                                } > < /div> <
                                /span>
                            ) : null
                        } {
                            MeasuresData.showHover ? ( < div className = {
                                    styles.HoverBox
                                }
                                style = {
                                    MeasuresData.hoverStyle ? toJS(MeasuresData.hoverStyle) : {}
                                } > < /div>):null} {
                                    MeasuresData.divStyles.map((item, index) => {
                                                return ( < div style = {
                                                        toJS(item.wrapperStyle)
                                                    }
                                                    key = {
                                                        index
                                                    }
                                                    className = {
                                                        styles.hover_wrapper
                                                    } >
                                                    <
                                                    div style = {
                                                        toJS(item.innerStyle)
                                                    }
                                                    className = {
                                                        styles.hover_inner
                                                    } > {
                                                        item.text
                                                    } < /div> <
                                                    /div>)
                                                })
                                        } <
                                        /span> <
                                        /span>
                                );
                            });