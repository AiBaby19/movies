import React, {Component} from 'react';
import Axios from 'axios';
import SearchBar from './search/SearchBar';
import MenuBar from './menuBar/MenuBar';
import Modal from './modal/Modal';
import Home from './home/Home';
import PopUp from './popUp/PopUp';
import './App.css';

// const apiKey = '3c722a44';

class App extends Component {

    state = {
        movieList: [],
        isModalOpen: false,
        isPopUpOpen: false,
        movieInModal: {},
        imdbDelete: '',
        popSaveMovie: ''
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

    togglePopUp = (imdbDelete) => {
        this.setState({
            isPopUpOpen: !this.state.isPopUpOpen,
            imdbDelete: imdbDelete
        });
    }

    //fetch movie list AJAX
    renderNewRelease = async() => {
        let data = {};

        await Axios
            .get(`https://www.omdbapi.com/?apikey=3c722a44&s=thor&tomatoes=true`)
            .then(res => {
                data = res.data.Search;
                data = this.deleteDuplicates(data)

            })
            .catch(err => console.log(err));

        this.setState({movieList: data});
    }

    //delete duplicates from fetched movie list
    deleteDuplicates = (arr) => {
        const isEqual = (a, b) => a.imdbID === b.imdbID;
        return arr.filter(candidate => candidate === arr.find(item => isEqual(item, candidate)))
    }

    getMovieIndex = (movieID) => {
        return this
            .state
            .movieList
            .findIndex(movie => movie.imdbID === movieID)
    }

    //delete movies from list - User Choice
    deleteMovie = (imdbDelete) => {
        console.log('delete', imdbDelete)
        // this.setState({     isPopUpOpen: !this.state.isPopUpOpen }, () => {

        const movieListCopy = [...this.state.movieList];
        const movieIndex = this.getMovieIndex(imdbDelete)
        movieListCopy.splice(movieIndex, 1);
        this.setState({
            movieList: movieListCopy,
            isPopUpOpen: !this.state.isPopUpOpen
        });
        // });

    }

    // renderEditedInfo = (editedText) => {
    //     console.log('editedText')
       
    // }
       

    saveEditedInfo = (editedInfo) => {

        const movieListCopy = [...this.state.movieList];
        const movieIndex = this.getMovieIndex(editedInfo.imdbID)
        movieListCopy.splice(movieIndex, 1, editedInfo);
        this.setState({
            movieList: movieListCopy,
            isModalOpen: !this.state.isModalOpen
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
                    movieList={this.state.movieList}
                    togglePopUp={this.togglePopUp}/> {this.state.isModalOpen
                    ? <Modal
                            movieInModal={this.state.movieInModal}
                            toggleModal={this.toggleModal}
                            togglePopUp={this.togglePopUp}
                            movieList={this.state.movieList}
                            saveEditedInfo={this.saveEditedInfo}/>
                    : null}
                {this.state.isPopUpOpen
                    ? <PopUp
                            togglePopUp={this.togglePopUp}
                            deleteMovie={this.deleteMovie}
                            imdbDelete={this.state.imdbDelete}/>
                    : null}
            </div>
        );
    }
}

export default App;
