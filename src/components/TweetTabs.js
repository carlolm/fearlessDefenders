import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import TickerSearch from './TickerSearch';
import TweetStream from './TweetStream';

import './css/TweetTabs.css';

class TweetTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetStream: [],
      companySearch: '',
    };
  }

  render() {
    return (
      <Tabs>
        <TabList>
          <Tab className="tab-text">Watson Analyzed</Tab>
          <Tab className="tab-text">Live Tweets</Tab>
          <Tab className="tab-text">Ticker Search</Tab>
        </TabList>

        <TabPanel>
          <h3>Watson Analyzed</h3>
        </TabPanel>
        <TabPanel>
          <h3>Streaming Tweets</h3>
          <TweetStream />
        </TabPanel>
        <TabPanel>
          <h3>Search for Company Ticker</h3>
          <TickerSearch />
        </TabPanel>
      </Tabs>
    );
  }
}

export default TweetTabs;
