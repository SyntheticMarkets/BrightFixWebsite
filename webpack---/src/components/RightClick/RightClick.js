import React from "react";
import {
    observer
} from "mobx-react-lite";
// import MeasuresStore from '../stores/MeasuresStore'
// import GlobalStore from '../stores/GlobalStore'
// import {Hover} from '../Hover/Hover'

export const RightClick = observer((props) => {
    // const MeasureData = useContext(MeasuresStore);
    // const GlobalData = useContext(GlobalStore);

    // const elementClicked = ()=>{
    //     Hover.clickedOnFixMeRightClick()
    // }

    return < > < />
    // let hide = (!MeasureData.contextMenuOpen && !GlobalData.isOpen)
    // // if(!MeasureData.contextMenuOpen && !GlobalStore.isOpen){
    // //     return(<span></span>)
    // // }

    // return (
    //     <span 
    //         onClick={elementClicked}
    //         className={`RightClick ${MeasureData.contextOpenPosition==='left' ? 'RightClickOpenToLeft' : ''}`}
    //         style={{top:`${MeasureData.contextY}px`, left: `${MeasureData.contextX}px`,display:hide ? 'none' : 'block'}}>
    //         <span className='RightClick_text'>Open FixMe! <span className="RightClick_textSmall">(Double-click)</span> </span>
    //         <span className="RightClick_emoji" role="img" aria-label="love">😍</span>
    //     </span>
    // );
})