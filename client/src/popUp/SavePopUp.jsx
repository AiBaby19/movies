import React, {Component} from 'react';
import './popup.css'

class SavePopUp extends Component {
    state = {}
    render() {
        return (

                <div className="popUp-div">
                <div className="inner-popup-div">
                    <p>Are you sure you want to <span><b style={{fontWeight: '700'}}>SAVE</b></span> this movie?</p>
                    <div className="btn-div">
                        <button className="btn" onClick={() => this.props.saveEditedInfo()}>CONFIRM</button>
                        <button className="btn btn-cancel" onClick={() => this.props.toggleSavePopUp()}>CANCEL</button>
                    </div>
                    </div>
                </div>
            // </div>
        );
    }
}

export default SavePopUp;