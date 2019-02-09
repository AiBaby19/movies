import React from 'react';
import MovieList from '../movies/MovieList';
import './home.css'

export default(props) => {
    return (
        <div className="home-container">
            <h1 className="home-headline">New Releases</h1>
            <MovieList
                toggleModal={props.toggleModal}
                movieList={props.movieList}
                togglePopUp={props.togglePopUp}
                fullMovieInfo={props.fullMovieInfo}/>
        </div>
    );
};