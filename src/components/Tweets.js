import React from 'react';

import './css/Tweets.css';

import TweetTabs from './TweetTabs.js';


const Tweets = () => (
  <div className="tweets">
    <h2>Tweets</h2>
    <TweetTabs />
  </div>
);

Tweets.propTypes = {
  // : React.PropTypes.
};

export default Tweets;
