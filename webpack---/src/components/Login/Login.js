import React, {
    useState
} from "react";
import Input from "../Input/Input";
import {
    GlobalStoreClass
} from "../../stores/GlobalStore";
import {
    UserStoreClass
} from "../../stores/UserStore";
import {
    api,
    trackEvent
} from "../utils";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import styles from "./Login.module.scss";
import {
    CanvasStoreClass
} from "../../stores/CanvasStore";

export default function Login(props) {
    let [email, setEmail] = useState("");
    let [emailValidation, setEmailValidation] = useState("");

    let [password, setPassword] = useState("");
    let [passwordValidation, setPasswordValidation] = useState("");

    let [error, setError] = useState("");

    function validateEmail() {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
            setEmailValidation("");
            return true;
        } else {
            setEmailValidation("Email is not valid");
            return false;
        }
    }

    const validatePassword = () => {
        if (password.length > 0) {
            setPasswordValidation("");
            return true;
        } else {
            setPasswordValidation("Password is empty");
            return false;
        }
    };

    const Login = async () => {
        if (validateEmail() && validatePassword()) {
            try {
                let data = await api("userInfo/login", {
                    email,
                    password
                });

                if (data.session && data.email) {
                    UserStoreClass.setUser(data.session, data.email);

                    if (props.onCloseAfterSignUp) {
                        props.onCloseAfterSignUp(false);
                    } else {
                        GlobalStoreClass.setTab("editor", false);
                    }
                    GlobalStoreClass.setModalOpen("");
                    trackEvent(`login - success`);
                }
            } catch (e) {
                trackEvent(`login - server error`);
                let error;
                // eslint-disable-next-line react-hooks/exhaustive-deps
                if (!e || typeof e.error === "string") {
                    error = e.error;
                } else if (!e || typeof e.error !== "string") {
                    error = "Invalid error";
                } else {
                    error = "Invalid error";
                }

                if (e.error) {
                    setError(error);
                }
            }
        } else {
            trackEvent(`login - client error`);
        }
    };

    const onChange = (e, type) => {
        if (!e || !e.target || e.target.value === undefined) {
            return;
        }
        let newData = e.target.value;

        if (type === "email") {
            setEmail(newData);

            if (emailValidation) {
                setEmailValidation("");
            }
        } else if (type === "password") {
            setPassword(newData);

            if (passwordValidation) {
                setPasswordValidation("");
            }
        }
    };

    const detectEnter = (e) => {
        if (e.which === 13) {
            Login();
        }
    };

    const moveToSignUp = () => {
        GlobalStoreClass.setModalOpen("signUp");
    };

    const close = () => {
        CanvasStoreClass.sendCloseEvent();
        if (props.onClose) {
            props.onClose();
        } else {
            GlobalStoreClass.setModalOpen("");
        }
    };

    return ( <
        div className = {
            styles.wrapper
        } >
        <
        div className = {
            styles.box
        } >
        <
        div className = {
            styles.Login
        } >
        <
        FontAwesomeIcon icon = {
            faTimes
        }
        className = {
            styles.Login_close
        }
        onClick = {
            () => {
                close(false);
            }
        }
        /> <
        div className = {
            styles.Login_title
        } > Login < /div> <
        div className = {
            styles.Login_input
        } >
        <
        Input placeholder = "name@mycompany.com"
        type = "email"
        label = "Email"
        value = {
            email
        }
        invalid = {
            emailValidation
        }
        onKeyPress = {
            detectEnter
        }
        text = "Email:"
        onChange = {
            (e) => {
                onChange(e, "email");
            }
        }
        /> <
        /div> <
        div className = {
            styles.Login_input
        } >
        <
        Input placeholder = "Password"
        onKeyPress = {
            detectEnter
        }
        value = {
            password
        }
        invalid = {
            passwordValidation
        }
        label = "Password"
        type = "password"
        text = "Password:"
        onChange = {
            (e) => {
                onChange(e, "password");
            }
        }
        /> <
        /div> {
            error ? < div className = {
                    styles.Login_error
                } > {
                    error
                } < /div> : null} <
                div className = {
                    styles.SignUp_button
                }
            onClick = {
                    Login
                } >
                Login <
                /div> <
                div className = {
                    styles.Login_signUp
                } >
                Don 't have an account?{" "} <
                u className = {
                    styles.Login_signUpLink
                }
            onClick = {
                    moveToSignUp
                } >
                Sign Up <
                /u> <
                /div> <
                /div> <
                /div> <
                /div>
        );
    }