import React, {
    useEffect,
    useState
} from "react";
import Slider from "@material-ui/core/Slider";
// import Jinno from "jinno";
import variables from "../../../variables";

const SliderDemo = (props) => {
    const [value, setValue] = useState(props.value);
    let style = {
        color: props.color
    };

    useEffect(() => {
        if (props.value !== value) {
            setValue(props.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value ? props.value : ""]);

    const onChange = (e, newValue) => {
        setValue(newValue);
    };

    return ( <
        div style = {
            props.orientation === "vertical" ? {
                height: "200px"
            } : {}
        } >
        <
        Slider style = {
            style
        } { ...props
        }
        value = {
            value
        }
        onChange = {
            onChange
        }
        /> <
        /div>
    );
};

export default SliderDemo;
/*remove*/
// if (variables.env === "web" && variables.isDev) {
//     Jinno(Slider, "Slider");
// }
/*remove*/