import React, {Component} from 'react';
import Axios from 'axios';
import SearchBar from './search/SearchBar';
import MenuBar from './menuBar/MenuBar';
import Modal from './modal/Modal';
import MovieList from './movies/MovieList';
import Home from './home/Home';
import './App.css';

const apiKey = '3c722a44';

class App extends Component {

    state = {
        movieList: [],
        isModalOpen: false
    }

    //render movie list at startup
    componentDidMount() {
        this.renderNewRelease();
    }

    //open & close Modal
    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    //fetch movie list AJAX
    renderNewRelease = async() => {
        let data = {};

        await Axios
            .get(`https://www.omdbapi.com/?apikey=${apiKey}&s=batman`)
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

    render() {
        return (
            <div>
                <MenuBar/>
                <SearchBar/>
                <Home
                    toggleModal={this.toggleModal}
                    deleteMovie={this.deleteMovie}
                    movieList={this.state.movieList}/> {this.state.isModalOpen
                    ? <Modal toggleModal={this.toggleModal} movieList={this.state.movieList}/>
                    : null}
            </div>
        );
    }
}

export default App;
