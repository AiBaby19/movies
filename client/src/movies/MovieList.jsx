import React, {Component} from 'react';
import SingleMovie from './singleMovie';
import './movieList.css'

class MovieList extends Component {
    state = {}

    renderMoviesList = () => {
        return this
            .props
            .movieList
            .map(({Title}) => {
                return (
                    <SingleMovie key={Title} title={Title} className=""/>
                )
            })
    }

    render() {
        console.log('movieList', this.props.movieList)
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