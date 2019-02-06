import React, { Component } from 'react';
import './searchBar.css';
import Axios from 'axios';

const apiKey = '3c722a44';
const link = 'http://www.omdbapi.com/?apikey=[yourkey]&'

class SearchBar extends Component {

    constructor() {
        super();
        this.state = {
            movieTitle: '',
            
        }
    }

    getMovieData = async () => {
        let data = {};
        await Axios
            .get(`https://www.omdbapi.com/?apikey=${apiKey}&s=batman`)
            .then(res => {
                data = res.data.Search;
            })
            .catch(err => console.log(err));
    }

    state = {}
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="wrapper">
                        <input className="searchInput" type="text" placeholder="Search A Movie..." onChange={()=> console.log('nun')}/>
                        <button className="btn" onClick={() => this.getMovieData()}>SEARCH</button>
                        <div className="filter">
                            FILTER
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SearchBar;