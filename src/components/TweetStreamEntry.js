import React from 'react';
import PropTypes from 'prop-types';
import './css/TweetStreamEntry.css';


const TweetStreamEntry = ({ username, timeStamp, text }) => (
  <table className="tweet">
    <tbody>
      <tr>
        <td className="username">{username}</td>
        <td className="timestamp">{timeStamp}</td>
      </tr>
      <tr>
        <td colSpan="2" className="tweetText">{text}</td>
      </tr>
    </tbody>
  </table>
);

TweetStreamEntry.propTypes = {
  username: PropTypes.string,
  timeStamp: PropTypes.string,
  text : PropTypes.string,
};

export default TweetStreamEntry;
