import React from 'react';
import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import axios from 'axios';
import Login from './Login';
import MessagingPanel from './MessagingPanel';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
    }
  }

  setUsername = (username) => {
    this.setState({ username });
  }
  render() {
    return (
      <div className="App">
        <Header />
        
        {!this.state.username ? <Login setUsername={this.setUsername} /> :
          <MessagingPanel username={this.state.username} />}
        <Footer />
      </div>

    );
  }
}

export default App;
