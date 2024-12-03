import React from "react";
// import { GlobalStoreClass } from "../../stores/GlobalStore";
// import styles from "./CallToAction.module.scss";
import {
    observer
} from "mobx-react-lite";
// import UserStore from "../../stores/UserStore";
// import { trackEvent } from "../../utils";
// import classNames from "classnames";
// import CanvasStore from "../../stores/CanvasStore";
// import SearchStore from "../../stores/SearchStore";

export default observer(() => {
    // const UserData = useContext(UserStore);
    // const CanvasData = useContext(CanvasStore);
    // const SearchData = useContext(SearchStore);
    // const componentId =
    //   CanvasData.components &&
    //   CanvasData.components[0] &&
    //   CanvasData.components[0].typeId
    //     ? CanvasData.components[0].typeId
    //     : null;

    // const [alreadyAdded, setAlreadyAdded] = useState(false);

    // useEffect(() => {
    //   let findComponent = SearchData.myComponentsList && SearchData.myComponentsList.find(
    //     (item) => item.typeId === componentId
    //   );

    // if (findComponent) {
    //   setAlreadyAdded(true);
    // } else {
    //   setAlreadyAdded(false);
    // }
    // }, [SearchData.myComponentsList, CanvasData.components]);

    // const openSignUp = async () => {
    //   if (!UserData.email) {
    //     //open the signup
    //     GlobalStoreClass.setModalOpen("firstSignUp");
    //     // trackEvent('CallToAction - open first signup1')
    //   } else if (!alreadyAdded) {
    //     trackEvent('CallToAction - add component')
    //     SearchData.addToMyComponents(componentId);
    //     setAlreadyAdded(true);
    //   } else {
    //     trackEvent("CallToAction - remove component");
    //     SearchData.removeFromMyComponents(componentId);
    //     setAlreadyAdded(false);
    //   }
    // };

    // if (!UserData.email) {
    return < > < />
    // }
    // return (
    //   <div
    //     className={classNames(styles.button, {
    //       [styles.buttonDisabled]: alreadyAdded,
    //     })}
    //     onClick={openSignUp}
    //   >
    //     {alreadyAdded ? `Remove from my components` : `Add to my components`}
    //   </div>
    // );
});