import React, {Component} from 'react';
import './modal.css';

class Modal extends Component {
    constructor() {
        super();
    }
    state = {}

    renderMovieInfo = () => {
        return Object
            .keys(this.props.movieInModal)
            .map(key => {
                if (key === 'imdbID' || key === 'poster') {
                    //!! reconstruct it to be cleaner
                    return
                } else {
                    return (
                        <div key={key} className="movie-info">
                            <b
                                style={{
                                textTransform: 'uppercase'
                            }}>{key}</b>: {this.state[key].length === 0 ? this.props.movieInModal[key] : this.state[key]}
                            <input
                                type="text"
                                id="fields"
                                className={this.state[key]
                                ? 'show-placeholder'
                                : null}
                                placeholder={`Edit ${key}`}
                                onChange={(e) => this.setState({[key]: e.currentTarget.value})}/>
                        </div>
                    )
                }
            })
    }

    render() {

        const movie = this.props.movieInModal

        return (
            <React.Fragment>
                <div className="modal-div">
                    <button className="exit-btn" onClick={() => this.props.toggleModal()}>X</button>

                    <div className="content-div">
                        <div className="written-content">
                            <div>
                                <b>IMDB ID</b>: {movie.imdbID}
                            </div>
                            {this.renderMovieInfo()}
                        </div>

                        <div className="img-content">
                            <img src={movie.poster} alt={movie.title} height="350" width="250"/>
                        </div>
                    </div>

                    <div className="saveCancelBtn">
                        <button className="btn">SAVE</button>
                        <button className="btn btn-cancel">CANCEL</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;