import React, {Component} from 'react';
import Axios from 'axios';
import MovieList from '../movies/MovieList';
import './home.css'

const apiKey = '3c722a44';

class Home extends Component {
    state = {
        movieList: []
    }

    componentDidMount() {
        this.renderNewRelease();
    }

    deleteDuplicates = (arr) => {
        const isEqual = (a, b) => a.imdbID === b.imdbID;
        return arr.filter(candidate => candidate === arr.find(item => isEqual(item, candidate)))
    }

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

    render() {
        return (
            <React.Fragment>
                <div className="home-container">
                    <h1 className="home-headline">New Releases</h1>

                    <MovieList movieList={this.state.movieList}/>

                </div>
            </React.Fragment>
        );
    }
}

export default Home;