import React from 'react';

import './css/TweetStreamEntry.css';


const TweetStreamEntry = ({ username, timeStamp, text }) => (
  <div className="tweet">
    <tr>
      <td className="username">{username}</td>
      <td className="timestamp">{timeStamp}</td>
    </tr>
    <tr>
      <td colSpan="2" className="tweetText">{text}</td>
    </tr>
  </div>
);

export default TweetStreamEntry;
