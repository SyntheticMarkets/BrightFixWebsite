import React, {
    useContext
} from "react";
// import { Comment } from "../Comment/Comment";
// import Fab from "@material-ui/core/Fab";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentsStore from "../../stores/CommentsStore";
// import GlobalStore from "../stores/GlobalStore";
import {
    observer
} from "mobx-react-lite";
// import { faMapMarkerEdit } from "@fortawesome/pro-solid-svg-icons";
// import styles from './Comments.module.scss'

export const Comments = observer((props) => {
    const CommentsData = useContext(CommentsStore);
    // const GlobalData = useContext(GlobalStore);

    if (CommentsData.hideAll) {
        return <span > < /span>;
    }

    // const toggleIsOpen = (data) => {
    //   CommentsData.setOpen(data.title, !data.open);
    // };

    return < > < />
    // return (
    //     <span>
    //         {CommentsData.comments.map((item, index) => {
    //           let style = {
    //             position: item.position,
    //             top: item.top,
    //             left: item.left,
    //             zIndex: item.open ? 200001 : 200000,
    //             display: GlobalData.isTakingPrintScreen && GlobalData.isTakingPrintScreen !=='printScreen' ? 'none' : 'flex'
    //           };

    //           let openToBottom = item.commentWrapper && item.commentWrapper.openToBottom ? styles.comments_commentBottom : '';
    //           let openToLeft = item.commentWrapper && item.commentWrapper.openToLeft ? styles.comments_commentLeft : ''
    //           return (
    //             <div className={`${styles.comments_comment} ${openToLeft} ${openToBottom}`} style={style} key={item.title}>
    //               <Fab
    //                 size="small"
    //                 aria-label="add"
    //                 className={styles.comments_floatingButton}
    //                 onClick={() => {
    //                   toggleIsOpen(item);
    //                 }}>
    //                 <FontAwesomeIcon icon={faMapMarkerEdit} className={styles.comments_icon} />
    //               </Fab>
    //               {item.open ? (
    //                 <div className={styles.comments_box}>
    //                   <Comment data={item} close={true} fromComments={true} />
    //                 </div>
    //               ) : null}
    //             </div>
    //           );
    //         })}

    //         {CommentsData.comments.map((item, index) => {
    //           if (item.commentWrapper && item.visible) {
    //             let style = {
    //               height: item.commentWrapper.height,
    //               width: item.commentWrapper.width,
    //               top: item.commentWrapper.top,
    //               left: item.commentWrapper.left,
    //               // display: item.commentWrapper.display,
    //               position: item.commentWrapper.position,
    //             };

    //             return (
    //               <div
    //                 className={styles.comments_commentWrapper}
    //                 style={style}
    //                 key={index}></div>
    //             );
    //           } else {
    //             return null;
    //           }
    //         })}
    //     </span>
    // );
});