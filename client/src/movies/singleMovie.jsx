import React, {Component} from 'react';
import './singleMovie.css'

class SingleMovies extends Component {
    state = {}

    render() {
        // console.log('singlemovie imdbID', this.props.imdbID)

        return (
            <React.Fragment>
                <div className="movie-div">

                    <div className="inner-div">

                        <div className="img-div">
                            <img
                                src={this.props.poster}
                                alt={this.props.title}
                                style={{
                                width: '170px',
                                maxHeight: '220px'
                            }}/>
                        </div>

                        <div className="edit-btn-div" >
                            <button
                                className="edit-btn"
                                onClick={() => this.props.toggleModal(this.props.imdbID)}>EDIT</button>
                        </div>

                        <div className="exit-btn-div">
                            <button
                                className="close-btn"
                                onClick={() => this.props.deleteMovie(this.props.imdbID)}>X</button>
                        </div>

                    </div>

                    <h5>{this.props.title}</h5>

                </div>
            </React.Fragment>
        );
    }
}

export default SingleMovies;