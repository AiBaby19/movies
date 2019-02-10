import React from 'react';
import MovieList from '../movies/MovieList';
import './home.css'

export default(props) => {
    return (

        <div className="home-container">
            <div className="opacity">
                <div className="home-headline-div">
                    <h1 className="home-headline">Find A Movie</h1>
                </div>
                

                <MovieList
                    toggleModal={props.toggleModal}
                    movieList={props.movieList}
                    togglePopUp={props.togglePopUp}
                    fullMovieInfo={props.fullMovieInfo}/>
            </div>
        </div>
    );
};