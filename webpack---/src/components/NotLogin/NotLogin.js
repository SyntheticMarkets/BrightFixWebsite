import React, {
    useContext
} from "react";
import styles from "./NotLogin.module.scss";
import UserStore from "../../stores/UserStore";
import {
    observer
} from "mobx-react-lite";

const NotLogin = observer(() => {
    const UserData = useContext(UserStore);
    let isLogin = UserData.email ? true : false;
    if (isLogin) {
        return < > < />;
    }
    return ( <
        div className = {
            styles.wrapper
        } >
        <
        div className = {
            styles.text
        } >
        Login or SignUp through the Chrome extension inorder to use Jinno <
        /div> <
        /div>
    );
});
export default NotLogin;