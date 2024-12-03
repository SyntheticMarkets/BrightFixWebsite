import React from 'react'
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default (props) => {
    let data = props.data
    return ( < div > {
                data.map((item, index) => {
                        return ( < Accordion index = {
                                index
                            } { ...item
                            } >
                            <
                            AccordionSummary expandIcon = { < ExpandMoreIcon / >
                            }
                            aria - controls = "panel1a-content"
                            id = "panel1a-header" >
                            <
                            Typography > {
                                item.label
                            } < /Typography> <
                            /AccordionSummary> <
                            AccordionDetails >
                            <
                            Typography >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget. <
                            /Typography> <
                            /AccordionDetails> <
                            /Accordion>)
                        })
                } <
                /div>)
            }