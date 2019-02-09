import React, {Component} from 'react';
import Axios from 'axios';
import SearchBar from './search/SearchBar';
import MenuBar from './menuBar/MenuBar';
import Modal from './modal/Modal';
import Home from './home/Home';
import QuestionPopUp from './popUp/QuestionPopUp';
import AlertPopUp from './popUp/AlertPopUp';
import './App.css';

class App extends Component {

    state = {
        movieList: [],
        isModalOpen: false,
        isPopUpOpen: false,
        movieInModal: {},
        saveOrDeletePopUp: null,
        isAlert: false,
        deleteIdOrVerifiedInfo: '',
        alertType: '',
    }

    //render movie list at startup
    componentDidMount() {
        this.fetchFirstList();
    }

    toggleModal = (movieID) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        }, () => this.getFullMovieInfo(movieID));
    };


    toggleAlert = (alertType) => {
        this.setState({
            isAlert: !this.state.isAlert,
            alertType: alertType
        });
        return;
    };

    //fetch first movie list AJAX

    fetchFirstList = async() => {
        let data = {};

        await Axios
            .get(`https://www.omdbapi.com/?apikey=3c722a44&s=thor`)
            .then(res => {
                data = res.data.Search;
                this.renderMovieList(data)

            })
            .catch(err => console.log(err));
        }



    renderMovieList = (data) => {
        data = this.deleteDuplicatesImdb(data);
        this.setState({movieList: data});
    };

    //delete duplicates from fetched movie list
    deleteDuplicatesImdb = (arr) => {
        const isEqual = (a, b) => a.imdbID === b.imdbID;
        return arr.filter(candidate => candidate === arr.find(item => isEqual(item, candidate)))
    };

    getMovieIndex = (movieID) => {
        return this
            .state
            .movieList
            .findIndex(movie => movie.imdbID === movieID)
    };

    togglePopUp = (deleteIdOrVerifiedInfo, saveOrDelete) => {
        this.setState({
            isPopUpOpen: !this.state.isPopUpOpen,
            deleteIdOrVerifiedInfo,
            saveOrDelete
        });
        return;
    }

    //delete movies from list - User Choice
    deleteMovie = () => {
        const deleteId = this.state.deleteIdOrVerifiedInfo;
        const movieListCopy = [...this.state.movieList];
        const movieIndex = this.getMovieIndex(deleteId)
        movieListCopy.splice(movieIndex, 1);
        this.setState({
            movieList: movieListCopy,
            isPopUpOpen: !this.state.isPopUpOpen
        });
    };

    saveEditedInfo = () => {
        // console.log('save function')
        // poster={Poster === 'N/A' ? '/resources/img/Blank.png': Poster}
        const approvedTextInfo = this.state.deleteIdOrVerifiedInfo;
        if(approvedTextInfo['Poster'] === "N/A") {
            approvedTextInfo['Poster'] = '/resources/img/Blank.png'
        }
        console.log('approvedTextInfo', approvedTextInfo)

        const movieListCopy = [...this.state.movieList];
        const movieIndex = this.getMovieIndex(approvedTextInfo.imdbID)
        movieListCopy.splice(movieIndex, 1, approvedTextInfo);
        this.setState({
            movieList: movieListCopy,
            isModalOpen: !this.state.isModalOpen,
            isPopUpOpen: !this.state.isPopUpOpen,
        });
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
                    data = {
                        imdbID: res.data.imdbID,
                        Title: res.data.Title,
                        Year: res.data.Year,
                        RunTime: res.data.Runtime,
                        Genre: res.data.Genre,
                        Director: res.data.Director,
                        Poster: res.data.Poster
                    }
                    // if(data.Poster === "N/A") {
                    //     data.Poster = 
                    // }
                })
                .then(() => this.setState({movieInModal: data}))
                .catch(err => console.log(err));
        };
    };

    render() {
        return (
            <div>
                <MenuBar/>
                <SearchBar renderMovieList={this.renderMovieList}/>
                <Home
                    toggleModal={this.toggleModal}
                    deleteMovie={this.deleteMovie}
                    togglePopUp={this.togglePopUp}
                    movieList={this.state.movieList}/> 
                    
                    {this.state.isModalOpen
                    ? <Modal
                            movieInModal={this.state.movieInModal}
                            toggleModal={this.toggleModal}
                            togglePopUp={this.togglePopUp}
                            movieList={this.state.movieList}
                            verifyEditedInfo={this.verifyEditedInfo}
                            toggleAlert={this.toggleAlert}/>
                    : null}

                {this.state.isPopUpOpen
                    ? <QuestionPopUp
                            togglePopUp={this.togglePopUp}
                            deleteMovie={this.deleteMovie}
                            saveOrDelete={this.state.saveOrDelete}
                            saveEditedInfo={this.saveEditedInfo}/>

                    : null}

                {this.state.isAlert
                    ? <AlertPopUp 
                            toggleAlert={this.toggleAlert} 
                            alertType={this.state.alertType}/>
                    : null}
            </div>
        );
    }
}

export default App;
