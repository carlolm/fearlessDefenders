import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import TickerSearch from './TickerSearch';

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
          <Tab>Watson Analyzed</Tab>
          <Tab>Live Tweets</Tab>
          <Tab>Ticker Search</Tab>
        </TabList>

        <TabPanel>
          <h3>Watson Analyzed</h3>
        </TabPanel>
        <TabPanel>
          <h3>Streaming Tweets</h3>
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
