import React, {Component} from 'react';
import './searchBar.css';
import Axios from 'axios';

class SearchBar extends Component {
    state = {
        movieTitle: ''
    }

    getMovieData = async() => {
        const searchQuery = this.state.movieTitle
        let data = {};
        await Axios
            .get(`https://www.omdbapi.com/?apikey=3c722a44&s=${searchQuery}`)
            .then(res => {
                data = res.data.Search;
                this
                    .props
                    .renderMovieList(data)
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <div className="wrapper">
                <div className="inner-search-div">
                    <input
                        className="searchInput"
                        type="text"
                        placeholder="Search A Movie..."
                        onChange={(e) => this.setState({movieTitle: e.currentTarget.value})}/>
                    
                        <div className="btn-search-div">
                            <button className="btn btn-search" onClick={() => this.getMovieData()}>SEARCH</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;