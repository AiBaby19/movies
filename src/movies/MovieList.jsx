import React from 'react';
import SingleMovie from './singleMovie';
import './movieList.css'

export default(props) => {

    const renderMoviesList = () => {
        return props
            .movieList
            .map(({Title, Poster, imdbID}) => {
                return (<SingleMovie
                    key={imdbID}
                    togglePopUp={props.togglePopUp}
                    toggleModal={props.toggleModal}
                    imdbID={imdbID}
                    title={Title}
                    poster={Poster === 'N/A'
                    ? '/blank.png'
                    : Poster}/>)
            });
    };

    return (
            <div className="movie-list-parent">
                <div className="movie-list ">
                    {renderMoviesList()}
                </div>
            </div>
    );
};
