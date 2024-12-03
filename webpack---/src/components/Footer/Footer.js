import React from "react";
// import { faPen, faHistory } from "@fortawesome/pro-light-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    observer
} from "mobx-react-lite";
// import ButtonBase from "@material-ui/core/ButtonBase";
// import { Share } from "./Share/Share";
// import GlobalStore from "../stores/GlobalStore";
// import CommentsStore from '../stores/CommentsStore';
// import Button from "@material-ui/core/Button";
// import { faArrowRight } from "@fortawesome/pro-light-svg-icons";

export const Footer = observer(function() {
            // const GlobalData = useContext(GlobalStore);
            // const CommentsData = useContext(CommentsStore);

            // const setHistory = () => {
            //   GlobalData.setTab("history");
            // };

            // const setEditor = () => {
            //   GlobalData.setTab("editor");
            // };

            // const goToSummary = ()=>{
            //   if(!CommentsData.emptyFromComments){
            //     GlobalData.setTab("summary");
            //   }
            // }

            return ( < span > < /span>)
                // return(<div className="Footer1">
                //     <Button
                //       variant="contained"
                //       color="primary"
                //       className={`Footer1_button ${CommentsData.emptyFromComments ? '': 'Footer1_buttonActive'}`}
                //       onClick={goToSummary}>
                //       Continue <FontAwesomeIcon icon={faArrowRight} className='SignUp_icon' />
                //     </Button>
                // </div>)

                // return (
                //   <div className='Footer'>
                //     <ButtonBase className='Footer_button'>
                //       <div
                //         className={`Footer_tab ${
                //           GlobalData.tab === "editor" ? 'Footer_selected' : null
                //         }`}
                //         onClick={setEditor}
                //       >
                //         <FontAwesomeIcon icon={faPen} className='Footer_icon' />
                //         <div className='Footer_text'>Editor</div>
                //       </div>
                //     </ButtonBase>
                //     <Share />
                //     <ButtonBase className='Footer_button'>
                //       <div
                //         className={`Footer_tab ${
                //           GlobalData.tab === "history" ? 'Footer_selected' : null
                //         }`}
                //         onClick={setHistory}
                //       >
                //         <FontAwesomeIcon icon={faHistory} className='Footer_icon' />
                //         <div className='Footer_text'>History</div>
                //       </div>
                //     </ButtonBase>
                //   </div>
                // );
            });