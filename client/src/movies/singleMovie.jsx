import React from 'react';
import './singleMovie.css'

export default(props) => {
    return (
        <div className="movie-div">
            <div className="inner-div">
                <div className="img-div">
                {console.log(props.poster)}
                    <img
                        src={props.poster}
                        alt={props.title}
                        style={{
                        width: '170px',
                        maxHeight: '220px'
                    }}/>
                </div>

                <div className="edit-btn-div">
                    <button className="edit-btn" onClick={() => props.toggleModal(props.imdbID)}>EDIT</button>
                </div>

                <div className="exit-btn-div">
                    <button className="close-btn" onClick={() => props.togglePopUp(props.imdbID, "delete")}>X</button>
                </div>

            </div>

            <h5>{props.title}</h5>

        </div>
    );
};
