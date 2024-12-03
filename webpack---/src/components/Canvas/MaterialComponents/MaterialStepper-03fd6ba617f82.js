import React from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export default (props) => {
    const steps = props.steps

    return ( <
        Stepper { ...props
        } > {
            steps.map((item, index) => {
                return ( <
                    Step key = {
                        item.label
                    } >
                    <
                    StepLabel > {
                        item.label
                    } < /StepLabel> <
                    /Step>
                );
            })
        } <
        /Stepper>
    )
}