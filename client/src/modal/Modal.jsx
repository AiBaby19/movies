import React, {Component} from 'react';
import './modal.css';

class Modal extends Component {
    constructor() {
        super();
    }
    state = {}
    render() {
        // console.log('movieInModal', this.props.movieInModal)
        const movie = this.props.movieInModal
        return (
            <React.Fragment>
                <div className="modal-div">
                    <button className="exit-btn" onClick={() => this.props.toggleModal()}>X</button>
                    <div className="content">
                        <div className="written-content">
                            {/* <div>IMDB ID: {movie.imdbID}</div>
                            <div>Title: {movie.Title}</div>
                            <div>Year: {movie.Year}</div>
                            <div>RunTime: {movie.RunTime}</div>
                            <div>Genre: {movie.Genre}</div>
                            <div>Director: {movie.Director}</div> */}
                        </div>
                        <div className="img-content"></div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default Modal;