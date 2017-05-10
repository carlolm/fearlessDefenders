import React, { Component } from 'react';
import io from 'socket.io-client';
import TweetStreamEntry from './TweetStreamEntry';
import './css/TweetStream.css';

const socketURL = (window.location.hostname.indexOf('local') !== -1) ? `${window.location.hostname}:3000` : window.location.hostname;

const socket = io(socketURL);

class TweetStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: '$AAPL',
      showStream: true,
      tweetStream: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    socket.on('tweet', (tweet) => {
      let tweets = this.state.tweetStream;
      const maxTweets = 10;

      tweets.unshift(tweet);
      tweets = tweets.slice(0, maxTweets);

      this.setState({ tweetStream: tweets });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ ticker: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ showStream: !this.state.showStream });

    if (this.state.showStream === true) {
      this.setState({ tweetStream: [] });
    }

    const body = {
      ticker: this.state.ticker,
      showStream: this.state.showStream,
    };

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    console.log(options);

    fetch('/api/stream', options)
      .then(data => data.json())
      .then(data => console.log(data))
      .catch(err => console.warn(err));
  }
 
  componentDidUnmount() {
    this.setState({ showStream: false });

    if (this.state.showStream === true) {
      this.setState({ tweetStream: [] });
    }

    const body = {
      ticker: this.state.ticker,
      showStream: this.state.showStream,
    };

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    console.log(options);

    fetch('/api/stream', options)
      .then(data => data.json())
      .then(data => console.log(data))
      .catch(err => console.warn(err));
  }

  render() {
    return (
      <div>
        <table className="table-header">
          <tbody>
            <tr>
              <td className="ticker">
                <input className="text-input" type="text" value={this.state.ticker} onChange={this.handleChange} />
              </td>
              <td>
                <button className="button" onClick={this.handleClick}>{(this.state.showStream) ? 'Live Stream' : 'Pause Stream'}</button>
              </td>
            </tr>
          </tbody>
        </table>
        {this.state.tweetStream.map((tweet, index) => (
          <TweetStreamEntry
            key={index}
            username={tweet.username}
            timeStamp={tweet.timeStamp}
            text={tweet.text}
          />
        ))
        }
      </div>
    );
  }
}

export default TweetStream;
