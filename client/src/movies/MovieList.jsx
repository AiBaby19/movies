import React, {Component} from 'react';
import SingleMovie from './singleMovie';
import './movieList.css'

class MovieList extends Component {
    state = {}

    renderMoviesList = () => {
        return this
            .props
            .movieList
            .map(({Title, Poster, imdbID}) => {
                return (
                    <SingleMovie key={imdbID} togglePopUp={this.props.togglePopUp} toggleModal={this.props.toggleModal} imdbID={imdbID} title={Title} poster={Poster}/>
                )
            });
    }

    render() {
        return (
            <React.Fragment>
                <div className="movie-list ">
                    {this.renderMoviesList()}
                </div>
            </React.Fragment>
        );
    }
}

export default MovieList;