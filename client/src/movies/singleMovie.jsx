import React, {Component} from 'react';
import './singleMovie.css'

class SingleMovies extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div className="movieDiv">
                    <div className="inner-div" onClick={() => console.log('clicked')}>
                        <img
                            src={this.props.poster}
                            alt={this.props.title}
                            style={{
                            width: '170px',
                            maxHeight: '220px'
                        }}/>
                    </div>
                    <h5>{this.props.title}</h5>

                </div>
            </React.Fragment>
        );
    }
}

export default SingleMovies;