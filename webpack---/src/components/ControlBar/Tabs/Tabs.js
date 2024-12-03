import React, {
    useContext
} from "react";
import Tab from "./Tab/Tab";
import styles from "./Tabs.module.scss";
import TabsStore from "../../../stores/TabsStore";
import {
    observer
} from "mobx-react-lite";

const Tabs = observer(() => {
    const TabsData = useContext(TabsStore);

    // if (!TabsData.isJinnoActive) {
    return < > < />;
    // }

    return ( <
        div className = {
            styles.tabs
        } > {
            TabsData.tabs.map((item, index) => {
                return <Tab key = {
                    item.id
                }
                id = {
                    item.id
                }
                />;
            })
        } <
        /div>
    );
});
export default Tabs;