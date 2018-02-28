// This component is used at the beginning of the exercise as a skeleton example
// We'll replace this component with one that uses GraphQL to fetch movies

import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import Movie from './Movie';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class MovieList extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) return <div>Loading...</div>;
    if (data.error) return <div>Error!</div>;
    if (data.moviesByTitle.length === 0) return <div>No movies!</div>;

    return (
      <Item.Group divided>
        {data.moviesByTitle.map(movie => (
          <Movie
            key={movie.movieId}
            movieId={movie.movieId}
            title={movie.title}
            poster={movie.poster}
            plot={movie.plot}
            rating={movie.imdbRating}
            genres={movie.genres}
            similar={movie.similar}
            year={movie.year}
          />
        ))}
      </Item.Group>
    );
  }
}
const MovieListWithData = graphql(
  gql`
    query MovieListQuery($title: String!) {
      moviesByTitle: moviesByTitle(subString: $title) {
        title
        movieId
        imdbRating
        plot
        poster
        year
        genres
        similar {
          movieId
          poster
          title
        }
      }
    }
  `
)(MovieList);

export default MovieListWithData;
