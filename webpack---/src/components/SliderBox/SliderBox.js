import React from "react";
import Slider from '@material-ui/core/Slider';
import styles from './SliderBox.module.scss'

export function SliderBox(props) {
    const onChange = (event, newValue) => {
        props.onChange(event, newValue);
    };

    const changeKind = () => {
        props.onSelectChange(props.specialKind.value);
    };

    return ( <
        div className = {
            `${styles.SliderBox} ${
        props.right ? styles.SliderBox_Right : ""
      }`
        } >
        <
        div className = {
            styles.SliderBox_sliderWrapper
        } >
        <
        div className = {
            styles.SliderBox_slider
        } >
        <
        Slider min = {
            0
        }
        max = {
            100
        }
        onChange = {
            onChange
        }
        style = {
            {
                color: "rgb(38,100,251)"
            }
        }
        value = {
            props.value
        }
        aria - labelledby = "input-slider" /
        >
        <
        /div> <
        input type = {
            props.type
        }
        className = {
            styles.SliderBox_input
        }
        onChange = {
            props.onChange
        }
        value = {
            props.value
        }
        /> <
        /div> <
        div className = {
            styles.SliderBox_buttonsHolder
        } >
        <
        div className = {
            styles.SliderBox_smallButtons
        } >
        <
        div className = {
            `${styles.SliderBox_buttons} ${styles.SliderBox_borderBottom}`
        } >
        <
        div className = {
            `${styles.SliderBox_button} ${styles.SliderBox_borderRight}`
        }
        onClick = {
            onChange.bind(null, null, 0)
        } >
        0 <
        /div> <
        div className = {
            `${styles.SliderBox_button} ${styles.SliderBox_borderRight}`
        }
        onClick = {
            onChange.bind(null, null, 10)
        } >
        10 <
        /div> <
        div className = {
            `${styles.SliderBox_button} ${styles.SliderBox_borderRight}`
        }
        onClick = {
            onChange.bind(null, null, 20)
        } >
        20 <
        /div> <
        div className = {
            styles.SliderBox_button
        }
        onClick = {
            onChange.bind(null, null, 40)
        } >
        40 <
        /div> <
        /div> <
        div className = {
            styles.SliderBox_buttons
        } >
        <
        div className = {
            `${styles.SliderBox_button} ${styles.SliderBox_borderRight}`
        }
        onClick = {
            onChange.bind(null, null, 60)
        } >
        60 <
        /div> <
        div className = {
            `${styles.SliderBox_button} ${styles.SliderBox_borderRight}`
        }
        onClick = {
            onChange.bind(null, null, 100)
        } >
        100 <
        /div> <
        div className = {
            `${styles.SliderBox_button} ${styles.SliderBox_borderRight}`
        }
        onClick = {
            onChange.bind(null, null, 140)
        } >
        140 <
        /div> <
        div className = {
            styles.SliderBox_button
        }
        onClick = {
            onChange.bind(null, null, 220)
        } >
        220 <
        /div> <
        /div> <
        /div> {
            props.specialKind ? ( <
                div className = {
                    `${styles.SliderBox_button} ${styles.SliderBox_bigButton}`
                }
                onClick = {
                    changeKind
                } >
                {
                    props.specialKind.name
                } <
                /div>
            ) : null
        } <
        /div> <
        /div>
    );
}