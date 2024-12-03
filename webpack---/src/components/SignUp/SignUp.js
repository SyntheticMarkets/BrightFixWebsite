import React, {
    useState,
    useRef
} from "react";
import Input from "../Input/Input";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    SelectWrapper
} from "../SelectWrapper/SelectWrapper";
import {
    GlobalStoreClass
} from "../../stores/GlobalStore";
import {
    api,
    trackEvent
} from "../utils";
import {
    UserStoreClass
} from "../../stores/UserStore";
import styles from "./SignUp.module.scss";
import background from "./background1.svg";
import variables from "../../variables";
import {
    CanvasStoreClass
} from "../../stores/CanvasStore";

let roles = {
    value: "none",
    list: [{
            value: "none",
            name: "Choose a role"
        },
        {
            value: "designer",
            name: "Designer"
        },
        {
            value: "developer",
            name: "Developer"
        },
        {
            value: "qa",
            name: "QA Tester"
        },
        {
            value: "marketing",
            name: "Marketing / sells"
        },
        {
            value: "product",
            name: "Product manager"
        },
    ],
};
let interval;
export default function SignUp(props) {
    const passwordRef = useRef(null);
    const [loading, setLoading] = useState(false);
    // const [firstStep, setFirstStep] = useState(true);

    let [showAllInputs, setAllInputs] = useState(true);

    let [email, setEmail] = useState("");
    let [emailValidation, setEmailValidation] = useState("");

    let [password, setPassword] = useState("");
    let [passwordValidation, setPasswordValidation] = useState("");

    let [roleValue, setRoleValue] = useState("none");

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
        if (password.length >= 6) {
            setPasswordValidation("");
            return true;
        } else {
            setPasswordValidation("Password must be more then 6 letters");
            return false;
        }
    };

    const startLoadin = () => {
        setLoading("loading");
        let loadingText = "loading";
        interval = setInterval(() => {
            if (loadingText === "loading") {
                loadingText = "loading.";
                setLoading(loadingText);
            } else if (loadingText === "loading.") {
                loadingText = "loading..";
                setLoading(loadingText);
            } else if (loadingText === "loading..") {
                loadingText = "loading...";
                setLoading(loadingText);
            } else if (loadingText === "loading...") {
                loadingText = "loading";
                setLoading(loadingText);
            }
        }, 300);
    };

    const stopLoading = () => {
        clearInterval(interval);
        setLoading(false);
    };
    const signUp = async () => {
        // if (!showAllInputs) {
        startLoadin();
        trackEvent(`signup - click continue1`);
        if (!validateEmail()) {
            stopLoading();
            return;
        }
        trackEvent(`signup - write email`);

        setAllInputs(true);
        // setTimeout(() => {
        //   passwordRef.current.focus();
        // }, 100);
        // return;
        // } else if (validateEmail() && validatePassword()) {
        if (!validatePassword()) {
            stopLoading();
            return;
        }
        try {
            let source = localStorage.source;
            if (!source && window.isAws) {
                source = "jinno.io";
            } else if (!source) {
                source = variables.env;
            }

            let data = await api("userInfo/register", {
                email,
                password,
                role: roleValue,
                source,
            });
            setError("");

            if (data && data.session && data.email) {
                UserStoreClass.setUser(data.session, data.email);
            }

            trackEvent(`signup success`);
            GlobalStoreClass.setModalOpen("");
            // if (props.onCloseAfterSignUp) {
            //   props.onCloseAfterSignUp(false);
            // } else {
            //   GlobalStoreClass.setTab("editor", false);
            // }
            // GlobalStoreClass.toggleShareOpen(true,false)
        } catch (e) {
            if (e && typeof e.error === "string") {
                trackEvent(`signup - server error`);

                setError(e.error);
            }
            // }
        } // else {
        trackEvent(`signup - client error`);
        stopLoading();
        // }
    };

    const onChange = (e, type) => {
        if (type !== "role" && (!e || !e.target || e.target.value === undefined)) {
            return;
        }
        let newData = type === "role" ? e : e.target.value;

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
        } else if (type === "role") {
            setRoleValue(newData);
        }
        // else if(type === 'name'){
        //     setName(newData)
        // }
    };

    const detectEnter = (e) => {
        if (e.which === 13) {
            signUp();
        }
    };

    const moveToLoginPage = () => {
        GlobalStoreClass.setModalOpen("login");
    };

    const close = () => {
        GlobalStoreClass.setModalOpen("firstSignUp");
        CanvasStoreClass.sendCloseEvent();
    };

    // const moveToSecondStep = () => {
    //   setFirstStep(false);
    // };

    return ( <
        div className = {
            styles.wrapper
        } >
        <
        div style = {
            {
                background: `url(${background})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                // backgroundPosition: "bottom",
            }
        }
        className = {
            styles.background
        } >
        < /div> <
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
        } > Signup to Jinno < /div> <
        div className = {
            styles.SignUp_input
        } >
        <
        Input placeholder = "name@mycompany.com"
        type = "email"
        labelClassName = {
            styles.inputLabel
        }
        value = {
            email
        }
        label = "Email"
        leftTop = {
            true
        }
        editable = {
            false
        }
        invalid = {
            emailValidation
        }
        onKeyPress = {
            detectEnter
        }
        text = "What's your work email?"
        onChange = {
            (e) => {
                onChange(e, "email");
            }
        }
        /> <
        /div> {
            showAllInputs ? ( <
                span >
                <
                div className = {
                    styles.SignUp_input
                } >
                <
                Input placeholder = "Write a secure password"
                onKeyPress = {
                    detectEnter
                }
                leftTop = {
                    true
                }
                editable = {
                    false
                }
                labelClassName = {
                    styles.inputLabel
                }
                inputRef = {
                    passwordRef
                }
                invalid = {
                    passwordValidation
                }
                type = "password"
                label = "Password"
                text = "Pick a password"
                onChange = {
                    (e) => {
                        onChange(e, "password");
                    }
                }
                /> <
                /div> {
                    password.length && false ? ( <
                        div className = {
                            styles.SignUp_input
                        } >
                        <
                        SelectWrapper data = {
                            roles
                        }
                        value = {
                            roleValue
                        }
                        label = "Role"
                        // style={"regular"}
                        onChange = {
                            (e) => {
                                onChange(e, "role");
                            }
                        }
                        /> <
                        /div>
                    ) : null
                } <
                /span>
            ) : null
        } {
            error ? < div className = {
                    styles.SignUp_error
                } > {
                    error
                } < /div> : null} <
                div className = {
                    styles.SignUp_button
                }
            onClick = {
                    signUp
                } > {!loading ? "Sign up" : loading
                } <
                /div> <
                div className = {
                    styles.SignUp_login
                } >
                Already have an account ? {
                    " "
                } <
                u className = {
                    styles.SignUp_loginUpLink
                }
            onClick = {
                    moveToLoginPage
                } >
                Log in
                <
                /u> <
                /div> <
                /div> <
                /div> <
                /div>
        );
    }