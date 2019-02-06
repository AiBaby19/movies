import React, {Component} from 'react';
import SearchBar from './search/SearchBar';
import MenuBar from './menuBar/MenuBar';
import MovieList from './movies/MovieList';
import Home from './home/Home';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <MenuBar/>
                <SearchBar/>
                <Home/>
            </div>
        );
    }
}

export default App;
