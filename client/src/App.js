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
        movieInModal: {}
    }



    //render movie list at startup
    componentDidMount() {
        this.renderNewRelease();
    }

    //open & close Modal
    toggleModal = (movieID) => {
        //!! find a way to wait for the setstate => now transfering empty undefined in keys
        this.getFullMovieInfo(movieID)
        this.setState({
            isModalOpen: !this.state.isModalOpen,
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

    // getMovieIndex = () => {
    //     const movieListCopy = [...this.state.movieList];
    //     const movieIndex = movieListCopy.findIndex(movie => movie.imdbID === MovieID)
    // }


    //delete movies from list - User Choice
    deleteMovie = (movieID) => {
        const movieListCopy = [...this.state.movieList];
        const movieIndex = movieListCopy.findIndex(movie => movie.imdbID === movieID)
        movieListCopy.splice(movieIndex, 1);
        this.setState({movieList: movieListCopy});
    }

    //get full movie info to modal
    //!!clean this function up
    getFullMovieInfo = async(movieID) => {
        let data = {};
        if(this.state.movieList) {
        const movieListCopy = [...this.state.movieList];
        const movieIndex = movieListCopy.findIndex(movie => movie.imdbID === movieID)
        this.setState({ movieInModal: this.state.movieList[movieIndex] }); 
        return
        }
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

    saveEditedInfo = (newInfo, movieID) => {
        const movieListCopy = [...this.state.movieList];
        const movieIndex = movieListCopy.findIndex(movie => movie.imdbID === newInfo.imdbID)
        
        movieListCopy.splice(movieIndex, 1, newInfo);
        console.log('movieListCopy', movieListCopy)
        this.setState({movieList: movieListCopy});
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
                    movieList={this.state.movieList}/> {this.state.isModalOpen
                    ? <Modal
                            movieInModal={this.state.movieInModal}
                            toggleModal={this.toggleModal}
                            movieList={this.state.movieList}
                            saveEditedInfo={this.saveEditedInfo}/>
                    : null}
            </div>
        );
    }
}

export default App;
