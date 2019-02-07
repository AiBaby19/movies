import React, {Component} from 'react';
import './modal.css';

class Modal extends Component {

    state = {
       infoState: {}
    }


    editInfoToState = (e, infoState, key) => {
        if(key === 'Year' && key !== Number) {
            alert('numbers')
            e.currentTarget.value = '';
            return;
        }

        //!! USE REGEX

        infoState[key] = e.currentTarget.value;
        this.setState({ infoState });
    }

    renderMovieInfo = () => {
        let infoState = {}
        return Object
            .keys(this.props.movieInModal)
            .map(key => {
                if (key === 'imdbID' || key === 'Poster') {
                    //!! reconstruct it to be cleaner
                    return
                } else {
                    
                    infoState[key] = this.props.movieInModal[key];
                    infoState.imdbID = this.props.movieInModal.imdbID;
                    infoState.Poster = this.props.movieInModal.Poster;

                    return (
                        <div key={key} className="movie-info">
                            <b
                                style={{
                                textTransform: 'uppercase'
                            }}>{key}</b>: {this.state.infoState[key] ? this.state.infoState[key] : this.props.movieInModal[key]}
                            <input
                                type="text"
                                id="fields"

                                //!!FIX BELOW
                                className={this.state.infoState[key] && this.state.infoState[key] > 0 ? 'show-placeholder': null}
                                placeholder={`Edit ${key}`}
                                onChange={(e) => this.editInfoToState(e, infoState, key)}/>
                                {/* onChange={(e) => this.setState({infoState[key]: e.currentTarget.value})}/> */}
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
                            <img src={movie.Poster} alt={movie.Title} height="350" width="250"/>
                        </div>
                    </div>

                    <div className="saveCancelBtn">
                        <button className="btn" onClick={() => this.props.saveEditedInfo(this.state.infoState)}>SAVE</button>
                        <button className="btn btn-cancel" onClick={() => this.props.toggleModal()}>CANCEL</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;