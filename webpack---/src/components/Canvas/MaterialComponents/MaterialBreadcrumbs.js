import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

export default (props) => {
    return ( < Breadcrumbs { ...props
        }
        style = {
            {
                color: 'rgb(120,120,120)'
            }
        } >

        <
        div >
        Material - UI <
        /div> <
        div >
        Core <
        /div> <
        div style = {
            {
                color: props.color
            }
        } >
        Breadcrumb <
        /div> <
        /Breadcrumbs>)
    }