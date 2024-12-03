import React, {
    useRef,
    useEffect
} from "react";
import NumberFormat from "react-number-format";

function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
        val = "0" + val;
    }

    if (val.length === 2) {
        if (Number(val) === 0) {
            val = "01";

            //this can happen when user paste number
        } else if (val > max) {
            val = max;
        }
    }

    return val;
}

function cardExpiry(val) {
    let month = limit(val.substring(0, 2), "12");
    let date = limit(val.substring(2, 4), "31");

    return month + (date.length ? "/" + date : "");
}

const NumberFormatComponent = (props) => {
    const firstElement = useRef(null);
    /*remove*/
    useEffect(() => {
        setTimeout(() => {
            if (props && props.selectMe) {
                props.selectMe({
                    currentTarget: firstElement.current
                }, 0, true);
                props.selectMe({
                    currentTarget: firstElement.current
                }, 0, false);
            }
        }, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); /*remove*/

    let props0 = { ...(props.multiComponent && props.multiComponent[0])
    };
    let props1 = { ...(props.multiComponent && props.multiComponent[1])
    };
    let props2 = { ...(props.multiComponent && props.multiComponent[2])
    };
    let props3 = { ...(props.multiComponent && props.multiComponent[3])
    };
    let props4 = { ...(props.multiComponent && props.multiComponent[4])
    };
    let props5 = { ...(props.multiComponent && props.multiComponent[5])
    };
    let props6 = { ...(props.multiComponent && props.multiComponent[6])
    };
    let props7 = { ...(props.multiComponent && props.multiComponent[7])
    };
    let props8 = { ...(props.multiComponent && props.multiComponent[8])
    };
    return ( <
        div >
        <
        Wrapper id = {
            0
        } { ...props
        } >
        <
        div className = "example"
        ref = {
            firstElement
        } >
        <
        h3 > Prefix and thousand separator: Format currency as text < /h3> <
        NumberFormat { ...props0
        }
        /> <
        /div> <
        /Wrapper>

        <
        Wrapper id = {
            1
        } { ...props
        } >
        <
        div className = "example" >
        <
        h3 > Format with pattern: Format credit card as text < /h3> <
        NumberFormat { ...props1
        }
        /> <
        /div> <
        /Wrapper>

        <
        Wrapper id = {
            2
        } { ...props
        } >
        <
        div className = "example" >
        <
        h3 > Prefix and thousand separator: Format currency in input < /h3> <
        NumberFormat { ...props2
        }
        /> <
        /div> <
        /Wrapper>

        <
        Wrapper id = {
            3
        } { ...props
        } >
        <
        div className = "example" >
        <
        h3 > Custom thousand separator: Format currency in input < /h3> <
        NumberFormat { ...props3
        }
        /> <
        /div> <
        /Wrapper>

        <
        Wrapper id = {
            4
        } { ...props
        } >
        <
        div className = "example" >
        <
        h3 > Format with pattern: Format credit card in an input < /h3> <
        NumberFormat { ...props4
        }
        /> <
        /div> <
        /Wrapper>

        <
        Wrapper id = {
            5
        } { ...props
        } >
        <
        div className = "example" >
        <
        h3 > Format with mask: Format credit card in an input < /h3> <
        NumberFormat { ...props5
        }
        /> <
        /div> <
        /Wrapper>

        <
        Wrapper id = {
            6
        } { ...props
        } >
        <
        div className = "example" >
        <
        h3 > Custom format method: Format credit card expiry time < /h3> <
        NumberFormat format = {
            cardExpiry
        } { ...props6
        }
        /> <
        /div> <
        /Wrapper> <
        Wrapper id = {
            7
        } { ...props
        } >
        <
        div className = "example" >
        <
        h3 > Format phone number < /h3> <
        NumberFormat { ...props7
        }
        /> <
        /div> <
        /Wrapper> <
        Wrapper id = {
            8
        } { ...props
        } >
        <
        div className = "example" >
        <
        h3 > Show mask on empty input < /h3> <
        NumberFormat { ...props8
        }
        /> <
        /div> <
        /Wrapper> <
        /div>
    );
};
export default NumberFormatComponent;

/*remove*/
const Wrapper = (props) => {
    return ( <
        span onClick = {
            (e) => {
                props.selectMe && props.selectMe(e, props.id);
            }
        }
        onMouseEnter = {
            (e) => {
                props.selectMe && props.selectMe(e, props.id, true);
            }
        }
        onMouseLeave = {
            (e) => {
                props.selectMe && props.unSelectMe(props.id);
            }
        } >
        {
            props.children
        } <
        /span>
    );
}; /*remove*/