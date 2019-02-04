import React, {Component} from 'react';
import SearchBar from './search/SearchBar';
import MenuBar from './menuBar/MenuBar';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="header">
            <MenuBar/>
            <SearchBar/>
                
            </div>
        );
    }
}

export default App;
