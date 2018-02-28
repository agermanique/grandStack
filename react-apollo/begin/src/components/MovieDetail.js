import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class MovieDetail extends Component {
  render() {
    return (
      <Item>
        <Item.Image size="small" src={getNestedObject(this.props, ['data','movieById',0,'poster'])} bordered />
        <Item.Content verticalAlign="middle">
          <Item.Header>{getNestedObject(this.props, ['data','movieById',0,'title'])}</Item.Header>
          <Item.Meta>Year: {getNestedObject(this.props, ['data','movieById',0,'year'])}</Item.Meta>
          <Item.Meta>Rating: {getNestedObject(this.props, ['data','movieById',0,'rating'])}</Item.Meta>
          <Item.Description>{getNestedObject(this.props, ['data','movieById',0,'plot'])}</Item.Description>
          {/* <Item.Extra>
            {this.props.genres.map(genre => <Label key={genre}>{genre}</Label>)}
          </Item.Extra> */}
        </Item.Content>
      </Item>
    );
  }
}
const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : null),
    nestedObj
  );
};
const query = gql`
  query MovieById($movieId: String!) {
    movieById: movieById(subString: $movieId) {
      title
      movieId
      imdbRating
      plot
      poster
      year
    }
  }
`;
const MovieDetailWithData =
  //(( match ) => {
  // return
  graphql(query, {
    options: ownProps => {
      return { variables: { movieId: ownProps.match.params.movieId } };
    }
  })(MovieDetail);
// })();

export default MovieDetailWithData;
