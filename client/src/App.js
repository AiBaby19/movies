import React, {Component} from 'react';
import Axios from 'axios';
import SearchBar from './search/SearchBar';
import MenuBar from './menuBar/MenuBar';
import Modal from './modal/Modal';
import Home from './home/Home';
import './App.css';

// const apiKey = '3c722a44';

class App extends Component {

    state = {
        movieList: [],
        isModalOpen: false,
        movieInModal: {},
        // movieID: ''
    }

    //render movie list at startup
    componentDidMount() {
        this.renderNewRelease();
    }

    //open & close Modal
    toggleModal = (movieID) => {
        console.log(movieID)
        this.getFullMovieInfo(movieID)
        // const movieListCopy = [...this.state.movieList]; console.log('movieListCopy',
        // movieListCopy) const movieIndex = movieListCopy.findIndex(movie =>
        // movie.imdbID === movieID)
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            // movieID: movieID
            // movieIndexToModal: movieIndex
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

    //delete movies from list - User Choice
    deleteMovie = (MovieID) => {
        const movieListCopy = [...this.state.movieList];
        const movieIndex = movieListCopy.findIndex(movie => movie.imdbID === MovieID)
        movieListCopy.splice(movieIndex, 1);
        this.setState({movieList: movieListCopy});
    }

    //get full movie info to modal
    getFullMovieInfo = async(movieID) => {
        let data = {};

        await Axios
            .get(`https://www.omdbapi.com/?apikey=3c722a44&i=${movieID}`)
            .then(res => {
                data = res.data;
                console.log('res', data)
            })
            .catch(err => console.log(err));

        // this.setState({movieList: data});
    }

    render() {
        return (
            <div>
                <MenuBar/>
                <SearchBar/>
                <Home
                    toggleModal={this.toggleModal}
                    deleteMovie={this.deleteMovie}
                    movieList={this.state.movieList}/> {this.state.isModalOpen
                    ? <Modal
                            movieInModal={this.state.movieList[this.state.movieIndexToModal]}
                            toggleModal={this.toggleModal}
                            movieList={this.state.movieList}/>
                    : null}
            </div>
        );
    }
}

export default App;
