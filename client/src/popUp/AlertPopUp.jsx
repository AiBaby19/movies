import React from 'react';
import './popup.css'

export default(props) => {
    return (
        <div className="popUp-div">
            <div className="alert-header">Alert!</div>
            <div className="inner-popup-div alert-inner-div">
                <p>{props.alertType}</p>
                <div className="btn-div">
                    <button className="btn alert-btn" onClick={() => props.toggleAlert()}>OK</button>
                </div>
            </div>
        </div>
    );
}
