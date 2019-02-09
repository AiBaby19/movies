import React from 'react';
import './popup.css'

export default(props) => {

    const saveOrDelete = () => {
        if (props.saveOrDelete === 'delete') {
            props.deleteMovie();
        }
        if (props.saveOrDelete === 'save') {
            props.saveEditedInfo();
        }
    };

    return (
        <div className="popUp-div">
            <div className="inner-popup-div">
                <p>Are you sure you want to
                    <span>
                        <b
                            style={{
                            fontWeight: '700'
                        }}> {props.saveOrDelete} </b>
                    </span>
                    this movie?</p>
                <div className="btn-div">
                    <button className="btn" onClick={() => saveOrDelete()}>CONFIRM</button>
                    <button className="btn btn-cancel" onClick={() => props.togglePopUp()}>CANCEL</button>
                </div>
            </div>
        </div>
    );
};
