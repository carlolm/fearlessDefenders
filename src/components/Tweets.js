import React from 'react';

import './css/Tweets.css';

import TweetTabs from './TweetTabs';

const Tweets = ({ companiesSummary }) => (
  <div className="tweets">
    <TweetTabs companiesSummary={companiesSummary} />
  </div>
);

export default Tweets;
