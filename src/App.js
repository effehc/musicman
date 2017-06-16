import React, { Component } from 'react';
import './App.css';
import Profile from './profile';
import Gallery from './gallery';
import {
  FormGroup,
  FormControl,
  InputGroup,
  Glyphicon
} from 'react-bootstrap';

import { authorize, searchArtist } from './services/spotify';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null
    }
  }

  componentDidMount() {
    authorize((credentials) => this.setState({credentials}))
  }

  search() {
    searchArtist(this.state.query, this.state.credentials,
        (artistInfo) => {
          this.setState(
           artistInfo
          )
        }
    )


  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Kiddle is a Rapper</div>

        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => this.setState({query: event.target.value})}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon
              onClick={() => this.search()}
            >
              <Glyphicon glyph="search"/>

            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
          <div>
            <Profile
              artist={this.state.artist}
            />
            <Gallery
              tracks={this.state.tracks}
            />
          </div>
          : <div></div>
        }
      </div>
    );
  }
}

export default App;
