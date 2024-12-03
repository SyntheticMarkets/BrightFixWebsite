import React, {
    useContext
} from "react";
import {
    observer
} from "mobx-react-lite";
// import styles from "./Area.module.scss";
import AreaStore from "../../stores/AreaStore";
import styles from './Area.module.scss'

export const Area = observer((props) => {
    const areaData = useContext(AreaStore);

    if (!areaData.visible) {
        return <div / > ;
    }

    return ( <
        div style = {
            {
                height: areaData.height,
                width: areaData.width,
                top: areaData.top,
                left: areaData.left,
            }
        }
        className = {
            `${styles.Area} ${areaData.isPadding ? styles.Area_padding : ""}`
        }
        />
    );
});