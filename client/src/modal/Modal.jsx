import React, {Component} from 'react';
import './modal.css';

class Modal extends Component {
    state = {}
    render() {
        console.log('movieList', this.props.movieList)
        return (
            <React.Fragment>
                <div className="modal-div">
                    <button className="exit-btn" onClick={() => this.props.toggleModal()}>X</button>
                    <div className="content">
                        <div className="written-content">
                            <div>imdbDB</div>
                            <div>Title</div>
                            <div>Year</div>
                            <div>RunTime: 125min</div>
                            <div>Genre</div>
                            <div>Director</div>
                        </div>
                        <div className="img-content"></div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default Modal;