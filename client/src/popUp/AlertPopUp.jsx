import React, {Component} from 'react';
import './popup.css'

class AlertPopUp extends Component {
    state = {}
    render() {
      console.log(this.props.alertType)
        return (
                
                <div className="popUp-div">
                <div className="alert-header">Alert!</div>
                <div className="inner-popup-div alert-inner-div">
                    <p>{this.props.alertType}</p>
                    <div className="btn-div">
                        <button className="btn alert-btn" onClick={() => this.props.toggleAlert()}>OK</button>
                    </div>
                    </div>
                </div>
        );
    }
}

export default AlertPopUp;