import React, {Component} from 'react';
import './popup.css'

class PopUp extends Component {
    state = {}
    render() {
        console.log('popsave', this.props.popSaveMovie)
        return (

                <div className="popUp-div">
                <div className="inner-popup-div">
                    <p>Are you sure you want to <span><b style={{fontWeight: '700'}}>DELETE</b></span> this movie?</p>
                    <div className="btn-div">
                        <button className="btn" onClick={() => this.props.deleteMovie(this.props.imdbDelete)}>CONFIRM</button>
                        <button className="btn btn-cancel" onClick={() => this.props.togglePopUp()}>CANCEL</button>
                    </div>
                    </div>
                </div>
            // </div>
        );
    }
}

export default PopUp;