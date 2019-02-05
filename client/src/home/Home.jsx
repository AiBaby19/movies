import React, {Component} from 'react';
import Axios from 'axios';
import MovieList from '../movies/MovieList';
import './home.css'

const apiKey = '3c722a44';

class Home extends Component {
    state = {
        movieList: []
    }

    renderNewRelease = async () => {
        let data = {};
        
        await Axios
            .get(`https://www.omdbapi.com/?apikey=${apiKey}&s=batman`)
            .then(res => {
                data = res.data.Search;
            })
            .catch(err => console.log(err));

        this.setState({ movieList: data });
            // console.log('state.data', this.state.movieList)        
    }

    componentDidMount() {
        this.renderNewRelease();
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