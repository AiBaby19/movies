import React, {Component} from 'react';
import Axios from 'axios';
import SearchBar from './search/SearchBar';
import MenuBar from './menuBar/MenuBar';
import Modal from './modal/Modal';
import Home from './home/Home';
import PopUp from './popUp/PopUp';
import SavePopUp from './popUp/SavePopUp';
import './App.css';

// const apiKey = '3c722a44';

class App extends Component {

    state = {
        movieList: [],
        isModalOpen: false,
        isPopUpOpen: false,
        movieInModal: {},
        imdbDelete: '',
        popApprove: false,
        approvedTextInfo: {},
        popSaveMovie: false
    }

    //render movie list at startup
    componentDidMount() {
        this.renderNewRelease();
    }

    //open & close Modal
    toggleModal = (movieID) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        }, () => this.getFullMovieInfo(movieID));
    }

    approveSaveMovie = () => {
        if (this.state.popApprove === false) {
            return
        }
        return true;
    }

    //fetch movie list AJAX
    renderNewRelease = async() => {
        let data = {};

        await Axios
            .get(`https://www.omdbapi.com/?apikey=3c722a44&s=thor&tomatoes=true`)
            .then(res => {
                data = res.data.Search;
                data = this.deleteDuplicatesImdb(data)

            })
            .catch(err => console.log(err));

        this.setState({movieList: data});
    }

    //delete duplicates from fetched movie list
    deleteDuplicatesImdb = (arr) => {
        const isEqual = (a, b) => a.imdbID === b.imdbID;
        return arr.filter(candidate => candidate === arr.find(item => isEqual(item, candidate)))
    }

  
   

    getMovieIndex = (movieID) => {
        return this
            .state
            .movieList
            .findIndex(movie => movie.imdbID === movieID)
    }

    togglePopUp = (imdbDelete) => {
        this.setState({
            isPopUpOpen: !this.state.isPopUpOpen,
            imdbDelete
        });
        return;
    }

    //delete movies from list - User Choice
    deleteMovie = (imdbDelete) => {
        const movieListCopy = [...this.state.movieList];
        const movieIndex = this.getMovieIndex(imdbDelete)
        movieListCopy.splice(movieIndex, 1);
        this.setState({
            movieList: movieListCopy,
            isPopUpOpen: !this.state.isPopUpOpen
        });
    }

    verifyEditedInfo = (textCleanedInfo) => {
        for (let value in textCleanedInfo) {
            if (textCleanedInfo[value].match(/^\s+$/)) {
                alert('please dont leave empty fields')
                return;
            };

            if (value === 'Year' && (textCleanedInfo[value] > new Date().getFullYear() || textCleanedInfo[value] < 1920 || value.match(/[0-9]/g))) {
                alert('please enter a valid date');
                return;
            };
        };

        const approvedTextInfo = this.deleteDuplicateTitle(textCleanedInfo)

        // this.setState({popSaveMovie: true, approvedTextInfo})

    };

     //!why loop isnt returning?!
     deleteDuplicateTitle(textCleanedInfo) {
        let copy = false;
        let tempMovieList = [...this.state.movieList];
        for (let i = 0; i < tempMovieList.length; i++) {
            if (textCleanedInfo['Title'] === tempMovieList[0]['Title']) {
                // this.setState({ :  });
                return;
            }
        }
        //!why loop isnt returning?!
        console.log('copy', copy)

        return textCleanedInfo;

    }

    saveEditedInfo = () => {
        if (!this.state.approvedTextInfo) {
            alert('already have this name');
            this.setState({
                popSaveMovie: false
            }, () => {
                return
            });
            return
        }
        const approvedTextInfo = this.state.approvedTextInfo;
        const movieListCopy = [...this.state.movieList];
        const movieIndex = this.getMovieIndex(approvedTextInfo.imdbID)
        movieListCopy.splice(movieIndex, 1, approvedTextInfo);
        this.setState({
            movieList: movieListCopy,
            isModalOpen: !this.state.isModalOpen,
            popSaveMovie: false
        });
    }

    toggleSavePopUp = () => {
        this.setState({
            popSaveMovie: !this.state.popSaveMovie
        });
        return;
    }

    //get full movie info to modal
    getFullMovieInfo = async(movieID) => {
        if (!this.state.isModalOpen) {
            return;
        }

        let data = {};
        const movieIndex = this.getMovieIndex(movieID)

        if (Object.keys(this.state.movieList[movieIndex]).length > 5) {
            this.setState({movieInModal: this.state.movieList[movieIndex]});

        } else {
            await Axios
                .get(`https://www.omdbapi.com/?apikey=3c722a44&i=${movieID}&Runtime`)
                .then(res => {
                    // res = res.data;
                    data = {
                        imdbID: res.data.imdbID,
                        Title: res.data.Title,
                        Year: res.data.Year,
                        RunTime: res.data.Runtime,
                        Genre: res.data.Genre,
                        Director: res.data.Director,
                        // plot: res.data.Plot,
                        Poster: res.data.Poster
                    }
                })
                .then(() => this.setState({movieInModal: data}))
                .catch(err => console.log(err));
        }

    }

    //!turn the keys in the object to lowercase

    render() {
        return (
            <div>
                <MenuBar/>
                <SearchBar/>
                <Home
                    toggleModal={this.toggleModal}
                    deleteMovie={this.deleteMovie}
                    togglePopUp={this.togglePopUp}
                    movieList={this.state.movieList}/> {this.state.isModalOpen
                    ? <Modal
                            movieInModal={this.state.movieInModal}
                            toggleModal={this.toggleModal}
                            togglePopUp={this.togglePopUp}
                            movieList={this.state.movieList}
                            verifyEditedInfo={this.verifyEditedInfo}/>
                    : null}
                {this.state.isPopUpOpen
                    ? <PopUp
                            togglePopUp={this.togglePopUp}
                            popUDenied={this.popUDenied}
                            imdbDelete={this.state.imdbDelete}
                            deleteMovie={this.deleteMovie}
                            approveSaveMovie={this.state.approveSaveMovie}
                            approvedTextInfo={this.state.approvedTextInfo}/>

                    : null}

                {this.state.popSaveMovie
                    ? <SavePopUp
                            popSaveMovie={this.state.popSaveMovie}
                            toggleSavePopUp={this.toggleSavePopUp}
                            saveEditedInfo={this.saveEditedInfo}/>
                    : null}
            </div>
        );
    }
}

export default App;
