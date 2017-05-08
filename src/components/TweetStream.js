import React, { Component } from 'react';
import io from 'socket.io-client';
import TweetStreamEntry from './TweetStreamEntry';

const socket = io('http://localhost:5000');

class TweetStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: '#TRUMP',
      showStream: true,
      tweetStream: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    socket.on('tweet', (tweet) => {
      console.log(tweet);
      let tweets = this.state.tweetStream;
      const maxTweets = 10;

      tweets.unshift(tweet);
      tweets = tweets.slice(0, maxTweets);

      this.setState({ tweetStream: tweets });
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ showStream: !this.state.showStream });
    if (this.state.showStream) {
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

      fetch('http://localhost:3000/api/stream', options)
      .then(data => data.json())
      .then(data => console.log(data))
      .catch(err => console.warn(err));
    }
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <button onClick={this.handleClick}>{ (this.state.showStream) ? 'Live Stream' : 'Pause Stream' }</button>
              </td>
            </tr>
            { this.state.tweetStream.map((tweet, index) => (
              <TweetStreamEntry
                key={index}
                username={tweet.username}
                timeStamp={tweet.timeStamp}
                text={tweet.text}
              />
              ))
            }

          </tbody>
        </table>
      </div>
    );
  }
}

export default TweetStream;
