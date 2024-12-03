import React, {
    useContext
} from "react";
import styles from "./Profile.module.scss";
import UserStore from "../../../stores/UserStore";
import {
    observer
} from "mobx-react-lite";

const Profile = observer(() => {
    const UserData = useContext(UserStore);
    const openSupport = () => {
        window.open("mailto:ender.jinno@gmail.com", "_blank");
    };
    const logout = () => {
        UserData.logout(false);
    };
    return ( <
        div className = {
            styles.Profile
        } >
        <
        div className = {
            styles.title
        } > Jinno chrome extension < /div> <
        div className = {
            styles.email
        } > Email: {
            UserData.email
        } < /div> <
        div className = {
            `${styles.item} ${styles.clickable}`
        }
        onClick = {
            openSupport
        } >
        <
        span > Support < /span> <
        /div> <
        div className = {
            `${styles.item} ${styles.clickable}`
        }
        onClick = {
            logout
        } >
        <
        span > Logout < /span> <
        /div> <
        /div>
    );
});

export default Profile;