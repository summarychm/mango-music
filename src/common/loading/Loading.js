import React from 'react';
import loadingImg from './loading.gif';
import './loading.styl';

const Loading = ({show, title}) => {
    return (
        <div
            className="loading-container"
            style={show ? {display: ""} : {display: "none"}}
        >
            <div className="loading-wrapper">
                <img
                    src={loadingImg} alt="loading"
                    width="18px" height="18px"
                />
                <div className="loading-title">
                    {title}
                </div>
            </div>
        </div>
    )
}

export default Loading;


