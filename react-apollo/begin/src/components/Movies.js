import React, { Component } from 'react';
import MovieListWithData from './MovieList';
import MovieSearch from './MovieSearch';
class Movies extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: this.props.title,
      setSearchTerm: this.props.setSearchTerm
    };
  }
  render() {
    const { title, setSearchTerm } = this.props;
    return (
      <div>
        <MovieSearch setSearchTerm={setSearchTerm} title={title} />
        <MovieListWithData title={title} />
      </div>
    );
  }
}

export default Movies;
