import React, { Component } from 'react';
import Movies from './Movies';
import MovieDetailWithData from './MovieDetail';
import CustomRoute from './CustomRoute'
import { Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'River Runs Through It'
    };
  }

  setSearchTerm = title => {
    this.setState({ title });
    console.log('setSearchTerm called');
  };

  render() {
    const { title } = this.state;
    return (
      <div>
        <div>
          <CustomRoute path="/" exact component={Movies} title={title} setSearchTerm={this.setSearchTerm}/>
        </div>
        <div>
          <Route path="/detail/:movieId" component={MovieDetailWithData}  />
        </div>
      </div>
    );
  }
}

export default App;
