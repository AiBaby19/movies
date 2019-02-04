import React, {Component} from 'react';
import './searchBar.css';

class SearchBar extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="wrapper">
                        <input className="searchInput" type="text" placeholder="Search A Movie..."/>
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