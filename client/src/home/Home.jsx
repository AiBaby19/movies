import React, {Component} from 'react';
import Axios from 'axios';
import MovieList from '../movies/MovieList';
import './home.css'

// const apiKey = '3c722a44';

class Home extends Component {
    state = {
        
    }

    render() {
        return (
            <React.Fragment>
                <div className="home-container">
                    <h1 className="home-headline">New Releases</h1>

                    <MovieList toggleModal={this.props.toggleModal} movieList={this.props.movieList} deleteMovie={this.props.deleteMovie} fullMovieInfo={this.props.fullMovieInfo}/>

                </div>
            </React.Fragment>
        );
    }
}

export default Home;