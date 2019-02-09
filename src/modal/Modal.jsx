import React, {Component} from 'react';
import './modal.css';

class Modal extends Component {

    state = {};

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                ...this.props.movieInModal
            })
        }, 500)
    }

    //render each movie filed and add an onchange event to each field
    renderMovieInfo = () => {
        let editedText = {}
        // console.log(this.props.movieInModal)

        this.props.movieInModal.Poster === "N/A" ? editedText.Poster ='/resources/img/Blank.png' : editedText.Poster = this.props.movieInModal.Poster
        ;
        console.log(this.props.movieInModal)
        return Object
            .keys(this.props.movieInModal)
            .map(key => {
                if (key === 'imdbID' || key === 'Poster') {
                    return;
                } else {
                    editedText[key] = this.props.movieInModal[key];

                    //hard coded and not rendered to text & cannot be edited
                    editedText.imdbID = this.props.movieInModal.imdbID;
                    


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
                                onChange={(e) => this.cleanUpEditedText(e, editedText, key)}/>
                        </div>
                    )
                };
            });
    };

    //STARTING EDITED INFO VERIFYING SEQUENCE
    cleanUpEditedText = (e, editedText, key) => {
        console.log(this.props.editedText)
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
        }));
    };

    verifyEditedInfo = () => {
        const cleanText = {
            ...this.state
        }

        for (let value in cleanText) {
            if (cleanText[value].match(/^\s+$/)) {
                this
                    .props
                    .toggleAlert('please dont leave empty fields.');
                return;
            };

            if (value === 'Year') {
                if (cleanText[value] > new Date().getFullYear() || cleanText[value] < 1920) {
                    this
                        .props
                        .toggleAlert('Please provide a reasonable year.');
                    return;
                };

                if (cleanText[value].match(/[a-zA-Z]/g)) {
                    this
                        .props
                        .toggleAlert('Use numbers for the Year.');
                    return;
                };
            };
        };
        this.findDuplicateTitle();
    };

    findDuplicateTitle() {
        let tempMovieList = this.props.movieList;

        for (let i = 0; i < tempMovieList.length; i++) {
            if (this.state['imdbID'] !== tempMovieList[0]['imdbID'] && this.state['Title'] === tempMovieList[0]['Title']) {
                this
                    .props
                    .toggleAlert('Title already exist, Choose another name.');
                return;
            }
        }

        this
            .props
            .togglePopUp(this.state, 'save');
    }

 

    render() {
        const movie = this.props.movieInModal

        return (
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
                    <button className="btn" onClick={() => this.verifyEditedInfo()}>SAVE</button>
                    <button className="btn btn-cancel" onClick={() => this.props.toggleModal()}>CANCEL</button>
                </div>
            </div>
        );
    }
}

export default Modal;