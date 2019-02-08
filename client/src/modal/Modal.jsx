import React, {Component} from 'react';
import './modal.css';


class Modal extends Component {
  state = {}
   
    componentDidMount(){
        setTimeout(() => {this.setState({...this.props.movieInModal})},500)
          
     
      }


    cleanUpEditeText = (e, editedText, key) => {
        if (key !== 'Poster' || key !== 'imdbID' || key !== 'Year') {
            let verifiedText = e
                .currentTarget
                .value
                .replace(/[^a-z0-9]/gmi, " ")
                .toLowerCase()
                .split(' ')
                .map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1))
                .join(' ');

            editedText[key] = verifiedText || editedText[key];
            
        };

        this.setState((prevState) => ({
                [key]: editedText[key],
            ...prevState.state
            })
        );
    };


    renderMovieInfo = () => {
        let editedText = {}

       return Object
            .keys(this.props.movieInModal)
            .map(key => {
                if (key === 'imdbID' || key === 'Poster') {
                    //!! reconstruct it to be cleaner
                    return
                } else {

                    editedText[key] = this.props.movieInModal[key];

                    //hard coded and not rendered to text & cannot be edited
                    editedText.imdbID = this.props.movieInModal.imdbID;
                    editedText.Poster = this.props.movieInModal.Poster;

                    return (
                        <div key={key} className="movie-info">
                            <b
                                style={{
                                textTransform: 'uppercase'
                            }}>{key}</b>: {this.state[key]
                                ? this.state[key]
                                : this.props.movieInModal[key]}
                            <input
                                type="text"
                                id="fields"
                                placeholder={`Edit ${key}`}
                                onChange={(e) => this.cleanUpEditeText(e, editedText, key)}/>

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
                        <button
                            className="btn"
                            onClick={() => this.props.verifyEditedInfo(this.state)}>SAVE</button>
                        <button className="btn btn-cancel" onClick={() => this.props.toggleModal()}>CANCEL</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;