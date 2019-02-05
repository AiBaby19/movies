import React, { Component } from 'react';
import './singleMovie.css'

class SingleMovies extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="movieDiv">
        <h3>{this.props.title}</h3>
      </div>
     );
  }
}
 
export default SingleMovies;