import React from 'react';

import './header.styl'

// const MusicHeader=({title})=>{
//     return(
//         <div className="music-header">
//             <span
//                 className="header-back"
//                 onClick={()=>{
//                     window.history.back()
//                 }}
//             >
//                 <i className="icon-back"></i>
//             </span>
//             <div className="header-title">
//                 {title}
//             </div>
//         </div>
//     )
// }

class MusicHeader extends React.Component {
    render() {
        let {title} = this.props;
        return (<div className="music-header">
            <span
                className="header-back"
                onClick={() => {
                    window.history.back()
                }}
            >
                <i className="icon-back"></i>
            </span>
            <div className="header-title">
                {title}
            </div>
        </div>)
    }
}

export default MusicHeader;


