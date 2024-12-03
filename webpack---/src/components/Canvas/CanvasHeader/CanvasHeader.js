import React, {
    useContext
} from "react";
import styles from "./CanvasHeader.module.scss";
import {
    observer
} from "mobx-react-lite";
import SearchStore from "../../../stores/SearchStore";
import CanvasStore from "../../../stores/CanvasStore";
import UserStore from "../../../stores/UserStore";
import Input from "../../Input/Input";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faChevronLeft
} from "@fortawesome/pro-light-svg-icons";
import CodeNpm from "../CodeHolder/CodeNpm/CodeNpm";
import {
    faTimes
} from "@fortawesome/pro-light-svg-icons";

let timeout;
const CanvasHeader = observer(() => {
    const SearchData = useContext(SearchStore);
    const CanvasData = useContext(CanvasStore);
    const UserData = useContext(UserStore);

    const back = () => {
        SearchData.setSearchOpen(true);
        SearchData.setSearch(SearchData.searchValue);
        CanvasData.setSelectComponent("");
    };

    const logout = () => {
        UserData.logout();
    };

    const clickEnter = (e) => {
        if (e.key === "Enter") {
            SearchData.setSearch(SearchData.searchValue);
        }
    };

    const changeSearch = (e, a) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            let newValue = e.target.value;

            if (newValue === "" && CanvasData.selectedComponentId) {
                SearchData.setSearchOpen(false);
            } else {
                SearchData.setSearch(newValue);
            }
        }, 200);
    };

    const toggleCode = () => {
        CanvasData.setCodeOpen();
    };

    const toggleOpen = () => {
        CanvasData.setCanvasOpen();
    };

    return ( <
        div className = {
            styles.header
        } >
        <
        div className = {
            styles.backHolder
        } > {!SearchData.searchOpen ? ( <
                div className = {
                    styles.backButton
                }
                onClick = {
                    back
                } >
                <
                FontAwesomeIcon className = {
                    styles.backIcon
                }
                icon = {
                    faChevronLeft
                }
                />
                Back <
                /div>
            ) : UserData.email ? ( <
                div className = {
                    styles.backButton
                }
                onClick = {
                    logout
                } > {
                    UserData.email ? "Logout" : "Login"
                } <
                /div>
            ) : null
        } <
        div className = {
            styles.getCode
        } > {!SearchData.searchOpen && !CanvasData.codeOpen ? ( <
                div className = {
                    `${styles.Canvas_get_code} ${
                CanvasData.codeOpen ? styles.Canvas_get_code_disabled : ""
              }`
                }
                onClick = {
                    toggleCode
                } >
                Get code <
                /div>
            ) : null
        } <
        /div> <
        /div> <
        Input data = {
            {
                value: ""
            }
        }
        searchIcon = {
            true
        }
        placeholder = "Search components"
        width = {
            200
        }
        onKeyPress = {
            clickEnter
        }
        onChange = {
            changeSearch
        }
        /> <
        div className = {
            styles.header_right
        } >
        <
        CodeNpm / > {!window.isAws ? ( <
                FontAwesomeIcon className = {
                    styles.CanvasClose
                }
                icon = {
                    faTimes
                }
                onClick = {
                    toggleOpen
                }
                />
            ) : null
        } <
        /div> <
        /div>
    );
});
export default CanvasHeader;