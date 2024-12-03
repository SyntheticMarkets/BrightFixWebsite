import React, {
    useContext
} from "react";
import {
    observer
} from "mobx-react-lite";
import HistoryStore from '../../../stores/HistoryStore'
import Button from "@material-ui/core/Button";
import {
    faArrowRight
} from "@fortawesome/pro-light-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import styles from './SummarySlider.module.scss'
export const SummarySlider = observer((props) => {
            const HistoryData = useContext(HistoryStore);

            const goToShare = () => {
                props.toggleShareOpen()
            }

            return ( <
                div className = {
                    styles.SummarySlider
                } >
                <
                div > < /div> <
                div className = {
                    styles.SummarySlider_wrapper
                } > {
                    /* {CommentsData.comments.map((item, index)=>{
                                index = index+1
                                return (<div className={`SummarySlider_task ${index === selected ? 'SummarySlider_taskSelected' : ''}`} key={item.id}>{index}</div>)
                              })} */
                } <
                /div> {
                    window.isAws || HistoryData.shareMode ? ( < div > < /div>) : (<Button
                        variant = "contained"
                        color = "primary"
                        className = {
                            `${styles.SummarySlider_button} ${props.buttonActive ? styles.SummarySlider_buttonActive : ''}`
                        }
                        onClick = {
                            goToShare
                        } >
                        Share & save < FontAwesomeIcon icon = {
                            faArrowRight
                        }
                        className = {
                            styles.SignUp_icon
                        }
                        /> <
                        /Button>)} <
                        /div>
                    );
                });