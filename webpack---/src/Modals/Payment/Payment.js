import React from "react";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import styles from "./Payment.module.scss";
import {
    GlobalStoreClass
} from "../../stores/GlobalStore";

export default function Payment(props) {
    const navigateToVsCode = () => {
        const url =
            "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-8Y178389U7933363NM2PBWEA";
        if (window.vscode) {
            window.vscode.postMessage({
                command: "openInBrowser",
                url
            });
        } else {
            window.open(url);
        }
        // window.open(
        //   "https://www.sandbox.paypal.com/webapps/billing/plans/subscribe?plan_id=P-7GW59029LW784704MMXYFJQY&notify_url==https://google.com"
        // );
    };

    const close = () => {
        GlobalStoreClass.setShowPaymentModal(false);
    };

    return ( <
        div className = {
            styles.wrapper
        } >
        <
        div className = {
            styles.background
        } > < /div> <
        div className = {
            styles.box
        } >
        <
        div className = {
            styles.SignUp
        } >
        <
        FontAwesomeIcon icon = {
            faTimes
        }
        className = {
            styles.SignUp_close
        }
        onClick = {
            close
        }
        /> <
        div className = {
            styles.SignUp_title
        } > Upgrade to premium plan < /div> <
        div className = {
            styles.SignUp_subtitle
        } >
        <
        span > 18.99 $ < /span> per month <
        /div> <
        div className = {
            styles.SignUp_button
        }
        onClick = {
            navigateToVsCode
        } >
        Subscribe - $18 .99 per month <
        /div> <
        div className = {
            styles.table
        } >
        <
        div className = {
            styles.row
        } > Premium plan < /div> <
        div className = {
            styles.row
        } > Unlimited chats < /div> <
        /div> <
        div className = {
            styles.support
        } >
        If you need any support help you can email to this address {
            " "
        } <
        a href = "mailto:ender.jinno@gmail.com" > ender.jinno @gmail.com < /a> <
        /div> <
        /div> <
        /div> <
        /div>
    );
}